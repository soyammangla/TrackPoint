"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare, Users, Clock, BarChart3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here’s a quick overview of your workspace.
          </p>
        </div>
        <Button className="gap-2">
          Create Task <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            title: "Tasks",
            value: "24",
            icon: <CheckSquare className="text-primary" />,
          },
          {
            title: "Team Members",
            value: "8",
            icon: <Users className="text-primary" />,
          },
          {
            title: "Tracked Hours",
            value: "36h",
            icon: <Clock className="text-primary" />,
          },
          {
            title: "Reports",
            value: "5",
            icon: <BarChart3 className="text-primary" />,
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Today’s Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Design dashboard UI",
              "Fix login bug",
              "Team meeting at 4 PM",
            ].map((task, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <span>{task}</span>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>• You completed "Update landing page"</p>
            <p>• Rahul commented on "API integration"</p>
            <p>• Weekly report generated</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
