"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  FileText,
  Users,
  CheckCircle2,
  DollarSign,
  Plus,
  ArrowRight,
  Search,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const pipelineStages = [
  { title: "New Leads", icon: Users, leads: ["Rahul Sharma", "Ananya Verma"] },
  { title: "Contacted", icon: PhoneCall, leads: ["Aman Gupta"] },
  { title: "Proposal Sent", icon: FileText, leads: ["Ritika Jain"] },
  { title: "Negotiation", icon: DollarSign, leads: [] },
  { title: "Closed Won", icon: CheckCircle2, leads: ["Suresh Kumar"] },
];

export default function SalesPipelinePage() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-black text-gray-900 dark:text-neutral-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold">Sales Pipeline</h1>
          <p className="text-gray-600 dark:text-neutral-400">
            Manage and track deals across sales stages
          </p>
        </div>

        <Button className="rounded-xl">
          <Plus size={18} className="mr-2" />
          Add Deal
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-full max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-3 text-muted-foreground"
          />
          <Input
            placeholder="Search deals..."
            className="pl-10 rounded-xl dark:bg-black dark:border-neutral-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {pipelineStages.map((stage, i) => (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="rounded-2xl h-full dark:bg-neutral-900 dark:border-neutral-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold">
                    {stage.title}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {stage.leads.length} Deals
                  </p>
                </div>
                <stage.icon className="text-muted-foreground" size={18} />
              </CardHeader>

              <CardContent className="space-y-4">
                {stage.leads.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-neutral-400">
                    No deals yet
                  </p>
                )}

                {stage.leads
                  .filter((lead) =>
                    lead.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((lead, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="
                        p-4 rounded-xl border
                        bg-white dark:bg-neutral-950
                        dark:border-neutral-800
                      "
                    >
                      <p className="font-medium text-sm">{lead}</p>

                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="secondary">Active</Badge>

                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            View
                          </Button>
                          <Button size="sm" variant="ghost">
                            <ArrowRight size={16} />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
