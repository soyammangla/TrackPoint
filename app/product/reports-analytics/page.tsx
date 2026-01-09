import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authoptions";
import ReportsAnalyticsClient from "./reportsanalyticsclient";

export default async function ReportsAnalyticsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <ReportsAnalyticsClient />;
}
