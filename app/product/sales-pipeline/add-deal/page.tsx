"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Briefcase,
  User,
  IndianRupee,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AddDealPage() {
  const router = useRouter();

  const [dealName, setDealName] = useState("");
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="min-h-screen px-4 py-10 bg-white dark:bg-black text-black dark:text-white">
      {/* Back */}
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft size={16} className="mr-2" />
        Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto mt-8"
      >
        <Card className="rounded-2xl border dark:border-neutral-800 dark:bg-neutral-900">
          <CardHeader>
            <CardTitle className="text-xl">Add New Deal</CardTitle>
            <p className="text-sm text-neutral-500">
              Create a new opportunity in your sales pipeline
            </p>
          </CardHeader>

          <CardContent className="space-y-5">
            <Badge variant="secondary">New Lead</Badge>

            {/* Deal Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Deal Name</label>
              <div className="relative">
                <Briefcase
                  size={16}
                  className="absolute left-3 top-3 text-neutral-400"
                />
                <Input
                  className="pl-9"
                  placeholder="Website Development Project"
                  value={dealName}
                  onChange={(e) => setDealName(e.target.value)}
                />
              </div>
            </div>

            {/* Client */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Client Name</label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-3 text-neutral-400"
                />
                <Input
                  className="pl-9"
                  placeholder="Rahul Sharma"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Deal Value</label>
              <div className="relative">
                <IndianRupee
                  size={16}
                  className="absolute left-3 top-3 text-neutral-400"
                />
                <Input
                  type="number"
                  className="pl-9"
                  placeholder="50000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
              >
                Cancel
              </Button>

              <Button className="flex-1">
                <CheckCircle2 size={16} className="mr-2" />
                Create Deal
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
