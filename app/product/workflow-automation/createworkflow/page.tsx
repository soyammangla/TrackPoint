"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AddWorkflowPage() {
  const router = useRouter();

  const [workflowName, setWorkflowName] = useState("");
  const [trigger, setTrigger] = useState("");
  const [actions, setActions] = useState<string[]>([]);
  const [newAction, setNewAction] = useState("");

  const handleAddAction = () => {
    if (newAction.trim() === "") return;
    setActions((prev) => [...prev, newAction.trim()]);
    setNewAction("");
  };

  const handleRemoveAction = (actionToRemove: string) => {
    setActions((prev) => prev.filter((a) => a !== actionToRemove));
  };

  const handleCreate = () => {
    if (!workflowName || !trigger) {
      alert("Please fill all required fields");
      return;
    }

    // Here you can send data to backend
    console.log({
      name: workflowName,
      trigger,
      actions,
      status: "Active",
    });

    alert("Workflow created successfully!");
    router.push("/product/workflows"); // go back to workflow page
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-black text-gray-900 dark:text-neutral-100">
      {/* Back button */}
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft size={16} /> Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto"
      >
        <Card className="rounded-2xl dark:bg-neutral-900 dark:border-neutral-800">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Zap size={18} /> Create New Workflow
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Workflow Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Workflow Name</label>
              <Input
                placeholder="New Lead Follow-up"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
              />
            </div>

            {/* Trigger */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Trigger</label>
              <Input
                placeholder="Lead Created / Deal Closed"
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Actions</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add action"
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                />
                <Button onClick={handleAddAction}>Add</Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {actions.map((action) => (
                  <Badge
                    key={action}
                    variant="secondary"
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    {action}{" "}
                    <span
                      onClick={() => handleRemoveAction(action)}
                      className="text-red-400 font-bold"
                    >
                      ×
                    </span>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Create Button */}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button onClick={handleCreate}>Create Workflow</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
