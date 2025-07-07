import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = verifyToken(token)
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const formData = await request.formData()

    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const salePrice = formData.get("salePrice") ? Number.parseFloat(formData.get("salePrice") as string) : null
    const categoryId = formData.get("categoryId") as string
    const brand = formData.get("brand") as string
    const sku = formData.get("sku") as string
    const featured = formData.get("featured") === "true"
    const variants = JSON.parse(formData.get("variants") as string)

    if (!name || !price || !categoryId || !brand) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    // Insert product
    const productResult = await query(
      `INSERT INTO products (name, slug, description, price, sale_price, category_id, brand, sku, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [name, slug, description, price, salePrice, categoryId, brand, sku, featured],
    )

    const productId = productResult.rows[0].id

    // Insert variants
    for (const variant of variants) {
      if (variant.size && variant.color) {
        const variantSku = `${sku}-${variant.size}-${variant.color.substring(0, 3).toUpperCase()}`
        await query(
          `INSERT INTO product_variants (product_id, size, color, stock_quantity, sku)
           VALUES ($1, $2, $3, $4, $5)`,
          [productId, variant.size, variant.color, Number.parseInt(variant.stockQuantity) || 0, variantSku],
        )
      }
    }

    await query(
      `INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
       VALUES ($1, $2, $3, $4, $5)`,
      [productId, "/placeholder.svg?height=400&width=400", `${name} - Main Image`, 0, true],
    )

    return NextResponse.json({
      message: "Product created successfully",
      productId,
    })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
