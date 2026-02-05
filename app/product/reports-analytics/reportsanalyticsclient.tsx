"use client";

import { Users, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* ---------- DUMMY USER ---------- */
const user = {
  plan: "free", // change to "paid" to unlock charts
};

/* ---------- HELPERS ---------- */
const formatMonthYear = (month: number, year: number) => {
  const date = new Date(year, month - 1);
  return date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export default function ReportsPage() {
  /* ---------- METRICS ---------- */
  const metrics = [
    { label: "Leads Generated", value: 124, icon: Users },
    { label: "Deals Closed", value: 18, icon: TrendingUp },
    { label: "Revenue", value: "₹1,85,000", icon: DollarSign },
    { label: "Conversion Rate", value: "14.5%", icon: BarChart3 },
  ];

  /* ---------- MONTHLY DATA (REALISTIC) ---------- */
  const monthlyReport = [
    { year: 2024, month: 1, leads: 30, revenue: 40000 },
    { year: 2024, month: 2, leads: 42, revenue: 65000 },
    { year: 2024, month: 3, leads: 52, revenue: 80000 },
    { year: 2025, month: 1, leads: 60, revenue: 95000 },
  ].map((item) => ({
    ...item,
    label: formatMonthYear(item.month, item.year),
  }));

  return (
    <div className="p-6 space-y-6 min-h-screen bg-white dark:bg-neutral-950">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Reports & Analytics</h1>
          <p className="text-neutral-500 mt-1">
            Month & Year based performance
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">Last 30 Days</Button>
          <Button variant="outline">This Year</Button>
        </div>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-4 space-y-2">
              <m.icon />
              <p className="text-sm text-neutral-500">{m.label}</p>
              <h2 className="text-2xl font-bold">{m.value}</h2>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MONTHLY TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="border-b text-neutral-500">
              <tr>
                <th className="text-left py-2">Month</th>
                <th className="text-left">Leads</th>
                <th className="text-left">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {monthlyReport.map((row) => (
                <tr key={`${row.month}-${row.year}`} className="border-b">
                  <td className="py-2">{row.label}</td>
                  <td>{row.leads}</td>
                  <td>₹{row.revenue.toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* CHARTS */}
      <Card>
        <CardHeader>
          <CardTitle>Trends & Insights</CardTitle>
        </CardHeader>
        <CardContent>
          {user.plan === "free" && (
            <div className="h-64 flex flex-col items-center justify-center text-neutral-400 gap-3">
              <p>Charts are available on paid plan</p>
              <Button>Upgrade to Pro</Button>
            </div>
          )}

          {user.plan === "paid" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyReport}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="leads" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyReport}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
