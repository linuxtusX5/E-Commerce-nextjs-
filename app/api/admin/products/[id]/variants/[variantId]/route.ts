import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/helpers";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ productId: string; variantId: string }> },
) {
  await requireAdmin();
  const { variantId } = await params;
  const { size, color, colorHex, stock, price } = await req.json();

  const variant = await db.productVariant.update({
    where: { id: variantId },
    data: {
      ...(size !== undefined && { size: size || null }),
      ...(color !== undefined && { color: color || null }),
      ...(colorHex !== undefined && { colorHex: colorHex || null }),
      ...(stock !== undefined && { stock: Number(stock) }),
      ...(price !== undefined && { price: price ? Number(price) : null }),
    },
  });

  return NextResponse.json(variant);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ productId: string; variantId: string }> },
) {
  await requireAdmin();
  const { variantId } = await params;
  await db.productVariant.delete({ where: { id: variantId } });
  return NextResponse.json({ success: true });
}
