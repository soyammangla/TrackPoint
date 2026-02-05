"use client";

import Link from "next/link";

import { Users, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Leads",
      value: 124,
      change: "+12 this week",
      icon: Users,
    },
    {
      title: "Deals Won",
      value: 18,
      change: "+3 this week",
      icon: TrendingUp,
    },
    {
      title: "Revenue",
      value: "₹1,85,000",
      change: "+₹25,000",
      icon: DollarSign,
    },
    {
      title: "Conversion Rate",
      value: "14.5%",
      change: "+1.2%",
      icon: BarChart3,
    },
  ];

  return (
    <div className="p-6 space-y-6 min-h-screen bg-white dark:bg-black">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-neutral-500 mt-1">Quick snapshot of your business</p>
      </div>

      {/* OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">{stat.title}</span>
                <stat.icon size={18} />
              </div>

              <div className="text-3xl font-bold">{stat.value}</div>

              <p className="text-xs text-green-500">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* NOTE */}
      <Card>
        <CardContent className="p-4 text-sm text-black dark:text-white">
          This dashboard shows a real-time overview of your sales performance.
          For detailed analysis, visit the{" "}
          <Link
            href="/reports"
            className="text-blue-600 hover:underline font-medium"
          >
            Reports & Analytics
          </Link>{" "}
          section.
        </CardContent>
      </Card>
    </div>
  );
}
