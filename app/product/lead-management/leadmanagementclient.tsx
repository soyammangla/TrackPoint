"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Pencil, Trash2, Eye, Search, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ---------- TYPES ---------- */
type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
};

type User = {
  name: string;
  plan: "free" | "paid";
  clientLimit: number;
};

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

  /* ---------- LOAD USER + LEADS ---------- */
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then(setUser);

    fetch("/api/leads")
      .then((res) => res.json())
      .then(setLeads);
  }, []);

  /* ---------- FILTER ---------- */
  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search)
  );

  /* ---------- MODAL ---------- */
  const openModal = (type: typeof mode, lead?: Lead) => {
    setMode(type);
    setCurrent(
      lead || {
        id: 0,
        name: "",
        email: "",
        phone: "",
        status: "New",
      }
    );
    setOpen(true);
  };

  /* ---------- SAVE ---------- */
  const saveLead = async () => {
    if (!current) return;

    const res = await fetch("/api/leads", {
      method: "POST",
      body: JSON.stringify(current),
    });

    if (res.status === 403) {
      alert("Free plan limit reached. Upgrade to add more leads.");
      return;
    }

    const updated = await res.json();
    setLeads(updated);
    setOpen(false);
  };

  /* ---------- DELETE ---------- */
  const deleteLead = async (id: number) => {
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    setLeads(leads.filter((l) => l.id !== id));
  };

  if (!user) return null;

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-black text-black dark:text-white min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Lead Management</h1>
          <p className="text-xl mt-2">
            Plan: {user.plan.toUpperCase()} ({user.clientLimit} Leads)
          </p>
        </div>
        <Button onClick={() => openModal("add")}>
          <Plus size={16} /> Add Lead
        </Button>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-2 max-w-sm">
        <Search size={16} />
        <Input
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users /> All Leads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>
                    <span className={statusColors[lead.status]}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <Button size="icon" onClick={() => openModal("view", lead)}>
                      <Eye size={14} />
                    </Button>
                    <Button size="icon" onClick={() => openModal("edit", lead)}>
                      <Pencil size={14} />
                    </Button>
                    <Button size="icon" onClick={() => deleteLead(lead.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* MODAL */}
      <AnimatePresence>
        {open && current && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-96 space-y-3">
              {["name", "email", "phone", "status"].map((f) => (
                <Input
                  key={f}
                  disabled={mode === "view"}
                  placeholder={f}
                  value={(current as any)[f]}
                  onChange={(e) =>
                    setCurrent({ ...current, [f]: e.target.value })
                  }
                />
              ))}
              {mode !== "view" && (
                <Button className="w-full" onClick={saveLead}>
                  Save
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
