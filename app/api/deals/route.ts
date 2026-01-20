// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const deals = await prisma.deal.findMany({
//     include: { lead: true },
//   });
//   return NextResponse.json(deals);
// }
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all deals
export async function GET() {
  try {
    const deals = await prisma.deal.findMany({
      include: {
        lead: true,
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(deals);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch deals" },
      { status: 500 },
    );
  }
}
