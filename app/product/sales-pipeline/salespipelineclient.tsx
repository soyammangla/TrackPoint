"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeals, Deal } from "@/context/dealscontext";

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

  // Filter deals by search input
  const filteredDeals = pipelineDeals.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      // d.owner.toLowerCase().includes(search.toLowerCase()),
      (d.owner ?? "").toLowerCase().includes(search.toLowerCase()),
  );

  const openModal = (type: typeof mode, deal: Deal) => {
    setMode(type);
    setCurrent(deal);
    setOpen(true);
  };

  const saveDeal = () => {
    if (!current) return;
    updateDeal(current);
    setOpen(false);
  };

  const deleteDeal = (id: string) => {
    removeDeal(id);
  };

  const moveDeal = (deal: Deal, stage: string) => {
    updateDeal({ ...deal, stage });
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-neutral-900 min-h-screen space-y-6">
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
            className="shrink-0 w-72 bg-gray-100 dark:bg-neutral-800 rounded-xl p-4 shadow flex flex-col"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                {stage}
              </h3>
              <span className="text-xs bg-gray-200 dark:bg-neutral-700 px-2 py-0.5 rounded-full opacity-80">
                {filteredDeals.filter((d) => d.stage === stage).length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {filteredDeals
                .filter((d) => d.stage === stage)
                .map((deal) => (
                  <motion.div
                    key={deal.id}
                    className="bg-white dark:bg-neutral-900 rounded-lg shadow border border-gray-200 dark:border-neutral-700 p-3 hover:shadow-lg transition cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {deal.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                          Owner: {deal.owner}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                          {deal.email}
                        </p>
                        <span className="inline-block mt-1 text-xs font-medium text-green-700 dark:text-green-400">
                          ${deal.amount?.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => openModal("view", deal)}
                        >
                          <Eye size={14} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => openModal("edit", deal)}
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteDeal(deal.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>

                    {/* Stage Move Buttons */}
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {stages
                        .filter((s) => s !== deal.stage)
                        .map((s) => (
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
                    disabled={mode === "view"}
                    placeholder={`Enter ${field}`}
                    value={(current as any)[field] || ""}
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
