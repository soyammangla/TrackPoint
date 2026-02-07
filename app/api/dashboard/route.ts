import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // ✅ TOTAL LEADS
  const totalLeads = await prisma.lead.count({
    where: { userId: user.id },
  });

  // ✅ DEALS WON (ONLY CLOSED WON)
  const dealsWon = await prisma.deal.count({
    where: {
      userId: user.id,
      stage: "Closed Won",
    },
  });

  // ✅ REVENUE (ONLY CLOSED WON)
  const revenueAgg = await prisma.deal.aggregate({
    where: {
      userId: user.id,
      stage: "Closed Won",
    },
    _sum: { amount: true },
  });

  const revenue = revenueAgg._sum.amount ?? 0;

  // ✅ CONVERSION RATE
  const conversionRate =
    totalLeads === 0 ? 0 : Number(((dealsWon / totalLeads) * 100).toFixed(1));

  return NextResponse.json({
    totalLeads,
    dealsWon,
    revenue,
    conversionRate,
  });
}
