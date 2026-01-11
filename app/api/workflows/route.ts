// app/api/workflows/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const workflows = await prisma.workflow.findMany();
  return NextResponse.json(workflows);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, trigger, actions } = body;

  const wf = await prisma.workflow.create({
    data: { name, trigger, actions },
  });

  return NextResponse.json(wf);
}
