"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users,
  GitBranch,
  TrendingUp,
  BarChart3,
  RefreshCcw,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ---------- TYPES ---------- */
type Stat = {
  id: string;
  title: string;
  value: string;
  change: string;
  icon: any;
};

/* ---------- DATA ---------- */
const INITIAL_STATS: Stat[] = [
  {
    id: "leads",
    title: "Total Leads",
    value: "1248",
    change: "+12%",
    icon: Users,
  },
  {
    id: "workflows",
    title: "Active Workflows",
    value: "18",
    change: "+4%",
    icon: GitBranch,
  },
  {
    id: "conversion",
    title: "Conversion Rate",
    value: "32%",
    change: "+6%",
    icon: TrendingUp,
  },
  {
    id: "revenue",
    title: "Revenue",
    value: "₹4.6L",
    change: "+9%",
    icon: BarChart3,
  },
];

const INITIAL_LEADS = [
  { id: 1, name: "Rahul Sharma", status: "New", owner: "Amit" },
  { id: 2, name: "Priya Verma", status: "Contacted", owner: "Neha" },
  { id: 3, name: "Ankit Singh", status: "Qualified", owner: "Rohit" },
];

const INITIAL_WORKFLOWS = [
  { id: 1, name: "Assign New Lead", active: true },
  { id: 2, name: "Deal Won Follow-up", active: true },
  { id: 3, name: "Cold Lead Reminder", active: false },
];

export default function DashboardClient() {
  const router = useRouter();

  const [stats] = useState(INITIAL_STATS);
  const [leads] = useState(INITIAL_LEADS);
  const [workflows, setWorkflows] = useState(INITIAL_WORKFLOWS);

  const [filter, setFilter] = useState<"today" | "month">("month");
  const [tab, setTab] = useState<"overview" | "leads" | "revenue">("overview");
  const [loading, setLoading] = useState(false);

  /* ---------- ACTIONS ---------- */
  const refreshDashboard = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const toggleWorkflow = (id: number) => {
    setWorkflows((prev) =>
      prev.map((wf) => (wf.id === id ? { ...wf, active: !wf.active } : wf))
    );
  };

  /* ---------- UI ---------- */
  return (
    <div className="p-6 space-y-8 bg-white dark:bg-neutral-950 text-black dark:text-white min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-xl mt-2">CRM overview & performance</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={filter === "today" ? "default" : "outline"}
            onClick={() => setFilter("today")}
          >
            Today
          </Button>
          <Button
            variant={filter === "month" ? "default" : "outline"}
            onClick={() => setFilter("month")}
          >
            This Month
          </Button>
          <Button variant="outline" onClick={refreshDashboard}>
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
          </Button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-6 border-b border-gray-200 dark:border-gray-800 pb-2">
        {["overview", "leads", "revenue"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`capitalize text-sm pb-2 ${
              tab === t
                ? "border-b-2 border-black dark:border-white font-semibold"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border bg-gray-50 dark:bg-neutral-900 p-5 cursor-pointer"
            onClick={() => {
              if (stat.id === "leads") router.push("/product/lead-management");
              if (stat.id === "workflows")
                router.push("/product/workflow-automation");
            }}
          >
            <div className="flex justify-between mb-4">
              <stat.icon />
              <span className="text-xs text-green-600 flex gap-1">
                {stat.change} <ArrowUpRight size={12} />
              </span>
            </div>
            <h2 className="text-2xl font-bold">{stat.value}</h2>
            <p className="text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RECENT LEADS */}
        <div className="lg:col-span-2 rounded-2xl border bg-gray-50 dark:bg-neutral-900 p-5">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Recent Leads</h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push("/product/lead-management")}
            >
              View All
            </Button>
          </div>

          <table className="w-full text-sm">
            <thead className="opacity-60 border-b">
              <tr>
                <th className="text-left py-2">Name</th>
                <th>Status</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b">
                  <td className="py-2">{lead.name}</td>
                  <td className="text-center">{lead.status}</td>
                  <td className="text-center">{lead.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* WORKFLOWS */}
        <div className="rounded-2xl border bg-gray-50 dark:bg-neutral-900 p-5">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Automations</h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push("/product/workflow-automation")}
            >
              Manage
            </Button>
          </div>

          <div className="space-y-3">
            {workflows.map((wf) => (
              <div
                key={wf.id}
                className="flex justify-between items-center p-3 rounded-lg bg-white dark:bg-neutral-950"
              >
                <span>{wf.name}</span>
                <Button
                  size="sm"
                  variant={wf.active ? "default" : "outline"}
                  onClick={() => toggleWorkflow(wf.id)}
                >
                  {wf.active ? "Active" : "Inactive"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
