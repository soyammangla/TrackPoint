import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
import { getOrCreateUser } from "@/lib/getOrCreateUser";

/**
 * GET → Fetch all deals with lead info
 */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getOrCreateUser({
    email: session.user.email,
    name: session.user.name ?? null,
    image: session.user.image ?? null,
  });

  const deals = await prisma.deal.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      lead: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json(deals);
}

/**
 * POST → Create deal from lead
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getOrCreateUser({
      email: session.user.email,
      name: session.user.name ?? null,
      image: session.user.image ?? null,
    });

    const { leadId, owner } = await req.json();

    if (!leadId) {
      return NextResponse.json({ error: "Missing leadId" }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const existingDeal = await prisma.deal.findUnique({
      where: { leadId },
    });

    if (existingDeal) {
      return NextResponse.json(
        { error: "Deal already exists" },
        { status: 400 },
      );
    }

    const deal = await prisma.deal.create({
      data: {
        name: lead.name,
        email: lead.email ?? null,
        amount: 0,
        owner: owner ?? "",
        stage: "New",
        leadId,
        userId: user.id,
      },
      include: {
        lead: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(deal, { status: 201 });
  } catch (err) {
    console.error("CREATE DEAL ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
