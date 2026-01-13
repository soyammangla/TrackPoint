import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const leads = await prisma.lead.findMany({
    orderBy: { id: "desc" },
  });
  return NextResponse.json(leads);
}

export async function POST(req: Request) {
  const body = await req.json();

  const lead = await prisma.lead.create({
    data: body,
  });

  return NextResponse.json(lead);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")!;

  await prisma.lead.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
  const body = await req.json();

  const lead = await prisma.lead.update({
    where: { id: body.id },
    data: body,
  });

  return NextResponse.json(lead);
}
