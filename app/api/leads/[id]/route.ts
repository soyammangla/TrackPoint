import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";

async function getId(context: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const params =
    "then" in context.params ? await context.params : context.params;
  const { id } = params;
  if (!id) throw new Error("Missing ID in params");
  return id;
}

export async function GET(
  req: Request,
  context: { params: { id: string } | Promise<{ id: string }> },
) {
  const id = await getId(context);

  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const lead = await prisma.lead.findUnique({ where: { id } });

  if (!lead)
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  if (lead.userId !== user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json(lead);
}

export async function PUT(
  req: Request,
  context: { params: { id: string } | Promise<{ id: string }> },
) {
  const id = await getId(context);

  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead)
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  if (lead.userId !== user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const updated = await prisma.lead.update({
    where: { id },
    data: {
      name: body.name,
      email: body.email || null,
      phone: body.phone,
      status: body.status,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } | Promise<{ id: string }> },
) {
  const id = await getId(context);

  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead)
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  if (lead.userId !== user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const dealCount = await prisma.deal.count({ where: { leadId: id } });
  if (dealCount > 0)
    return NextResponse.json(
      { error: "Cannot delete lead with active deals" },
      { status: 400 },
    );

  await prisma.lead.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

export async function POST(
  req: Request,
  context: { params: { id: string } | Promise<{ id: string }> },
) {
  const id = await getId(context);

  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { amount, owner } = body;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { deal: true },
  });
  if (!lead)
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  if (lead.status !== "Qualified")
    return NextResponse.json(
      { error: "Only qualified leads can be converted" },
      { status: 400 },
    );
  if (lead.deal)
    return NextResponse.json({ error: "Deal already exists" }, { status: 400 });

  const deal = await prisma.deal.create({
    data: {
      name: lead.name,
      email: lead.email,
      amount: Number(amount),
      owner,
      stage: "New",
      leadId: lead.id,
      userId: user.id,
    },
  });

  await prisma.lead.update({ where: { id }, data: { status: "Converted" } });
  return NextResponse.json(deal);
}
