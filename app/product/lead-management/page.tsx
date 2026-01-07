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

const statusColors: Record<string, string> = {
  New: "bg-gray-200 text-black dark:bg-gray-700 dark:text-white",
  Contacted: "bg-gray-300 text-black dark:bg-gray-600 dark:text-white",
  Qualified: "bg-gray-400 text-black dark:bg-gray-500 dark:text-white",
  Lost: "bg-gray-500 text-black dark:bg-gray-400 dark:text-white",
};

export default function LeadManagementPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Lead | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search)
  );

  const openModal = (type: typeof mode, lead?: Lead) => {
    setMode(type);
    setCurrent(
      lead || {
        id: 0,
        name: "",
        email: "",
        phone: "",
        status: "New",
        owner: "",
      }
    );
    setOpen(true);
  };

  const saveLead = () => {
    if (!current) return;
    if (mode === "add") {
      setLeads([...leads, { ...current, id: Date.now() }]);
    } else if (mode === "edit") {
      setLeads(leads.map((l) => (l.id === current.id ? current : l)));
    }
    setOpen(false);
  };

  const deleteLead = (id: number) => {
    setLeads(leads.filter((l) => l.id !== id));
  };

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lead Management</h1>
          <p className="text-sm opacity-70">Manage, edit, and track leads</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <Button onClick={() => openModal("add")}>
            <Plus size={16} /> Add Lead
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 max-w-sm">
        <Search size={16} className="opacity-60" />
        <Input
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <Card className="rounded-2xl border border-gray-300 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users /> All Leads
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="border-b border-gray-300 dark:border-gray-700 opacity-70">
              <tr>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Phone</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Owner</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <motion.tr
                  key={lead.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <td className="p-2">{lead.name}</td>
                  <td className="p-2">{lead.email}</td>
                  <td className="p-2">{lead.phone}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        statusColors[lead.status]
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-2">{lead.owner}</td>
                  <td className="p-2 text-right space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openModal("view", lead)}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openModal("edit", lead)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteLead(lead.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

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
              className="bg-white dark:bg-black p-6 rounded-xl w-full max-w-md space-y-4 text-black dark:text-white"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl capitalize">{mode} Lead</h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                >
                  <X />
                </Button>
              </div>

              {["name", "email", "phone", "status", "owner"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm mb-1 capitalize">{field}</label>
                  <Input
                    disabled={mode === "view"}
                    placeholder={`Enter ${field}`}
                    value={(current as any)[field]}
                    onChange={(e) =>
                      setCurrent({ ...current, [field]: e.target.value })
                    }
                  />
                </div>
              ))}

              {mode !== "view" && (
                <Button className="w-full" onClick={saveLead}>
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
