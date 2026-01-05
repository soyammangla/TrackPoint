"use client";

import { useRef } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare, Users, Clock, BarChart3 } from "lucide-react";

export default function DashboardPage() {
  const tasksRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const reportsRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);

  // Dummy data (replace with API fetch)
  const tasks = [{ title: "Design UI", assignedTo: "Alice", done: false }];
  const team = [{ name: "Alice" }, { name: "Bob" }];
  const reports = [{ title: "Weekly Report", reviewed: false }];
  const trackedHours = [
    { name: "Alice", hours: 12 },
    { name: "Bob", hours: 8 },
  ];

  const scrollTo = (ref: any) =>
    ref.current?.scrollIntoView({ behavior: "smooth" });

  const stats = [
    { title: "Tasks", value: tasks.length, icon: CheckSquare, ref: tasksRef },
    { title: "Team Members", value: team.length, icon: Users, ref: teamRef },
    {
      title: "Tracked Hours",
      value: trackedHours.reduce((sum, t) => sum + t.hours, 0) + "h",
      icon: Clock,
      ref: hoursRef,
    },
    {
      title: "Reports",
      value: reports.length,
      icon: BarChart3,
      ref: reportsRef,
    },
  ];

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/dashboard/create-task">
            <Button size="lg">Create Task</Button>
          </Link>
          <Link href="/dashboard/report">
            <Button size="lg">Create Report</Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card
              key={i}
              className="rounded-2xl hover:shadow-lg transition cursor-pointer"
              onClick={() => scrollTo(s.ref)}
            >
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-sm text-muted-foreground">
                  {s.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{s.value}</div>
                <p className="text-xs text-muted-foreground mt-1 hover:underline cursor-pointer">
                  View details →
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sections (dummy placeholders) */}
      <div ref={tasksRef} className="mb-6">
        <Card className="rounded-2xl p-4">Tasks Section Placeholder</Card>
      </div>
      <div ref={teamRef} className="mb-6">
        <Card className="rounded-2xl p-4">Team Section Placeholder</Card>
      </div>
      <div ref={reportsRef} className="mb-6">
        <Card className="rounded-2xl p-4">Reports Section Placeholder</Card>
      </div>
      <div ref={hoursRef} className="mb-6">
        <Card className="rounded-2xl p-4">
          Tracked Hours Section Placeholder
        </Card>
      </div>
    </div>
  );
}
