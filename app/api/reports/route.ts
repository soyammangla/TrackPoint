import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, plan: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  /* ---------- TOTAL METRICS ---------- */
  const totalLeads = await prisma.lead.count({
    where: { userId: user.id },
  });

  const totalDeals = await prisma.deal.count({
    where: { userId: user.id },
  });

  const pipelineAgg = await prisma.deal.aggregate({
    where: { userId: user.id },
    _sum: { amount: true },
  });

  /* ---------- MONTHLY DATA ---------- */
  const leads = await prisma.lead.findMany({
    where: { userId: user.id },
    select: { createdAt: true },
  });

  const deals = await prisma.deal.findMany({
    where: { userId: user.id },
    select: { createdAt: true, amount: true },
  });

  const monthlyMap: Record<
    string,
    { month: string; leads: number; deals: number; pipelineValue: number }
  > = {};

  function keyFromDate(d: Date) {
    return `${d.getFullYear()}-${d.getMonth() + 1}`;
  }

  leads.forEach((l) => {
    const key = keyFromDate(l.createdAt);
    if (!monthlyMap[key]) {
      monthlyMap[key] = {
        month: l.createdAt.toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        }),
        leads: 0,
        deals: 0,
        pipelineValue: 0,
      };
    }
    monthlyMap[key].leads++;
  });

  deals.forEach((d) => {
    const key = keyFromDate(d.createdAt);
    if (!monthlyMap[key]) {
      monthlyMap[key] = {
        month: d.createdAt.toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        }),
        leads: 0,
        deals: 0,
        pipelineValue: 0,
      };
    }
    monthlyMap[key].deals++;
    monthlyMap[key].pipelineValue += d.amount;
  });

  const monthlyReport = Object.values(monthlyMap);

  return NextResponse.json({
    plan: user.plan, // FREE | PAID
    metrics: {
      totalLeads,
      totalDeals,
      pipelineValue: pipelineAgg._sum.amount || 0,
      conversionRate:
        totalLeads === 0
          ? 0
          : Number(((totalDeals / totalLeads) * 100).toFixed(1)),
    },
    monthlyReport,
  });
}
