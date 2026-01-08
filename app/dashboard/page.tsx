"use client";

import { useState } from "react";
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

type Stat = {
  key: string;
  title: string;
  value: string;
  change: string;
  icon: any;
};

const STATS: Stat[] = [
  {
    key: "leads",
    title: "Total Leads",
    value: "1,248",
    change: "+12%",
    icon: Users,
  },
  {
    key: "workflows",
    title: "Active Workflows",
    value: "18",
    change: "+4%",
    icon: GitBranch,
  },
  {
    key: "conversion",
    title: "Conversion Rate",
    value: "32%",
    change: "+6%",
    icon: TrendingUp,
  },
  {
    key: "revenue",
    title: "Revenue",
    value: "₹4.6L",
    change: "+9%",
    icon: BarChart3,
  },
];

const LEADS = [
  { name: "Rahul Sharma", status: "New", owner: "Amit" },
  { name: "Priya Verma", status: "Contacted", owner: "Neha" },
  { name: "Ankit Singh", status: "Qualified", owner: "Rohit" },
];

const WORKFLOWS = [
  { name: "Assign New Lead", active: true },
  { name: "Deal Won Follow-up", active: true },
  { name: "Cold Lead Reminder", active: false },
];

export default function DashboardPage() {
  const [tab, setTab] = useState<"overview" | "leads" | "revenue">("overview");
  const [filter, setFilter] = useState<"today" | "month">("month");
  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800); // backend later
  };

  return (
    <div className="p-6 space-y-8 bg-white dark:bg-neutral-950 text-black dark:text-white min-h-screen transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm opacity-70">
            CRM performance & business insights
          </p>
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
          <Button variant="outline" onClick={refreshData}>
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800 pb-2">
        {["overview", "leads", "revenue"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`text-sm capitalize pb-2 transition ${
              tab === t
                ? "border-b-2 border-black dark:border-white font-medium"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-neutral-900 p-5 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-4">
              <stat.icon className="opacity-70" />
              <span className="text-xs flex items-center gap-1 text-green-600">
                {stat.change} <ArrowUpRight size={12} />
              </span>
            </div>
            <h2 className="text-2xl font-bold">{stat.value}</h2>
            <p className="text-sm opacity-70">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-neutral-900 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Recent Leads</h2>
            <Button size="sm" variant="outline">
              View All
            </Button>
          </div>

          <table className="w-full text-sm">
            <thead className="opacity-60 border-b dark:border-gray-800">
              <tr>
                <th className="text-left py-2">Name</th>
                <th>Status</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {LEADS.map((lead, i) => (
                <tr
                  key={i}
                  className="border-b last:border-none dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                >
                  <td className="py-2">{lead.name}</td>
                  <td className="text-center">{lead.status}</td>
                  <td className="text-center">{lead.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Workflows */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-neutral-900 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Automations</h2>
            <Button size="sm" variant="outline">
              Manage
            </Button>
          </div>

          <div className="space-y-3">
            {WORKFLOWS.map((wf, i) => (
              <div
                key={i}
                className="flex justify-between items-center px-3 py-2 rounded-lg bg-white dark:bg-neutral-950 border dark:border-gray-800"
              >
                <span className="text-sm">{wf.name}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    wf.active
                      ? "bg-green-600 text-white"
                      : "bg-gray-400 text-black"
                  }`}
                >
                  {wf.active ? "Active" : "Inactive"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
