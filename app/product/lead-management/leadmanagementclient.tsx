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
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit" | "view" | "convert">("add");

  const [current, setCurrent] = useState<
    Lead & {
      amount?: number;
      owner?: string;
      dealName?: string;
    }
  >({
    id: "",
    name: "",
    email: "",
    phone: "",
    status: "New",
    amount: 0,
    owner: "",
    dealName: "",
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

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase()),
  );

  const openModal = (type: typeof mode, lead?: Lead) => {
    setMode(type);
    setError(null);
    setCurrent(
      lead
        ? { ...lead, amount: 0, owner: "", dealName: "" }
        : {
            id: "",
            name: "",
            email: "",
            phone: "",
            status: "New",
            amount: 0,
            owner: "",
            dealName: "",
          },
    );
    setOpen(true);
  };

  const saveLead = async () => {
    setError(null);
    try {
      let res: Response | undefined;

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

      if (mode === "convert") {
        if (current.status !== "Qualified") {
          setError("Only qualified leads can be converted");
          return;
        }

        if (!current.dealName || !current.amount || !current.owner) {
          setError("Deal name, amount and owner are required");
          return;
        }

        res = await fetch(`/api/leads/${current.id}/convert`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dealName: current.dealName,
            amount: current.amount,
            owner: current.owner,
          }),
        });

        if (res.ok) {
          const deal: Deal = await res.json();
          deal.stage = "New";
          addDeal(deal);
          router.push("/product/sales-pipeline");
          return;
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
    if (!confirm("Are you sure you want to delete this lead?")) return;

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
    <div className="p-4 sm:p-6 space-y-6 bg-white dark:bg-black text-black dark:text-white min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Lead Management</h1>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-48"
          />

          <Button onClick={() => openModal("add")}>
            <Plus size={16} /> Add Lead
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leads</CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="hidden sm:table w-full border rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.map((l) => (
                <tr key={l.id} className="hover:bg-black/5">
                  <td className="px-4 py-2 font-medium">{l.name}</td>
                  <td className="px-4 py-2">{l.email}</td>
                  <td className="px-4 py-2">{l.status}</td>
                  <td className="px-4 py-2 flex flex-wrap gap-2 justify-center">
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
                      <Button size="sm" onClick={() => openModal("convert", l)}>
                        Convert
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      disabled={l.status === "Converted"}
                      onClick={() => deleteLead(l.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* MOBILE VIEW */}
          <div className="sm:hidden space-y-4">
            {filteredLeads.map((l) => (
              <div key={l.id} className="border rounded-lg p-4 space-y-2">
                <p className="font-semibold">{l.name}</p>
                <p className="text-sm">{l.email || "No email"}</p>
                <p className="text-sm">Status: {l.status}</p>

                <div className="flex flex-wrap gap-2 pt-2">
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
                    <Button size="sm" onClick={() => openModal("convert", l)}>
                      Convert
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    disabled={l.status === "Converted"}
                    onClick={() => deleteLead(l.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div className="bg-white dark:bg-black p-4 sm:p-6 rounded-lg w-full max-w-md space-y-4">
              <h2 className="text-xl font-semibold text-center">
                {mode === "add" && "Add Lead"}
                {mode === "edit" && "Edit Lead"}
                {mode === "view" && "View Lead"}
                {mode === "convert" && "Convert Lead to Deal"}
              </h2>

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
                disabled={mode === "view" || mode === "convert"}
                className="w-full p-2 border rounded bg-white text-black dark:bg-black dark:text-white"
              >
                <option>New</option>
                <option>Contacted</option>
                <option>InProgress</option>
                <option>Qualified</option>
                <option>Unqualified</option>
                <option>Converted</option>
                <option>Lost</option>
              </select>

              {mode === "convert" && (
                <>
                  <Input
                    placeholder="Deal Name"
                    value={current.dealName}
                    onChange={(e) =>
                      setCurrent({ ...current, dealName: e.target.value })
                    }
                  />
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
                </>
              )}

              {error && (
                <p className="text-sm text-center text-red-500">{error}</p>
              )}

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
