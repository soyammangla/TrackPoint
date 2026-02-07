"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const [stats, setStats] = useState([
    { title: "Total Leads", value: "—", icon: Users },
    { title: "Deals Won", value: "—", icon: TrendingUp },
    { title: "Revenue", value: "—", icon: DollarSign },
    { title: "Conversion Rate", value: "—", icon: BarChart3 },
  ]);

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("/api/dashboard");
      const data = await res.json();

      setStats([
        {
          title: "Total Leads",
          value: data.totalLeads ?? 0,
          icon: Users,
        },
        {
          title: "Deals Won",
          value: data.dealsWon ?? 0, // ✅ ONLY CLOSED WON
          icon: TrendingUp,
        },
        {
          title: "Revenue",
          value: `₹${(data.revenue ?? 0).toLocaleString("en-IN")}`, // ✅ ONLY CLOSED WON
          icon: DollarSign,
        },
        {
          title: "Conversion Rate",
          value: `${data.conversionRate ?? 0}%`,
          icon: BarChart3,
        },
      ]);
    }

    fetchStats();
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-6 min-h-screen bg-white dark:bg-black">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Dashboard
        </h1>
        <p className="text-black dark:text-white font-semibold mt-1 max-w-xl">
          Quick snapshot of your business
        </p>
      </div>

      {/* CARDS (UI SAME) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4 sm:p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-black dark:text-white">
                  {stat.title}
                </span>
                <stat.icon size={18} />
              </div>
              <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* NOTE */}
      <Card>
        <CardContent className="p-4 text-sm leading-relaxed">
          This dashboard shows a real-time overview of your sales performance.
          For detailed analysis, visit{" "}
          <Link
            href="/product/reports-analytics"
            className="text-blue-600 hover:underline font-medium"
          >
            Reports & Analytics
          </Link>
          .
        </CardContent>
      </Card>
    </div>
  );
}
