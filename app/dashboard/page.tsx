import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authoptions";
import DashboardClient from "./dashboardclient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // ❌ User logged in nahi hai
  if (!session) {
    redirect("/login");
  }

  // ✅ User logged in hai
  return <DashboardClient />;
}
