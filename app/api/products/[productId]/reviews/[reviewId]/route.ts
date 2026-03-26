import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { db } from "@/lib/db";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ productId: string; reviewId: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { reviewId } = await params;

  const review = await db.review.findUnique({ where: { id: reviewId } });
  if (!review)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Only owner or admin can delete
  if (review.userId !== session.user.id && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await db.review.delete({ where: { id: reviewId } });
  return NextResponse.json({ success: true });
}
