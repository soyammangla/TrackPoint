"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Users, DollarSign, TrendingUp, Filter } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* ---------- TYPES ---------- */
type AutomationReport = {
  id: number;
  name: string;
  trigger: string;
  success: number;
  status: "Active" | "Inactive";
};

type User = {
  name: string;
  plan: "free" | "paid";
  automationLimit: number;
};

/* ---------- TRIGGERS ---------- */
const TRIGGERS = ["New Lead Created", "Deal Stage Changed", "Deal Won"];

export default function ReportsAnalyticsPage() {
  /* ---------- SIMULATED USER ---------- */
  const [user] = useState<User>({
    name: "Demo User",
    plan: "free", // change to "paid" to test paid plan
    automationLimit: 10,
  });

  /* ---------- STATE ---------- */
  const [automations, setAutomations] = useState<AutomationReport[]>([]); // EMPTY START
  const [dateRange, setDateRange] = useState("30");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");
  const [showFilters, setShowFilters] = useState(false);

  /* ---------- FILTERED DATA ---------- */
  const filteredAutomations = useMemo(() => {
    if (statusFilter === "All") return automations;
    return automations.filter((a) => a.status === statusFilter);
  }, [statusFilter, automations]);

  /* ---------- STATS ---------- */
  const stats = useMemo(() => {
    const totalLeads = 0;
    const dealsWon = 0;
    const revenue = 0;

    return [
      { title: "Total Leads", value: totalLeads, icon: Users },
      { title: "Deals Won", value: dealsWon, icon: TrendingUp },
      {
        title: "Revenue",
        value: new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(revenue),
        icon: DollarSign,
      },
      { title: "Conversion Rate", value: "0%", icon: BarChart3 },
    ];
  }, [automations, dateRange]);

  /* ---------- ADD AUTOMATION ---------- */
  const addAutomation = () => {
    if (automations.length >= user.automationLimit) {
      alert(`Upgrade plan to add more automations`);
      return;
    }

    setAutomations([
      ...automations,
      {
        id: Date.now(),
        name: `New Automation`,
        trigger: TRIGGERS[0],
        success: 0,
        status: "Active",
      },
    ]);
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-neutral-100 transition-colors">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Reports & Analytics</h1>
          <p className="text-xl mt-2 text-black dark:text-white">
            Sales, leads & automation insights (Plan: {user.plan.toUpperCase()})
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters((prev) => !prev)}
            className="border-neutral-300 dark:border-neutral-700"
          >
            <Filter size={16} />
          </Button>
          <Button onClick={addAutomation}>Add Automation</Button>
        </div>
      </div>

      {/* FILTER PANEL */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 flex flex-wrap gap-3 items-center"
          >
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 rounded-md border border-neutral-300 bg-white dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 rounded-md border border-neutral-300 bg-white dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200"
            >
              <option value="All">All Automations</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setDateRange("30");
                setStatusFilter("All");
                setShowFilters(false);
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
          >
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-black dark:text-white">
                  {stat.title}
                </span>
                <stat.icon size={18} className="text-black dark:text-white" />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FUNNEL */}
      <Card className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
        <CardHeader>
          <CardTitle>Sales Funnel</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-black dark:text-white">
          <div>
            New Leads: <b>0</b>
          </div>
          <div>
            Contacted: <b>0</b>
          </div>
          <div>
            Qualified: <b>0</b>
          </div>
          <div>
            Deals Won: <b>0</b>
          </div>
        </CardContent>
      </Card>

      {/* AUTOMATION TABLE */}
      <Card className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
        <CardHeader>
          <CardTitle>Automation Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
              <tr>
                <th className="text-left py-2">Automation</th>
                <th className="text-left">Trigger</th>
                <th className="text-left">Success</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAutomations.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-neutral-200 dark:border-neutral-800
                  hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition"
                >
                  <td className="py-2">{a.name}</td>
                  <td>{a.trigger}</td>
                  <td>{a.success}%</td>
                  <td
                    className={
                      a.status === "Active"
                        ? "text-green-500"
                        : "text-neutral-400"
                    }
                  >
                    {a.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
