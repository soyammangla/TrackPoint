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

  const totalLeads = await prisma.lead.count({
    where: { userId: user!.id },
  });

  const dealsWon = await prisma.lead.count({
    where: {
      userId: user!.id,
      status: "Converted",
    },
  });

  const revenue = await prisma.deal.aggregate({
    where: { userId: user!.id },
    _sum: { amount: true },
  });

  const conversionRate =
    totalLeads === 0 ? 0 : ((dealsWon / totalLeads) * 100).toFixed(1);

  return NextResponse.json({
    totalLeads,
    dealsWon,
    revenue: revenue._sum.amount || 0,
    conversionRate,
  });
}
