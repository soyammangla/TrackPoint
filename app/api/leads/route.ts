import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";

const LIMITS = {
  FREE: 10,
  PAID: 500,
};

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json([], { status: 401 });

  const leads = await prisma.lead.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(leads);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const existingLeads = await prisma.lead.count({ where: { userId: user.id } });
  if (existingLeads >= LIMITS[user.plan]) {
    return NextResponse.json(
      { error: `Lead limit reached for ${user.plan} plan` },
      { status: 403 },
    );
  }

  const lead = await prisma.lead.create({
    data: {
      name: body.name,
      email: body.email || null,
      phone: body.phone,
      status: body.status || "New",
      userId: user.id,
    },
  });

  return NextResponse.json(lead);
}
