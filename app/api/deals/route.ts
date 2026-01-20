import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const deals = await prisma.deal.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(deals);
  } catch (err) {
    console.error("Fetch deals error:", err);
    return NextResponse.json(
      { error: "Failed to fetch deals" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { leadId, userId, owner } = await req.json();
    if (!leadId || !userId)
      return NextResponse.json(
        { error: "Missing leadId or userId" },
        { status: 400 },
      );

    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead)
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    const existingDeal = await prisma.deal.findUnique({ where: { leadId } });
    if (existingDeal)
      return NextResponse.json(
        { error: "Deal already exists" },
        { status: 400 },
      );

    const deal = await prisma.deal.create({
      data: {
        name: lead.name,
        email: lead.email ?? null,
        amount: 0,
        owner: owner ?? lead.owner ?? "",
        stage: "New",
        leadId,
        userId,
      },
    });

    return NextResponse.json(deal, { status: 201 });
  } catch (error) {
    console.error("CREATE DEAL ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
