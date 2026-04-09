import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/helpers";
import { db } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const { productId } = await params;
  const variants = await db.productVariant.findMany({
    where: { productId },
    orderBy: [{ size: "asc" }, { color: "asc" }],
  });
  return NextResponse.json({ variants });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  await requireAdmin();
  const { productId } = await params;
  const { size, color, colorHex, stock, price } = await req.json();

  if (!size && !color) {
    return NextResponse.json(
      { error: "Size or color is required" },
      { status: 400 },
    );
  }

  const variant = await db.productVariant.create({
    data: {
      productId,
      size: size || null,
      color: color || null,
      colorHex: colorHex || null,
      stock: Number(stock) || 0,
      price: price ? Number(price) : null,
    },
  });

  return NextResponse.json(variant, { status: 201 });
}
