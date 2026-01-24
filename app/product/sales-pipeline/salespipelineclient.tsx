"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeals, Deal } from "@/context/dealscontext";

const STAGE_FLOW: Record<string, string[]> = {
  New: ["Contacted"],
  Contacted: ["Qualified"],
  Qualified: ["Proposal"],
  Proposal: ["Closed Won", "Closed Lost"],
  "Closed Won": [],
  "Closed Lost": [],
};

const stages = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal",
  "Closed Won",
  "Closed Lost",
];

export default function SalesPipelinePage() {
  const { deals, updateDeal, removeDeal } = useDeals();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"edit" | "view">("edit");
  const [current, setCurrent] = useState<Deal | null>(null);
  const [pipelineDeals, setPipelineDeals] = useState<Deal[]>(deals);

  // Update pipelineDeals whenever deals change
  useEffect(() => {
    setPipelineDeals(deals);
  }, [deals]);

  const filteredDeals = pipelineDeals.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      (d.owner ?? "").toLowerCase().includes(search.toLowerCase()),
  );

  const openModal = (type: typeof mode, deal: Deal) => {
    setMode(type);
    setCurrent(deal);
    setOpen(true);
  };

  const saveDeal = () => {
    if (!current || !current.id) return;
    updateDeal(current);
    setOpen(false);
  };

  const deleteDeal = (id: string) => removeDeal(id);

  const moveDeal = async (deal: Deal, stage: string) => {
    if (!deal.id) return;

    try {
      const res = await fetch(`/api/deals/${deal.id}/stage`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Stage update failed");
        return;
      }

      const updated = await res.json();
      updateDeal(updated);
    } catch (err) {
      console.error(err);
      alert("Stage update failed");
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-black min-h-screen space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Sales Pipeline
          </h1>
          <p className="text-lg mt-1 text-gray-600 dark:text-gray-300">
            Track all deals across stages
          </p>
        </div>
        <Input
          className="max-w-sm rounded-lg shadow-sm"
          placeholder="Search deals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Pipeline Columns */}
      <div className="flex gap-6 overflow-x-auto py-4 px-1">
        {stages.map((stage) => (
          <div
            key={stage}
            // className="shrink-0 w-80 bg-gray-100 dark:bg-neutral-800 rounded-xl p-4 shadow flex flex-col"
            className="shrink-0 w-80 border border-black dark:border-white rounded-xl p-4 flex flex-col"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                {stage}
              </h3>
              {/* <span className="text-xs bg-gray-200 dark:bg-neutral-700 px-2 py-0.5 rounded-full opacity-80"> */}
              <span className="text-xs border border-black dark:border-white px-2 py-0.5 rounded-full">
                {filteredDeals.filter((d) => d.stage === stage).length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {filteredDeals
                .filter((d) => d.stage === stage)
                .map((deal) => (
                  <motion.div
                    key={deal.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-black rounded-lg border border-black/30 dark:border-white/30 p-3 flex flex-col justify-between hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    {/* Top info */}
                    <div className="overflow-auto flex-1">
                      <p className="font-semibold text-black dark:text-white break-all">
                        {deal.name}
                      </p>
                      <p className="text-xs text-black dark:text-white break-all">
                        Owner: {deal.owner}
                      </p>
                      <p className="text-xs text-black dark:text-white break-all">
                        {deal.email}
                      </p>
                      <span className="inline-block mt-1 text-xs font-medium text-green-700 dark:text-green-400">
                        ${deal.amount?.toLocaleString()}
                      </span>
                    </div>

                    {/* Bottom actions */}
                    <div className="flex gap-1 mt-2 shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openModal("view", deal)}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openModal("edit", deal)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteDeal(deal.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>

                    {/* Stage move buttons */}
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {(STAGE_FLOW[deal.stage] ?? []).map((s) => (
                        <Button
                          key={s}
                          size="sm"
                          variant="outline"
                          className="text-xs w-full"
                          onClick={() => moveDeal(deal, s)}
                        >
                          {s}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && current && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-neutral-900 p-6 rounded-xl w-full max-w-md space-y-4 text-black dark:text-white"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl capitalize">{mode} Deal</h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                >
                  <X size={16} />
                </Button>
              </div>

              {["name", "owner", "amount", "stage", "email"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm mb-1 capitalize">{field}</label>
                  <Input
                    disabled={mode === "view" || field === "stage"} // stage disabled
                    placeholder={`Enter ${field}`}
                    value={(current as any)[field] || ""}
                    className="w-full truncate"
                    onChange={(e) =>
                      setCurrent({ ...current, [field]: e.target.value })
                    }
                  />
                </div>
              ))}

              {mode === "edit" && (
                <Button className="w-full mt-2" onClick={saveDeal}>
                  Save
                </Button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
