"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap,
  GitBranch,
  PlayCircle,
  Search,
  PauseCircle,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const initialWorkflows = [
  {
    name: "New Lead Follow-up",
    trigger: "Lead Created",
    actions: ["Send Email", "Notify Sales Team"],
    status: "Active",
  },
  {
    name: "Deal Won Automation",
    trigger: "Pipeline → Closed Won",
    actions: ["Generate Invoice", "Send Welcome Email"],
    status: "Active",
  },
  {
    name: "Inactive Lead Reminder",
    trigger: "No activity for 7 days",
    actions: ["Send Reminder", "Notify Manager"],
    status: "Paused",
  },
];

export default function WorkflowAutomationPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Active" | "Paused">("All");
  const [workflows, setWorkflows] = useState(initialWorkflows);

  // Track which workflow is being edited
  const [editingFlow, setEditingFlow] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editTrigger, setEditTrigger] = useState("");

  const filteredWorkflows = workflows.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || w.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Button handlers
  const handlePlay = (flowName: string) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.name === flowName ? { ...w, status: "Active" } : w))
    );
  };

  const handlePause = (flowName: string) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.name === flowName ? { ...w, status: "Paused" } : w))
    );
  };

  const handleEdit = (flowName: string) => {
    const flow = workflows.find((w) => w.name === flowName);
    if (!flow) return;
    setEditingFlow(flowName);
    setEditName(flow.name);
    setEditTrigger(flow.trigger);
  };

  const handleSave = (flowName: string) => {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.name === flowName ? { ...w, name: editName, trigger: editTrigger } : w
      )
    );
    setEditingFlow(null);
  };

  const handleCancelEdit = () => {
    setEditingFlow(null);
  };

  const handleDelete = (flowName: string) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete "${flowName}"?`
    );
    if (confirmDelete) {
      setWorkflows((prev) => prev.filter((w) => w.name !== flowName));
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-black text-gray-900 dark:text-neutral-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold">Workflow Automation</h1>
          <p className="text-gray-600 dark:text-neutral-400">
            Automate repetitive tasks and streamline operations
          </p>
        </div>

        <Link href="/product/workflow-automation/createworkflow">
          <Button className="gap-2 rounded-xl">
            <Zap size={16} /> Create Workflow
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="rounded-2xl dark:bg-neutral-900 dark:border-neutral-800">
          <CardContent className="p-6">
            <p className="text-sm text-neutral-400">Total Workflows</p>
            <p className="text-3xl font-bold">{workflows.length}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl dark:bg-neutral-900 dark:border-neutral-800">
          <CardContent className="p-6">
            <p className="text-sm text-neutral-400">Active</p>
            <p className="text-3xl font-bold text-green-400">
              {workflows.filter((w) => w.status === "Active").length}
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl dark:bg-neutral-900 dark:border-neutral-800">
          <CardContent className="p-6">
            <p className="text-sm text-neutral-400">Paused</p>
            <p className="text-3xl font-bold text-yellow-400">
              {workflows.filter((w) => w.status === "Paused").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative w-full md:max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-3 text-neutral-400"
          />
          <Input
            placeholder="Search workflows..."
            className="pl-10 rounded-xl dark:bg-black dark:border-neutral-800 dark:text-neutral-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {["All", "Active", "Paused"].map((s) => (
            <Button
              key={s}
              variant={filter === s ? "default" : "outline"}
              onClick={() => setFilter(s as any)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Workflow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredWorkflows.map((flow, i) => (
          <motion.div
            key={flow.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="rounded-2xl h-full dark:bg-neutral-900 dark:border-neutral-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch size={18} /> {flow.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Editable Fields */}
                {editingFlow === flow.name ? (
                  <div className="space-y-2">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Workflow Name"
                    />
                    <Input
                      value={editTrigger}
                      onChange={(e) => setEditTrigger(e.target.value)}
                      placeholder="Trigger"
                    />
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-neutral-400">Trigger</p>
                    <p className="font-medium">{flow.trigger}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-neutral-400">Actions</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {flow.actions.map((action) => (
                      <Badge key={action} variant="secondary">
                        {action}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Badge
                    variant={flow.status === "Active" ? "default" : "outline"}
                  >
                    {flow.status}
                  </Badge>

                  <div className="flex gap-2">
                    {editingFlow === flow.name ? (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleSave(flow.name)}
                        >
                          <CheckCircle size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleCancelEdit}
                        >
                          <XCircle size={16} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handlePlay(flow.name)}
                        >
                          <PlayCircle size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(flow.name)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handlePause(flow.name)}
                        >
                          <PauseCircle size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(flow.name)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
