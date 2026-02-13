import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const users = await prisma.user.findMany();
  return new Response(JSON.stringify(users));
}
