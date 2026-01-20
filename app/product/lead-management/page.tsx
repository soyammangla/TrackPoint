// app/lead-management/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authoptions";
import LeadManagementClient from "./leadmanagementclient";
import { DealsProvider } from "@/context/dealscontext";

export default async function LeadManagementPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <DealsProvider>
      <LeadManagementClient />
    </DealsProvider>
  );
}
