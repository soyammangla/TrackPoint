"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { useDeals, Deal } from "@/context/dealscontext";
import { useRouter } from "next/navigation";

type Lead = {
  id: string;
  name: string;
  email?: string;
  phone: string;
  status: string;
};

export default function LeadManagementPage() {
  const router = useRouter();
  const { addDeal } = useDeals();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit" | "view" | "convert">("add");
  const [current, setCurrent] = useState<
    Lead & { amount?: number; owner?: string }
  >({
    id: "",
    name: "",
    email: "",
    phone: "",
    status: "New",
    amount: 0,
    owner: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      setLeads(data);
    } catch {
      setError("Failed to fetch leads");
    }
  };

  const openModal = (type: typeof mode, lead?: Lead) => {
    setMode(type);
    setError(null);
    setCurrent(
      lead
        ? { ...lead, amount: 0, owner: "" }
        : {
            id: "",
            name: "",
            email: "",
            phone: "",
            status: "New",
            amount: 0,
            owner: "",
          },
    );
    setOpen(true);
  };

  const saveLead = async () => {
    setError(null);
    try {
      let res: Response | undefined;

      // ---------- ADD LEAD ----------
      if (mode === "add") {
        res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: current.name,
            email: current.email,
            phone: current.phone,
            status: current.status,
          }),
        });
      }

      // ---------- EDIT LEAD ----------
      if (mode === "edit") {
        res = await fetch(`/api/leads/${current.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: current.name,
            email: current.email,
            phone: current.phone,
            status: current.status,
          }),
        });
      }

      // ---------- CONVERT LEAD TO DEAL ----------
      if (mode === "convert") {
        if (current.status !== "Qualified") {
          setError("Only qualified leads can be converted");
          return;
        }
        if (!current.amount || !current.owner) {
          setError("Deal amount and owner are required");
          return;
        }
        res = await fetch(`/api/leads/${current.id}/convert`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: current.amount,
            owner: current.owner,
          }),
        });

        if (res.ok) {
          const deal: Deal = await res.json();
          deal.stage = "New";
          addDeal(deal);
          router.push("/product/sales-pipeline");
        }
      }

      if (res && !res.ok) {
        const err = await res.json();
        setError(err.error || "Operation failed");
        return;
      }

      fetchLeads();
      setOpen(false);
    } catch {
      setError("Something went wrong");
    }
  };

  const deleteLead = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this lead?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Failed to delete lead");
        return;
      }
      fetchLeads();
    } catch {
      setError("Failed to delete lead");
    }
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
        <CardContent className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{l.name}</td>
                  <td className="px-4 py-2">{l.email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
              ${l.status === "New" && "bg-blue-100 text-blue-800"}
              ${l.status === "Contacted" && "bg-purple-100 text-purple-800"}
              ${l.status === "InProgress" && "bg-yellow-100 text-yellow-800"}
              ${l.status === "Qualified" && "bg-green-100 text-green-800"}
              ${l.status === "Converted" && "bg-gray-200 text-gray-800"}
              ${l.status === "Lost" && "bg-red-100 text-red-800"}
            `}
                    >
                      {l.status}
                    </span>
                  </td>

                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <div className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openModal("view", l)}
                      >
                        <Eye size={14} />
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        disabled={l.status === "Converted"}
                        onClick={() => openModal("edit", l)}
                      >
                        <Pencil size={14} />
                      </Button>

                      {l.status === "Qualified" && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => openModal("convert", l)}
                        >
                          Convert
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={l.status === "Converted"}
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

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
            <motion.div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-lg">
              <h2 className="text-xl font-semibold text-center">
                {mode === "add" && "Add Lead"}
                {mode === "edit" && "Edit Lead"}
                {mode === "view" && "View Lead"}
                {mode === "convert" && "Convert Lead to Deal"}
              </h2>

              {/* Inputs */}
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

              {/* Status select */}
              <select
                value={current.status}
                onChange={(e) =>
                  setCurrent({ ...current, status: e.target.value })
                }
                disabled={mode === "view" || mode === "convert"}
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

              {mode === "convert" && (
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="Deal Amount"
                    value={current.amount}
                    onChange={(e) =>
                      setCurrent({ ...current, amount: Number(e.target.value) })
                    }
                  />
                  <Input
                    placeholder="Owner"
                    value={current.owner}
                    onChange={(e) =>
                      setCurrent({ ...current, owner: e.target.value })
                    }
                  />
                </div>
              )}

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {/* Buttons */}
              <div className="flex flex-col gap-2">
                {mode !== "view" && <Button onClick={saveLead}>Save</Button>}
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
