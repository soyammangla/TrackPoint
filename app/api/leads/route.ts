import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";

const LIMITS = {
  FREE: 10,
  PAID: 500,
} as const;

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

  const count = await prisma.lead.count({ where: { userId: user.id } });
  const limit = LIMITS[user.plan];

  if (count >= limit) {
    return NextResponse.json(
      {
        error:
          user.plan === "PAID"
            ? "You have reached your plan limit."
            : "You have reached your free plan limit (10 leads). Upgrade to Pro.",
      },
      { status: 403 },
    );
  }

  const lead = await prisma.lead.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      status: body.status,
      userId: user.id,
    },
  });

  return NextResponse.json(lead);
}
