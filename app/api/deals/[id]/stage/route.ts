import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const STAGE_FLOW: Record<string, string[]> = {
  New: ["Contacted"],
  Contacted: ["Qualified"],
  Qualified: ["Proposal"],
  Proposal: ["Closed Won", "Closed Lost"],
  "Closed Won": [],
  "Closed Lost": [],
};

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { stage } = await req.json();

    if (!stage) {
      return NextResponse.json({ error: "Stage is required" }, { status: 400 });
    }

    const deal = await prisma.deal.findUnique({ where: { id } });

    if (!deal) {
      return NextResponse.json({ error: "Deal not found" }, { status: 404 });
    }

    const allowedNextStages = STAGE_FLOW[deal.stage] ?? [];

    if (!allowedNextStages.includes(stage)) {
      return NextResponse.json(
        { error: `Invalid stage transition from ${deal.stage} to ${stage}` },
        { status: 400 },
      );
    }

    const updatedDeal = await prisma.deal.update({
      where: { id },
      data: { stage },
    });

    return NextResponse.json(updatedDeal);
  } catch (error) {
    console.error("STAGE UPDATE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update stage" },
      { status: 500 },
    );
  }
}
