import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authoptions";
import BuyProClient from "./buyproclient";

export default async function BuyProPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <BuyProClient />;
}
