import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = verifyToken(token);
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id } = params;
    const formData = await request.formData();

    const fields = {
      name: formData.get("name") as string | null,
      description: formData.get("description") as string | null,
      price: formData.get("price") ? Number.parseFloat(formData.get("price") as string) : null,
      salePrice: formData.get("salePrice") ? Number.parseFloat(formData.get("salePrice") as string) : null,
      categoryId: formData.get("categoryId") as string | null,
      brand: formData.get("brand") as string | null,
      sku: formData.get("sku") as string | null,
      featured: formData.get("featured") === "true",
    };

    const updates = [];
    const values = [];
    let idx = 1;
    for (const [key, value] of Object.entries(fields)) {
      if (value !== null && value !== undefined) {
        updates.push(`${key === "categoryId" ? "category_id" : key === "salePrice" ? "sale_price" : key} = $${idx}`);
        values.push(value);
        idx++;
      }
    }
    if (updates.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }
    values.push(id);

    await query(
      `UPDATE products SET ${updates.join(", ")} WHERE id = $${idx}`,
      values
    );


    return NextResponse.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = verifyToken(token);
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id } = params;

    await query(`DELETE FROM product_variants WHERE product_id = $1`, [id]);
    await query(`DELETE FROM product_images WHERE product_id = $1`, [id]);
    await query(`DELETE FROM product_reviews WHERE product_id = $1`, [id]);
    await query(`DELETE FROM products WHERE id = $1`, [id]);

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}