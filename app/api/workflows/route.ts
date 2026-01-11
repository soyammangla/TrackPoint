import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, trigger, actions } = await req.json();

  // find user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // create workflow
  const wf = await prisma.workflow.create({
    data: {
      name,
      trigger,
      actions,
      userId: user.id, // ✅ include this
    },
  });

  return NextResponse.json(wf);
}
