import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authoptions";
import SalesPipelineClient from "./salespipelineclient";

export default async function SalesPipelinePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <SalesPipelineClient />;
}
