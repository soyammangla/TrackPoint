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
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
  const [data, setData] = useState<any>({
    plan: "FREE",
    metrics: {
      totalLeads: 0,
      dealsClosed: 0,
      revenue: 0,
      conversionRate: 0,
    },
    monthlyReport: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, []);

  const metrics = data?.metrics ?? {
    totalLeads: 0,
    dealsClosed: 0,
    revenue: 0,
    conversionRate: 0,
  };

  const monthlyReport = Array.isArray(data?.monthlyReport)
    ? data.monthlyReport
    : [];

  const plan = data?.plan ?? "FREE";

  const metricCards = [
    {
      label: "Leads Generated",
      value: metrics.totalLeads,
      icon: Users,
    },
    {
      label: "Deals Closed",
      value: metrics.dealsClosed,
      icon: TrendingUp,
    },
    {
      label: "Revenue",
      value: `₹${metrics.revenue.toLocaleString("en-IN")}`,
      icon: DollarSign,
    },
    {
      label: "Conversion Rate",
      value: `${metrics.conversionRate}%`,
      icon: BarChart3,
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        Reports & Analytics
      </h1>

      {/* METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-4 sm:p-5 space-y-2 flex flex-col items-start">
              <m.icon />
              <p className="text-sm text-black dark:text-white">{m.label}</p>
              <h2 className="text-2xl font-bold">{m.value}</h2>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-520px text-sm">
            <thead className="border-b text-black dark:text-white">
              <tr>
                <th className="text-left py-2">Month</th>
                <th className="text-center">Leads</th>
                <th className="text-center">Deals</th>
                <th className="text-right">Pipeline</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : monthlyReport.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-neutral-400">
                    No data available
                  </td>
                </tr>
              ) : (
                monthlyReport.map((m: any) => (
                  <tr key={m.month} className="border-b last:border-0">
                    <td className="py-2">{m.month}</td>
                    <td className="text-center">{m.leads}</td>
                    <td className="text-center">{m.deals}</td>
                    <td className="text-right font-semibold">
                      ₹{m.pipelineValue.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))
              )}
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
          {plan === "FREE" && (
            <div className="h-40 flex flex-col items-center justify-center gap-3 text-center px-4">
              <p>Charts are available on Pro plan</p>
              <Link href="/pricing">
                <Button>Upgrade</Button>
              </Link>
            </div>
          )}

          {plan === "PAID" && monthlyReport.length > 0 && (
            <div className="flex flex-col gap-12">
              {/* LEADS TREND */}
              <div className="h-64 sm:h-80 p-4 sm:p-5 mb-5 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <div className="mb-3">
                  <h3 className="text-md font-bold">Leads Growth</h3>
                  <p className="text-sm mb-8 text-black dark:text-white font-semibold">
                    Number of leads generated each month
                  </p>
                </div>

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

              {/* PIPELINE / REVENUE TREND */}
              <div className="h-64 sm:h-80 p-4 sm:p-5 my-5 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <div className="mb-3">
                  <h3 className="text-md font-bold">Revenue Trend</h3>
                  <p className="text-sm mb-8 text-black dark:text-white font-semibold">
                    Total value of closed-won deals (₹)
                  </p>
                </div>

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
                      radius={[6, 6, 0, 0]}
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
