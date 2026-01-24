import { prisma } from "@/lib/prisma";

export async function getOrCreateUser(user: {
  email: string;
  name?: string | null;
  image?: string | null;
}) {
  return prisma.user.upsert({
    where: { email: user.email },
    update: {},
    create: {
      email: user.email,
      name: user.name ?? "",
      image: user.image ?? "",
      provider: "google",
    },
  });
}
