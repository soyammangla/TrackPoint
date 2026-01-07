"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Search,
  X,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  owner: string;
};
type Deal = {
  id: number;
  leadId: number;
  name: string;
  owner: string;
  amount: string;
  stage: string;
  email?: string;
};

const initialLeads: Lead[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    status: "New",
    owner: "Amit",
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya@gmail.com",
    phone: "9123456780",
    status: "Contacted",
    owner: "Neha",
  },
];

const initialDeals: Deal[] = [
  {
    id: 1,
    leadId: 1,
    name: "Rahul Sharma",
    owner: "Amit",
    amount: "$5000",
    stage: "New",
    email: "rahul@gmail.com",
  },
  {
    id: 2,
    leadId: 2,
    name: "Priya Verma",
    owner: "Neha",
    amount: "$2000",
    stage: "Contacted",
    email: "priya@gmail.com",
  },
];

const stages = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal",
  "Closed Won",
  "Closed Lost",
];

export default function SalesPipelinePage({
  globalDarkMode,
}: {
  globalDarkMode: boolean;
}) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Deal | null>(null);
  const [darkMode, setDarkMode] = useState(globalDarkMode);

  // Sync with global mode
  useEffect(() => {
    setDarkMode(globalDarkMode);
  }, [globalDarkMode]);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const filteredDeals = deals.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.owner.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (type: typeof mode, deal?: Deal) => {
    setMode(type);
    setCurrent(
      deal || {
        id: 0,
        leadId: 0,
        name: "",
        owner: "",
        amount: "",
        stage: "New",
      }
    );
    setOpen(true);
  };

  const saveDeal = () => {
    if (!current) return;
    if (mode === "add") {
      setDeals([...deals, { ...current, id: Date.now() }]);
    } else if (mode === "edit") {
      setDeals(deals.map((d) => (d.id === current.id ? current : d)));
    }
    setOpen(false);
  };

  const deleteDeal = (id: number) => {
    setDeals(deals.filter((d) => d.id !== id));
  };

  const moveDeal = (deal: Deal, stage: string) => {
    setDeals(deals.map((d) => (d.id === deal.id ? { ...d, stage } : d)));
  };

  return (
    <div className="p-6 bg-white dark:bg-neutral-900 text-black dark:text-white min-h-screen transition-colors duration-300 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sales Pipeline</h1>
          <p className="text-sm opacity-70">Track all deals across stages</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <Button onClick={() => openModal("add")}>
            <Plus size={16} /> Add Deal
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 max-w-sm">
        <Search size={20} className="opacity-60" />
        <Input
          className="rounded-lg shadow-sm"
          placeholder="Search deals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Pipeline */}
      <div className="flex gap-6 overflow-x-auto py-4 px-1 ">
        {stages.map((stage) => (
          <div
            key={stage}
            className="shrink-0 w-[280px] bg-gray-100 dark:bg-black rounded-xl p-4 shadow-sm flex flex-col"
          >
            {/* Column Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">{stage}</h3>
              <span className="text-xs bg-gray-200 dark:bg-neutral-700 px-2 py-0.5 rounded-full opacity-80">
                {filteredDeals.filter((d) => d.stage === stage).length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-4">
              {filteredDeals
                .filter((d) => d.stage === stage)
                .map((deal) => (
                  <motion.div
                    key={deal.id}
                    className="bg-white dark:bg-neutral-800 rounded-lg shadow border border-gray-200 dark:border-neutral-700 p-3 hover:shadow-lg transition cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="font-semibold">{deal.name}</p>
                        <p className="text-xs opacity-70">{deal.email}</p>
                        <p className="text-xs opacity-70">
                          Owner: {deal.owner}
                        </p>
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
                    <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-neutral-700 rounded-full inline-block mt-1">
                      {deal.amount}
                    </span>

                    {/* Move buttons */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {stages
                        .filter((s) => s !== stage)
                        .map((s) => (
                          <Button
                            key={s}
                            size="sm"
                            variant="outline"
                            className="flex-1 min-w-[90px] text-xs" // same min width for all buttons
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
                  <X />
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

              {mode !== "view" && (
                <Button className="w-full" onClick={saveDeal}>
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
