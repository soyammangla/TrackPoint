import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, ownerId } = body;

    // Find owner user
    const user = await prisma.user.findUnique({
      where: { id: ownerId },
      include: { clients: true }, // assuming user has clients relation
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.clients.length >= user.clientLimit) {
      return NextResponse.json(
        { error: "Upgrade plan to add more clients" },
        { status: 403 }
      );
    }

    const client = await prisma.client.create({
      data: { name, email, phone, ownerId },
    });

    return NextResponse.json(client);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
