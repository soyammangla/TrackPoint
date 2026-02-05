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

/* ---------- DUMMY USER (FRONTEND ONLY) ---------- */
const user = {
  plan: "free", // change to "paid" to unlock charts
};

/* ---------- MONTH UTILS (REALISTIC) ---------- */
function getLastNMonths(n = 6) {
  const months = [];
  const now = new Date();

  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${d.getMonth() + 1}`, // UNIQUE (year+month)
      label: d.toLocaleString("en-US", { month: "short", year: "numeric" }), // Jan 2026
      year: d.getFullYear(),
      month: d.getMonth() + 1,
    });
  }

  return months;
}

export default function ReportsPage() {
  /* ---------- METRICS (DUMMY) ---------- */
  const metrics = [
    { label: "Leads Generated", value: 124, icon: Users },
    { label: "Deals Closed", value: 18, icon: TrendingUp },
    { label: "Pipeline Value", value: "₹3,40,000", icon: DollarSign },
    { label: "Conversion Rate", value: "14.5%", icon: BarChart3 },
  ];

  /* ---------- MONTHLY DATA (YEAR SAFE) ---------- */
  const months = getLastNMonths(6);

  const monthlyReport = months.map((m) => {
    const leads = Math.floor(Math.random() * 80) + 20;
    const dealsClosed = Math.floor(leads * (Math.random() * 0.2 + 0.05));
    const pipelineValue = Math.floor(Math.random() * 200000) + 100000;

    return {
      key: m.key,
      monthLabel: m.label,
      leads,
      dealsClosed,
      conversionRate: Number(((dealsClosed / leads) * 100).toFixed(1)),
      pipelineValue,
    };
  });

  return (
    <div className="p-6 space-y-6 min-h-screen bg-white dark:bg-neutral-950">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Reports & Analytics</h1>
          <p className="text-neutral-500 mt-1">
            Deep insights into sales & performance
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">Last 7 Days</Button>
          <Button variant="outline">Last 30 Days</Button>
          <Button variant="outline">This Year</Button>
        </div>
      </div>

      {/* TOP METRICS */}
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
                <th className="text-left">Pipeline Value</th>
              </tr>
            </thead>
            <tbody>
              {monthlyReport.map((row) => (
                <tr key={row.key} className="border-b last:border-0">
                  <td className="py-2">{row.monthLabel}</td>
                  <td>{row.leads}</td>
                  <td>₹{row.pipelineValue.toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* CHARTS */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Trends & Insights</CardTitle>
          <p className="text-sm text-neutral-500">
            Month-wise & year-safe performance trends
          </p>
        </CardHeader>
        <CardContent>
          {user.plan === "free" && (
            <div className="h-64 flex flex-col items-center justify-center text-neutral-400 gap-3">
              <p>Charts are available on the paid plan</p>
              <Button>Upgrade to Pro</Button>
            </div>
          )}

          {user.plan === "paid" && (
            <div className="flex flex-col gap-16">
              {/* Leads Trend */}
              <div className="bg-neutral-50 dark:bg-neutral-900 p-5 rounded-2xl h-80 border border-neutral-200 dark:border-neutral-800">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Leads Growth
                </p>
                <p className="text-xs text-neutral-500 mb-3">
                  How lead volume changed over time
                </p>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyReport}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                    <XAxis dataKey="monthLabel" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="leads"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Pipeline Value Trend */}
              <div className="bg-neutral-50 dark:bg-neutral-900 p-5 rounded-2xl h-80 border border-neutral-200 dark:border-neutral-800">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Pipeline Value
                </p>
                <p className="text-xs text-neutral-500 mb-3">
                  Total value of open deals per period
                </p>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyReport}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                    <XAxis dataKey="monthLabel" />
                    <YAxis tickFormatter={(v) => `₹${v / 1000}k`} />
                    <Tooltip
                      formatter={(v) => `₹${Number(v).toLocaleString("en-IN")}`}
                    />
                    <Bar
                      dataKey="pipelineValue"
                      fill="#16a34a"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
