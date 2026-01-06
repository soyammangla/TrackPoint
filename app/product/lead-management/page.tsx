"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, Plus, Filter, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type LeadStatus = "New" | "In Progress" | "Converted";

interface Lead {
  name: string;
  company: string;
  status: LeadStatus;
}

export default function LeadManagementPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | LeadStatus>("All");
  const [showFilters, setShowFilters] = useState(true);

  const leads: Lead[] = [
    { name: "Rahul Sharma", company: "TechNova", status: "New" },
    { name: "Ananya Verma", company: "EcoLife", status: "In Progress" },
    { name: "Aman Gupta", company: "Nexstore", status: "Converted" },
  ];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-black text-gray-900 dark:text-neutral-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold">Product & Lead Management</h1>
          <p className="text-gray-600 dark:text-neutral-400">
            Track leads, manage products, and convert faster
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            className="gap-2"
            onClick={() => router.push("/product/lead-management/addlead")}
          >
            <Plus size={16} />
            Add Lead
          </Button>

          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { title: "Total Leads", value: "128", icon: Users },
          { title: "Active Products", value: "24", icon: Briefcase },
          { title: "Conversion Rate", value: "36%", icon: ArrowUpRight },
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

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search by name or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:max-w-sm dark:bg-black dark:border-neutral-800"
          />

          <div className="flex gap-2 flex-wrap">
            {["All", "New", "In Progress", "Converted"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                onClick={() => setStatusFilter(status as any)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Lead List */}
      <Card className="rounded-2xl dark:bg-neutral-900 dark:border-neutral-800">
        <CardHeader>
          <CardTitle>Leads Overview</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {filteredLeads.map((lead, i) => (
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

            {filteredLeads.length === 0 && (
              <p className="text-center text-sm text-neutral-400 py-6">
                No leads found
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
