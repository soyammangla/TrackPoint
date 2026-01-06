"use client";

import { useState } from "react";
import Link from "next/link";
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

  const handleView = (lead: string) => {
    alert(`Viewing deal details for: ${lead}`);
  };

  const handleMove = (lead: string) => {
    alert(`Move "${lead}" to next stage (backend later)`);
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-black">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold">Sales Pipeline</h1>
          <p className="text-muted-foreground">
            Track deals across sales stages
          </p>
        </div>

        <Link href="/product/sales-pipeline/add-deal">
          <Button className="rounded-xl">
            <Plus size={18} className="mr-2" />
            Add Deal
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="mb-8 max-w-sm">
        <div className="relative">
          <Search
            className="absolute left-3 top-3 text-muted-foreground"
            size={18}
          />
          <Input
            placeholder="Search deals..."
            className="pl-10 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {pipelineStages.map((stage, i) => (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="rounded-2xl h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm">{stage.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {stage.leads.length} Deals
                  </p>
                </div>
                <stage.icon size={18} className="text-muted-foreground" />
              </CardHeader>

              <CardContent className="space-y-4">
                {stage.leads.length === 0 && (
                  <p className="text-sm text-muted-foreground">No deals yet</p>
                )}

                {stage.leads
                  .filter((lead) =>
                    lead.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((lead, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-xl border bg-background"
                    >
                      <p className="font-medium text-sm">{lead}</p>

                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="secondary">Active</Badge>
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
