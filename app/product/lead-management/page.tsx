"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, Plus, Filter, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function LeadManagementPage() {
  const [search, setSearch] = useState("");

  const leads = [
    { name: "Rahul Sharma", company: "TechNova", status: "New" },
    { name: "Ananya Verma", company: "EcoLife", status: "In Progress" },
    { name: "Aman Gupta", company: "Nexstore", status: "Converted" },
  ];

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-black text-gray-900 dark:text-neutral-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold">Product & Lead Management</h1>
          <p className="text-gray-600 dark:text-neutral-400">
            Manage products, track leads, and convert customers efficiently
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="gap-2">
            <Plus size={16} /> Add Lead
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter size={16} /> Filter
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { title: "Total Leads", value: "128", icon: Users },
          { title: "Active Products", value: "24", icon: Briefcase },
          { title: "Conversions", value: "36%", icon: ArrowUpRight },
        ].map((stat) => (
          <Card
            key={stat.title}
            className="dark:bg-neutral-900 dark:border-neutral-800"
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{stat.title}</CardTitle>
              <stat.icon className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lead List */}
      <Card className="rounded-2xl dark:bg-neutral-900 dark:border-neutral-800">
        <CardHeader>
          <CardTitle>Leads Overview</CardTitle>
          <Input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4 dark:bg-black dark:border-neutral-800"
          />
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {leads
              .filter((l) =>
                l.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((lead, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl
                  border bg-white dark:bg-neutral-950
                  dark:border-neutral-800"
                >
                  <div>
                    <p className="font-semibold">{lead.name}</p>
                    <p className="text-sm text-gray-500 dark:text-neutral-400">
                      {lead.company}
                    </p>
                  </div>
                  <Badge
                    variant={
                      lead.status === "Converted"
                        ? "default"
                        : lead.status === "In Progress"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {lead.status}
                  </Badge>
                </motion.div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
