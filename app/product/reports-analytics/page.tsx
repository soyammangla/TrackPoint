"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ranges = ["7 Days", "30 Days", "90 Days"];

export default function ReportsAnalyticsPage() {
  const [range, setRange] = useState("30 Days");

  const kpis = [
    { title: "Total Revenue", value: "₹4.2L", badge: "+18%", icon: DollarSign },
    { title: "New Leads", value: "312", badge: "+12%", icon: Users },
    { title: "Conversion Rate", value: "36%", badge: "+6%", icon: TrendingUp },
    {
      title: "Active Deals",
      value: "58",
      badge: "In pipeline",
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-black text-gray-900 dark:text-neutral-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-600 dark:text-neutral-400">
            Track performance, revenue growth, and sales efficiency
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          {ranges.map((r) => (
            <Button
              key={r}
              variant={range === r ? "default" : "outline"}
              onClick={() => setRange(r)}
            >
              {r}
            </Button>
          ))}

          <Button className="gap-2">
            <Download size={16} /> Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="rounded-2xl dark:bg-neutral-900 dark:border-neutral-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">{kpi.title}</CardTitle>
                <kpi.icon className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{kpi.value}</p>
                <Badge
                  className="mt-2"
                  variant={kpi.badge.includes("+") ? "default" : "outline"}
                >
                  {kpi.badge}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="rounded-2xl dark:bg-neutral-900 dark:border-neutral-800">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <p className="text-sm text-neutral-400">
                Sales performance over selected period
              </p>
            </CardHeader>
            <CardContent className="h-320px flex items-center justify-center dark:bg-neutral-950">
              <p className="text-gray-500 dark:text-neutral-400">
                📊 Line / Area Chart
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="rounded-2xl dark:bg-neutral-900 dark:border-neutral-800">
            <CardHeader>
              <CardTitle>Lead Sources</CardTitle>
              <p className="text-sm text-neutral-400">
                Distribution of incoming leads
              </p>
            </CardHeader>
            <CardContent className="h-320px flex items-center justify-center dark:bg-neutral-950">
              <p className="text-gray-500 dark:text-neutral-400">
                📈 Pie / Bar Chart
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
