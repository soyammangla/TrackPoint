import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json([]);

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { leads: true },
  });

  return Response.json(user?.leads || []);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json({ error: "Unauthorized" });

  const data = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { leads: true },
  });

  if (!user) return Response.json({ error: "User not found" });

  if (user.plan === "free" && user.leads.length >= user.clientLimit) {
    return Response.json({ error: "LIMIT" });
  }

  const lead = await prisma.lead.create({
    data: {
      ...data,
      userId: user.id,
    },
  });

  return Response.json(lead);
}
