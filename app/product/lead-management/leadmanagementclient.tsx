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

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => setLeads(data));
  }, []);

  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Lead>({
    id: "",
    name: "",
    email: "",
    phone: "",
    status: "New",
  });

  const openModal = (type: typeof mode, lead?: Lead) => {
    setMode(type);
    setError(null);
    setCurrent(
      lead || {
        id: Date.now().toString(),
        name: "",
        email: "",
        phone: "",
        status: "New",
      },
    );
    setOpen(true);
  };

  const saveLead = async () => {
    if (mode === "add") {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(current),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Something went wrong");
        return;
      }

      setError(null);
    }

    if (mode === "edit") {
      await fetch(`/api/leads/${current.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(current),
      });
    }

    // re-fetch fresh data from DB
    const res = await fetch("/api/leads");
    const data = await res.json();
    setLeads(data);

    setOpen(false);
  };

  const deleteLead = async (id: string) => {
    await fetch(`/api/leads/${id}`, {
      method: "DELETE",
    });

    const res = await fetch("/api/leads");
    const data = await res.json();
    setLeads(data);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Lead Management</h1>
        <Button onClick={() => openModal("add")}>
          <Plus size={16} /> Add Lead
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leads</CardTitle>
        </CardHeader>

        {/* TABLE WRAPPER FOR RESPONSIVE */}
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[600px] table-fixed border-collapse">
            <thead className="bg-gray-100 dark:bg-neutral-800">
              <tr>
                <th className="w-1/4 text-left py-2 px-3">Name</th>
                <th className="w-1/4 text-left py-2 px-3">Email</th>
                <th className="w-1/4 text-left py-2 px-3">Status</th>
                <th className="w-1/4 text-center py-2 px-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((l) => (
                <tr
                  key={l.id}
                  className="border-b border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-900"
                >
                  <td className="py-2 px-3">{l.name}</td>
                  <td className="py-2 px-3 break-all max-w-[200px] sm:max-w-none">
                    {l.email}
                  </td>
                  <td className="py-2 px-3">{l.status}</td>

                  <td className="py-2 px-3">
                    <div className="flex justify-center gap-2 flex-wrap">
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
            <motion.div className="bg-white p-6 rounded w-[90%] max-w-md space-y-4">
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
              <select
                value={current.status}
                onChange={(e) =>
                  setCurrent({ ...current, status: e.target.value })
                }
                disabled={mode === "view"}
                className="w-full p-2 border rounded"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="InProgress">In Progress</option>
                <option value="Qualified">Qualified</option>
                <option value="Unqualified">Unqualified</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </select>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

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
