"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Pencil, Trash2, Eye, Search, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ---------------- TYPES ---------------- */
type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
};

type User = {
  id: number;
  name: string;
  plan: "free" | "paid";
  clientLimit: number;
};

/* ---------------- UI COLORS ---------------- */
const statusColors: Record<string, string> = {
  New: "bg-gray-200 text-black dark:bg-gray-700 dark:text-white",
  Contacted: "bg-gray-300 text-black dark:bg-gray-600 dark:text-white",
  Qualified: "bg-gray-400 text-black dark:bg-gray-500 dark:text-white",
  Lost: "bg-gray-500 text-black dark:bg-gray-400 dark:text-white",
};

export default function LeadManagementPage() {
  const [user, setUser] = useState<User | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Lead | null>(null);

  /* ---------------- LOAD USER + LEADS ---------------- */
  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then(setUser);
    fetch("/api/leads")
      .then((r) => r.json())
      .then(setLeads);
  }, []);

  /* ---------------- FILTER ---------------- */
  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search)
  );

  /* ---------------- MODAL ---------------- */
  const openModal = (type: typeof mode, lead?: Lead) => {
    setMode(type);
    setCurrent(
      lead || { id: 0, name: "", email: "", phone: "", status: "New" }
    );
    setOpen(true);
  };

  /* ---------------- SAVE ---------------- */
  const saveLead = async () => {
    if (!current) return;

    const res = await fetch("/api/leads", {
      method: "POST",
      body: JSON.stringify(current),
    });

    if (res.status === 403) {
      alert("Upgrade to paid plan to add more leads");
      return;
    }

    const updated = await res.json();
    setLeads(updated);
    setOpen(false);
  };

  /* ---------------- DELETE ---------------- */
  const deleteLead = async (id: number) => {
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    setLeads(leads.filter((l) => l.id !== id));
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="p-6 space-y-6 bg-white dark:bg-black min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Lead Management</h1>
          <p className="text-lg">
            Plan: {user?.plan?.toUpperCase()} ({leads.length}/
            {user?.clientLimit})
          </p>
        </div>
        <Button onClick={() => openModal("add")}>
          <Plus size={16} /> Add Lead
        </Button>
      </div>

      {/* SEARCH */}
      <div className="flex gap-2 max-w-sm">
        <Search size={16} />
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2">
            <Users /> All Leads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((l) => (
                <motion.tr
                  key={l.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td>{l.name}</td>
                  <td>{l.email}</td>
                  <td>{l.phone}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded ${statusColors[l.status]}`}
                    >
                      {l.status}
                    </span>
                  </td>
                  <td>
                    <Button onClick={() => openModal("edit", l)}>
                      <Pencil size={14} />
                    </Button>
                    <Button onClick={() => deleteLead(l.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* MODAL */}
      <AnimatePresence>
        {open && current && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <motion.div className="bg-white p-6 rounded w-full max-w-md space-y-3">
              {["name", "email", "phone", "status"].map((f) => (
                <Input
                  key={f}
                  placeholder={f}
                  value={(current as any)[f]}
                  onChange={(e) =>
                    setCurrent({ ...current, [f]: e.target.value })
                  }
                />
              ))}
              <Button onClick={saveLead}>Save</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
