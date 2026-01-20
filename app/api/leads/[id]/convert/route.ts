import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
import { Status } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }, // 🔥 FIX 1
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, owner } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 🔥 FIX 1 (important)
    const { id } = await params;

    const lead = await prisma.lead.findFirst({
      where: { id, userId: user.id },
      include: { deal: true },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // 🔥 FIX 2 (enum-safe check)
    if (lead.status !== Status.Qualified) {
      return NextResponse.json(
        { error: "Only qualified leads can be converted" },
        { status: 400 },
      );
    }

    // already converted
    if (lead.deal) {
      return NextResponse.json(
        { error: "Deal already exists" },
        { status: 400 },
      );
    }

    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const deal = await prisma.deal.create({
      data: {
        name: lead.name,
        email: lead.email,
        amount: amt,
        owner,
        stage: "New",
        leadId: lead.id,
        userId: user.id,
      },
    });

    await prisma.lead.update({
      where: { id: lead.id },
      data: { status: Status.Converted }, // 🔥 enum-safe
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
