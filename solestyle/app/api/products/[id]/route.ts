import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Get product with category
    const productResult = await query(
      `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        COALESCE(AVG(pr.rating), 0) as average_rating,
        COUNT(pr.id) as review_count
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_reviews pr ON p.id = pr.product_id
      WHERE p.id = $1 AND p.status = 'active'
      GROUP BY p.id, c.name, c.slug
    `,
      [id],
    )

    if (productResult.rows.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const product = productResult.rows[0]

    // Get product images
    const imagesResult = await query(
      `
      SELECT * FROM product_images 
      WHERE product_id = $1 
      ORDER BY sort_order, is_primary DESC
    `,
      [id],
    )

    // Get product variants
    const variantsResult = await query(
      `
      SELECT * FROM product_variants 
      WHERE product_id = $1 
      ORDER BY size, color
    `,
      [id],
    )

    // Get product reviews with user info
    const reviewsResult = await query(
      `
      SELECT 
        pr.*,
        u.first_name,
        u.last_name
      FROM product_reviews pr
      LEFT JOIN users u ON pr.user_id = u.id
      WHERE pr.product_id = $1
      ORDER BY pr.created_at DESC
      LIMIT 10
    `,
      [id],
    )

    const productData = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: Number.parseFloat(product.price),
      salePrice: product.sale_price ? Number.parseFloat(product.sale_price) : null,
      brand: product.brand,
      sku: product.sku,
      featured: product.featured,
      status: product.status,
      category: {
        name: product.category_name,
        slug: product.category_slug,
      },
      images: imagesResult.rows.map((img) => ({
        id: img.id,
        imageUrl: img.image_url,
        altText: img.alt_text,
        sortOrder: img.sort_order,
        isPrimary: img.is_primary,
      })),
      variants: variantsResult.rows.map((variant) => ({
        id: variant.id,
        size: variant.size,
        color: variant.color,
        stockQuantity: variant.stock_quantity,
        sku: variant.sku,
      })),
      reviews: reviewsResult.rows.map((review) => ({
        id: review.id,
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        verifiedPurchase: review.verified_purchase,
        createdAt: review.created_at,
        user: {
          firstName: review.first_name,
          lastName: review.last_name,
        },
      })),
      averageRating: Number.parseFloat(product.average_rating),
      reviewCount: Number.parseInt(product.review_count),
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    }

    return NextResponse.json(productData)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
