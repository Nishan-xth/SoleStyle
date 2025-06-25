import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const cartResult = await query(
      `
      SELECT 
        ci.*,
        p.name as product_name,
        p.price,
        p.sale_price,
        pi.image_url as product_image,
        pv.size,
        pv.color,
        pv.stock_quantity
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      JOIN product_variants pv ON ci.product_variant_id = pv.id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      WHERE ci.user_id = $1
      ORDER BY ci.created_at DESC
    `,
      [user.id],
    )

    const cartItems = cartResult.rows.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product_id,
        name: item.product_name,
        price: Number.parseFloat(item.price),
        salePrice: item.sale_price ? Number.parseFloat(item.sale_price) : null,
        image: item.product_image,
      },
      variant: {
        id: item.product_variant_id,
        size: item.size,
        color: item.color,
        stockQuantity: item.stock_quantity,
      },
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }))

    return NextResponse.json({ items: cartItems })
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { productId, variantId, quantity = 1 } = await request.json()

    if (!productId || !variantId) {
      return NextResponse.json({ error: "Product ID and variant ID are required" }, { status: 400 })
    }

    // Check if item already exists in cart
    const existingItem = await query(
      `
      SELECT id, quantity FROM cart_items 
      WHERE user_id = $1 AND product_variant_id = $2
    `,
      [user.id, variantId],
    )

    if (existingItem.rows.length > 0) {
      // Update quantity
      const newQuantity = existingItem.rows[0].quantity + quantity
      await query(
        `
        UPDATE cart_items 
        SET quantity = $1, updated_at = CURRENT_TIMESTAMP 
        WHERE id = $2
      `,
        [newQuantity, existingItem.rows[0].id],
      )
    } else {
      // Add new item
      await query(
        `
        INSERT INTO cart_items (user_id, product_id, product_variant_id, quantity)
        VALUES ($1, $2, $3, $4)
      `,
        [user.id, productId, variantId, quantity],
      )
    }

    return NextResponse.json({ message: "Item added to cart" })
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
