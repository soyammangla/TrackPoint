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
      badge: "In Pipeline",
      icon: BarChart3,
    },
  ];

  // PDF Export
  const handleExportPDF = async () => {
    const { jsPDF: jsPDFClass } = await import("jspdf");
    const doc = new jsPDFClass();

    // Title
    doc.setFontSize(18);
    doc.text("Reports & Analytics", 14, 20);

    // Range
    doc.setFontSize(12);
    doc.text(`Selected Range: ${range}`, 14, 30);

    // KPI Table
    const tableColumn = ["Title", "Value", "Change"];
    const tableRows = kpis.map((kpi) => [kpi.title, kpi.value, kpi.badge]);

    const { default: autoTable } = await import("jspdf-autotable");
    autoTable(doc, {
      startY: 40,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 12 },
    });

    // Footer / Charts Placeholder
    doc.setFontSize(12);
    const finalY = (doc as any).lastAutoTable?.finalY || 100;
    doc.text(
      "Charts (Revenue Trend, Lead Sources) would appear here",
      14,
      finalY + 20
    );

    // Save PDF
    doc.save(`Reports_${range.replace(" ", "_")}.pdf`);
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-black text-gray-900 dark:text-neutral-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-neutral-400 mt-1">
            Monitor your business performance, revenue trends, and sales
            efficiency
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          {ranges.map((r) => (
            <Button
              key={r}
              variant={range === r ? "default" : "outline"}
              className="rounded-xl px-4"
              onClick={() => setRange(r)}
            >
              {r}
            </Button>
          ))}

          <Button
            variant="default"
            className="gap-2 rounded-xl px-4"
            onClick={handleExportPDF}
          >
            <Download size={16} /> Export PDF
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="rounded-2xl p-4 dark:bg-neutral-900 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-neutral-400">
                  {kpi.title}
                </CardTitle>
                <kpi.icon
                  className="text-gray-400 dark:text-neutral-500"
                  size={20}
                />
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-neutral-100">
                  {kpi.value}
                </p>
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
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="rounded-2xl dark:bg-neutral-900 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Revenue Trend
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-neutral-400 mt-1">
                Visualize sales performance over selected period
              </p>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-gray-100 dark:bg-neutral-950 rounded-lg">
              <p className="text-gray-400 dark:text-neutral-500 text-center">
                📊 Line / Area Chart Placeholder
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lead Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="rounded-2xl dark:bg-neutral-900 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Lead Sources
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-neutral-400 mt-1">
                Distribution of incoming leads across channels
              </p>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-gray-100 dark:bg-neutral-950 rounded-lg">
              <p className="text-gray-400 dark:text-neutral-500 text-center">
                📈 Pie / Bar Chart Placeholder
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
