import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, value, stage } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const deal = await prisma.deal.create({
    data: {
      title,
      value: Number(value),
      stage,
      ownerId: user.id,
    },
  });

  return NextResponse.json(deal);
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json([], { status: 200 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { deals: true },
  });

  return NextResponse.json(user?.deals || []);
}
