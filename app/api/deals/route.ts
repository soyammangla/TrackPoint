import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const deals = await prisma.deal.findMany({
      include: { owner: true }, // owner relation exist honi chahiye
    });
    return NextResponse.json(deals);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch deals" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, ownerId, stage, amount } = body;

    const deal = await prisma.deal.create({
      data: { name, email, ownerId, stage, amount },
    });

    return NextResponse.json(deal);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create deal" },
      { status: 500 }
    );
  }
}
