"use client";

import { useEffect, useState } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
};

export default function LeadManagementPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Lead>({
    id: "",
    name: "",
    email: "",
    phone: "",
    status: "New",
  });

  // Fetch leads
  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads", { credentials: "include" });
      const text = await res.text();
      let data = [];
      try {
        data = text ? JSON.parse(text) : [];
      } catch (err) {
        console.error("JSON parse error:", err, text);
      }
      if (!res.ok) {
        console.error("API Error:", data || text);
        return;
      }
      setLeads(data);
    } catch (err) {
      console.error("Fetch leads failed:", err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const openModal = (type: typeof mode, lead?: Lead) => {
    setMode(type);
    setCurrent(
      lead || { id: "", name: "", email: "", phone: "", status: "New" }
    );
    setOpen(true);
  };

  const saveLead = async () => {
    try {
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch("/api/leads", {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(current),
      });
      const text = await res.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch (err) {
        console.error("JSON parse error:", err, text);
      }
      if (!res.ok) {
        console.error("Save lead failed:", data?.error || text);
        return;
      }
      if (!data) return;
      if (mode === "add") setLeads([data, ...leads]);
      else setLeads(leads.map((l) => (l.id === data.id ? data : l)));
      setOpen(false);
    } catch (err) {
      console.error("Save lead error:", err);
    }
  };

  const deleteLead = async (id: string) => {
    try {
      const res = await fetch(`/api/leads?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const text = await res.text();
      if (!res.ok) {
        console.error("Delete failed:", text);
        return;
      }
      setLeads(leads.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Delete lead error:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Lead Management</h1>
        <Button onClick={() => openModal("add")}>
          <Plus size={16} /> Add Lead
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td>{l.name}</td>
                  <td>{l.email}</td>
                  <td>{l.status}</td>
                  <td className="flex gap-2">
                    <Button size="sm" onClick={() => openModal("view", l)}>
                      <Eye size={14} />
                    </Button>
                    <Button size="sm" onClick={() => openModal("edit", l)}>
                      <Pencil size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteLead(l.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <motion.div className="bg-white p-6 rounded w-96 space-y-4">
              <Input
                placeholder="Name"
                value={current.name}
                onChange={(e) =>
                  setCurrent({ ...current, name: e.target.value })
                }
                disabled={mode === "view"}
              />
              <Input
                placeholder="Email"
                value={current.email}
                onChange={(e) =>
                  setCurrent({ ...current, email: e.target.value })
                }
                disabled={mode === "view"}
              />
              <Input
                placeholder="Phone"
                value={current.phone}
                onChange={(e) =>
                  setCurrent({ ...current, phone: e.target.value })
                }
                disabled={mode === "view"}
              />
              <Input
                placeholder="Status"
                value={current.status}
                onChange={(e) =>
                  setCurrent({ ...current, status: e.target.value })
                }
                disabled={mode === "view"}
              />
              {mode !== "view" && (
                <Button className="w-full" onClick={saveLead}>
                  Save
                </Button>
              )}
              <Button
                className="w-full"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
