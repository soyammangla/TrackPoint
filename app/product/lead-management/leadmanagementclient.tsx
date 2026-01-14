"use client";

import { useState } from "react";
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
  // ---------------- Fake demo leads ----------------
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      name: "Amit Sharma",
      email: "amit@gmail.com",
      phone: "9876543210",
      status: "New",
    },
    {
      id: "2",
      name: "Ravi Kumar",
      email: "ravi@gmail.com",
      phone: "9876543211",
      status: "Contacted",
    },
    {
      id: "3",
      name: "Neha Singh",
      email: "neha@gmail.com",
      phone: "9876543212",
      status: "Qualified",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit" | "view">("add");
  const [current, setCurrent] = useState<Lead>({
    id: "",
    name: "",
    email: "",
    phone: "",
    status: "New",
  });

  // ---------------- Modal Open ----------------
  const openModal = (type: typeof mode, lead?: Lead) => {
    setMode(type);
    setCurrent(
      lead || {
        id: Date.now().toString(),
        name: "",
        email: "",
        phone: "",
        status: "New",
      }
    );
    setOpen(true);
  };

  // ---------------- Save Lead (Frontend only) ----------------
  const saveLead = () => {
    if (mode === "add") setLeads([current, ...leads]);
    else setLeads(leads.map((l) => (l.id === current.id ? current : l)));
    setOpen(false);
  };

  // ---------------- Delete Lead (Frontend only) ----------------
  const deleteLead = (id: string) => setLeads(leads.filter((l) => l.id !== id));

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
          <table className="w-full table-fixed border-collapse">
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
                  <td className="py-2 px-3">{l.email}</td>
                  <td className="py-2 px-3">{l.status}</td>
                  <td className="py-2 px-3 flex justify-center gap-2">
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

      {/* ---------------- Modal ---------------- */}
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
