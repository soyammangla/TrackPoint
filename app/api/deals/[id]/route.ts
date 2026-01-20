import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // make sure prisma client is imported correctly

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // params is a Promise → await it
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing deal ID" }, { status: 400 });
    }

    const body = await req.json();

    const updatedDeal = await prisma.deal.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email ?? null,
        amount: Number(body.amount),
        owner: body.owner ?? null,
        stage: body.stage,
      },
    });

    return NextResponse.json(updatedDeal);
  } catch (error) {
    console.error("UPDATE DEAL ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update deal" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing deal ID" }, { status: 400 });
    }

    await prisma.deal.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE DEAL ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete deal" },
      { status: 500 },
    );
  }
}
