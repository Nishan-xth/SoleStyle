import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { quantity } = await request.json()
    const { id } = params

    if (quantity < 1) {
      return NextResponse.json({ error: "Quantity must be at least 1" }, { status: 400 })
    }

    await query(
      `
      UPDATE cart_items 
      SET quantity = $1, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $2 AND user_id = $3
    `,
      [quantity, id, user.id],
    )

    return NextResponse.json({ message: "Cart item updated" })
  } catch (error) {
    console.error("Error updating cart item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { id } = params

    await query(
      `
      DELETE FROM cart_items 
      WHERE id = $1 AND user_id = $2
    `,
      [id, user.id],
    )

    return NextResponse.json({ message: "Item removed from cart" })
  } catch (error) {
    console.error("Error removing cart item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
