import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { db } from "@/lib/db";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { name, email } = parsed.data;

  // Check email not taken by another user
  const existing = await db.user.findFirst({
    where: { email, id: { not: session.user.id } },
  });
  if (existing) {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 409 },
    );
  }

  await db.user.update({
    where: { id: session.user.id },
    data: { name, email },
  });

  return NextResponse.json({ success: true });
}
