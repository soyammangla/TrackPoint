"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Power, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

/* ---------- TYPES ---------- */
type WorkflowType = {
  id: number;
  name: string;
  trigger: string;
  actions: string[];
  active: boolean;
};

type User = {
  name: string;
  plan: "free" | "paid";
  workflowLimit: number;
};

/* ---------- OPTIONS ---------- */
const TRIGGERS = ["New Lead Created", "Deal Stage Changed", "Deal Won"];
const ACTIONS = ["Assign Owner", "Send Email", "Create Task", "Notify Manager"];

export default function WorkflowAutomationPage() {
  /* ---------- SIMULATED USER ---------- */
  const [user] = useState<User>({
    name: "Demo User",
    plan: "free", // "paid" to test paid user
    workflowLimit: 10,
  });

  const [workflows, setWorkflows] = useState<WorkflowType[]>([]); // EMPTY START

  /* ---------- HANDLERS ---------- */
  const addWorkflow = () => {
    if (workflows.length >= user.workflowLimit) {
      alert("Upgrade plan to add more workflows");
      return;
    }

    setWorkflows([
      ...workflows,
      {
        id: Date.now(),
        name: "New Automation",
        trigger: TRIGGERS[0],
        actions: [],
        active: true,
      },
    ]);
  };

  const updateWorkflow = (id: number, key: keyof WorkflowType, value: any) => {
    setWorkflows(
      workflows.map((wf) => (wf.id === id ? { ...wf, [key]: value } : wf)),
    );
  };

  const deleteWorkflow = (id: number) => {
    setWorkflows(workflows.filter((wf) => wf.id !== id));
  };

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-2">
            Workflow Automation
          </h1>
          <p className="text-xl mt-2 text-black dark:text-white">
            Create automated flows using triggers & actions (Plan:{" "}
            {user.plan.toUpperCase()})
          </p>
        </div>

        <Button onClick={addWorkflow}>
          <Plus size={16} /> Add Workflow
        </Button>
      </div>

      {/* WORKFLOW LIST */}
      <div className="space-y-4">
        {workflows.map((wf) => (
          <motion.div
            key={wf.id}
            layout
            className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-4"
          >
            {/* TITLE ROW */}
            <div className="flex justify-between items-center mb-4">
              <Input
                className="max-w-xs font-semibold"
                value={wf.name}
                onChange={(e) => updateWorkflow(wf.id, "name", e.target.value)}
              />

              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant={wf.active ? "default" : "outline"}
                  onClick={() => updateWorkflow(wf.id, "active", !wf.active)}
                >
                  <Power size={16} />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteWorkflow(wf.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>

            {/* FLOW ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* TRIGGER */}
              <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border">
                <p className="text-xs text-black dark:text-white mb-1">
                  Trigger
                </p>
                <Select
                  value={wf.trigger}
                  onValueChange={(v) => updateWorkflow(wf.id, "trigger", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TRIGGERS.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* ARROW */}
              <div className="hidden md:flex justify-center">
                <ArrowRight className="text-black dark:text-white" />
              </div>

              {/* ACTIONS */}
              <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border">
                <p className="text-xs text-black dark:text-white mb-1">
                  Actions
                </p>

                <Select
                  onValueChange={(v) =>
                    updateWorkflow(wf.id, "actions", [...wf.actions, v])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Add Action" />
                  </SelectTrigger>
                  <SelectContent>
                    {ACTIONS.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* ACTION CHIPS */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {wf.actions.map((a, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* STATUS */}
            <div className="mt-3 text-xs text-black dark:text-white">
              Status:{" "}
              <span className={wf.active ? "text-green-500" : "text-red-500"}>
                {wf.active ? "Active" : "Inactive"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
