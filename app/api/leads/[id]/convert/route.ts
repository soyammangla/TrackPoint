import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
import { Status } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🔥 UPDATED: dealName added
    const { dealName, amount, owner } = await req.json();

    if (!dealName || !amount || !owner) {
      return NextResponse.json(
        { error: "Deal name, amount and owner are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { id } = await params;

    const lead = await prisma.lead.findFirst({
      where: {
        id,
        userId: user.id,
      },
      include: {
        deal: true,
      },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // ✅ enum-safe check
    if (lead.status !== Status.Qualified) {
      return NextResponse.json(
        { error: "Only qualified leads can be converted" },
        { status: 400 },
      );
    }

    // ❌ already converted
    if (lead.deal) {
      return NextResponse.json(
        { error: "Deal already exists for this lead" },
        { status: 400 },
      );
    }

    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) {
      return NextResponse.json(
        { error: "Invalid deal amount" },
        { status: 400 },
      );
    }

    // ✅ CREATE DEAL (dealName used)
    const deal = await prisma.deal.create({
      data: {
        name: dealName, // 🔥 MAIN CHANGE
        email: lead.email,
        amount: amt,
        owner,
        stage: "New",
        leadId: lead.id,
        userId: user.id,
      },
    });

    // ✅ UPDATE LEAD STATUS
    await prisma.lead.update({
      where: { id: lead.id },
      data: { status: Status.Converted },
    });

    return NextResponse.json(deal, { status: 201 });
  } catch (err) {
    console.error("CONVERT ERROR 👉", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
