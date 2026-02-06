"use client";

import { useEffect, useState } from "react";
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

export default function ReportsPage() {
  const [data, setData] = useState<any>({
    metrics: {
      totalLeads: 0,
      totalDeals: 0,
      pipelineValue: 0,
      conversionRate: 0,
    },
    monthlyReport: [],
    plan: "FREE",
  });

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch(() => {}); // optional error handling
  }, []);

  const { metrics, monthlyReport, plan } = data;

  const metricCards = [
    {
      label: "Leads Generated",
      value: metrics.totalLeads,
      icon: Users,
      description: "Total leads generated",
    },
    {
      label: "Deals Closed",
      value: metrics.totalDeals,
      icon: TrendingUp,
      description: "Total deals closed",
    },
    {
      label: "Pipeline Value",
      value: `₹${metrics.pipelineValue.toLocaleString("en-IN")}`,
      icon: DollarSign,
      description: "Total value of deals in pipeline",
    },
    {
      label: "Conversion Rate",
      value: `${metrics.conversionRate}%`,
      icon: BarChart3,
      description: "Overall conversion percentage",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold mb-10">Reports & Analytics</h1>

      {/* METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((m) => (
          <Card
            key={m.label}
            className="relative group hover:shadow-lg transition-all"
          >
            <CardContent className="p-4 space-y-2">
              <m.icon />
              <p className="text-sm text-neutral-500">{m.label}</p>
              <h2 className="text-2xl font-bold">{m.value}</h2>

              {/* Tooltip */}
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block text-xs px-2 py-1 rounded bg-neutral-800 text-white whitespace-nowrap z-50">
                {m.description}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* TABLE */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Monthly Performance</CardTitle>
          <p className="text-sm text-neutral-500">
            Overview of leads & pipeline month by month
          </p>
        </CardHeader>

        <CardContent className="flex justify-center">
          <div className="overflow-x-auto w-[90%] rounded-xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full table-auto text-sm">
              <thead className="bg-neutral-100 dark:bg-neutral-900">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-neutral-600">
                    Month
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-neutral-600">
                    Leads
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-neutral-600">
                    Deals
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-neutral-600">
                    Pipeline Value
                  </th>
                </tr>
              </thead>

              <tbody>
                {monthlyReport.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-4 text-neutral-500"
                    >
                      Loading data...
                    </td>
                  </tr>
                ) : (
                  monthlyReport.map((m: any) => (
                    <tr
                      key={m.month}
                      className="border-b last:border-0 hover:bg-blue-50 dark:hover:bg-neutral-800 transition cursor-pointer"
                      title={`Month: ${m.month}, Leads: ${m.leads}, Deals: ${m.deals}, Pipeline: ₹${m.pipelineValue.toLocaleString(
                        "en-IN",
                      )}`}
                    >
                      <td className="px-4 py-3 font-medium whitespace-nowrap">
                        {m.month}
                      </td>
                      <td className="px-4 py-3 text-center font-medium">
                        {m.leads}
                      </td>
                      <td className="px-4 py-3 text-center font-medium">
                        {m.deals}
                      </td>
                      <td className="px-4 py-3 font-semibold text-right">
                        ₹{m.pipelineValue.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* CHARTS */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Trends & Insights</CardTitle>
          <p className="text-sm text-neutral-500">
            Growth patterns based on your activity
          </p>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          {plan === "FREE" && (
            <div className="h-64 flex flex-col items-center justify-center text-neutral-400 gap-3 w-[90%]">
              <p>Charts are available on the Pro plan</p>
              <Button>Upgrade to Pro</Button>
            </div>
          )}

          {plan === "PAID" && monthlyReport.length > 0 && (
            <div className="flex flex-col gap-12 w-[90%]">
              {/* Leads Trend */}
              <div className="h-80 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                <p className="text-sm font-medium mb-1">Leads Growth</p>
                <p className="text-xs text-neutral-500 mb-4">
                  Number of leads generated each month
                </p>

                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyReport}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      dataKey="leads"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Pipeline Trend */}
              <div className="h-80 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                <p className="text-sm font-medium mb-1">Pipeline Value</p>
                <p className="text-xs text-neutral-500 mb-4">
                  Total deal value trend over time
                </p>

                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyReport}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                    <XAxis dataKey="month" />
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
