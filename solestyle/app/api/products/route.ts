import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy") || "created_at"
    const sortOrder = searchParams.get("sortOrder") || "desc"
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const featured = searchParams.get("featured")

    const offset = (page - 1) * limit

    const whereConditions = ["p.status = $1"]
    const queryParams: any[] = ["active"]
    let paramIndex = 2

    if (category) {
      whereConditions.push(`c.slug = $${paramIndex}`)
      queryParams.push(category)
      paramIndex++
    }

    if (search) {
      whereConditions.push(
        `(p.name ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex} OR p.brand ILIKE $${paramIndex})`,
      )
      queryParams.push(`%${search}%`)
      paramIndex++
    }

    if (minPrice) {
      whereConditions.push(`p.price >= $${paramIndex}`)
      queryParams.push(Number.parseFloat(minPrice))
      paramIndex++
    }

    if (maxPrice) {
      whereConditions.push(`p.price <= $${paramIndex}`)
      queryParams.push(Number.parseFloat(maxPrice))
      paramIndex++
    }

    if (featured === "true") {
      whereConditions.push("p.featured = true")
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : ""

    // Get products with category and primary image
    const productsQuery = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        pi.image_url as primary_image,
        COALESCE(AVG(pr.rating), 0) as average_rating,
        COUNT(pr.id) as review_count
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      LEFT JOIN product_reviews pr ON p.id = pr.product_id
      ${whereClause}
      GROUP BY p.id, c.name, c.slug, pi.image_url
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `

    queryParams.push(limit, offset)

    const productsResult = await query(productsQuery, queryParams)

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(DISTINCT p.id) as total
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ${whereClause}
    `

    const countResult = await query(countQuery, queryParams.slice(0, -2))
    const total = Number.parseInt(countResult.rows[0].total)

    const products = productsResult.rows.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      price: Number.parseFloat(row.price),
      salePrice: row.sale_price ? Number.parseFloat(row.sale_price) : null,
      brand: row.brand,
      sku: row.sku,
      featured: row.featured,
      status: row.status,
      category: {
        name: row.category_name,
        slug: row.category_slug,
      },
      primaryImage: row.primary_image,
      averageRating: Number.parseFloat(row.average_rating),
      reviewCount: Number.parseInt(row.review_count),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }))

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
