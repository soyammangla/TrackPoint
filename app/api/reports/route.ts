import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          plan: "FREE",
          metrics: {
            totalLeads: 0,
            dealsClosed: 0,
            revenue: 0,
            conversionRate: 0,
          },
          monthlyReport: [],
        },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, plan: true },
    });

    if (!user) {
      return NextResponse.json(
        {
          plan: "FREE",
          metrics: {
            totalLeads: 0,
            dealsClosed: 0,
            revenue: 0,
            conversionRate: 0,
          },
          monthlyReport: [],
        },
        { status: 404 },
      );
    }

    const totalLeads = await prisma.lead.count({
      where: { userId: user.id },
    });

    const dealsClosed = await prisma.deal.count({
      where: {
        userId: user.id,
        stage: { in: ["Closed Won", "Closed Lost"] },
      },
    });

    const revenueAgg = await prisma.deal.aggregate({
      where: {
        userId: user.id,
        stage: "Closed Won",
      },
      _sum: { amount: true },
    });

    const revenue = revenueAgg._sum.amount ?? 0;

    const leads = await prisma.lead.findMany({
      where: { userId: user.id },
      select: { createdAt: true },
    });

    const deals = await prisma.deal.findMany({
      where: {
        userId: user.id,
        stage: { in: ["Closed Won", "Closed Lost"] },
      },
      select: { createdAt: true, amount: true },
    });

    const monthlyMap: Record<
      string,
      { month: string; leads: number; deals: number; pipelineValue: number }
    > = {};

    function getKey(d: Date) {
      return `${d.getFullYear()}-${d.getMonth() + 1}`;
    }

    function getLabel(d: Date) {
      return d.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
    }

    for (const l of leads) {
      const key = getKey(l.createdAt);
      if (!monthlyMap[key]) {
        monthlyMap[key] = {
          month: getLabel(l.createdAt),
          leads: 0,
          deals: 0,
          pipelineValue: 0,
        };
      }
      monthlyMap[key].leads++;
    }

    for (const d of deals) {
      const key = getKey(d.createdAt);
      if (!monthlyMap[key]) {
        monthlyMap[key] = {
          month: getLabel(d.createdAt),
          leads: 0,
          deals: 0,
          pipelineValue: 0,
        };
      }
      monthlyMap[key].deals++;
      monthlyMap[key].pipelineValue += d.amount;
    }

    const monthlyReport = Object.entries(monthlyMap)
      .sort(([a], [b]) => (a > b ? 1 : -1))
      .map(([, v]) => v);

    const conversionRate =
      totalLeads === 0
        ? 0
        : Number(((dealsClosed / totalLeads) * 100).toFixed(1));

    return NextResponse.json({
      plan: user.plan,
      metrics: {
        totalLeads,
        dealsClosed,
        revenue,
        conversionRate,
      },
      monthlyReport,
    });
  } catch (e) {
    console.error("REPORTS_API_ERROR", e);
    return NextResponse.json({
      plan: "FREE",
      metrics: {
        totalLeads: 0,
        dealsClosed: 0,
        revenue: 0,
        conversionRate: 0,
      },
      monthlyReport: [],
    });
  }
}
