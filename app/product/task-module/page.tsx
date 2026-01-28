import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authoptions";
// import WorkflowAutomationClient from "./taskmoduleclient";
import TaskModuleClient from "./taskmoduleclient";

export default async function WorkflowAutomationPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <TaskModuleClient />;
}
