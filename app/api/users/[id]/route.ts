import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // 🔹 note Promise here
) {
  const { id } = await context.params; // ✅ await the params

  const user = await prisma.user.findUnique({
    where: { id }, // id is string because your Prisma User.id is uuid
    include: { leads: true, deals: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
