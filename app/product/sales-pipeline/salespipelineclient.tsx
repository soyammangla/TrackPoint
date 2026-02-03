"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeals, Deal } from "@/context/dealscontext";

const STAGE_FLOW: Record<string, string[]> = {
  New: ["Contacted"],
  Contacted: ["Qualified"],
  Qualified: ["Proposal"],
};

const stages = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal",
  "Closed Won",
  "Closed Lost",
];

const sendProposal = async (dealId: string) => {
  try {
    const res = await fetch("/api/proposal/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dealId }),
    });

    if (!res.ok) throw new Error("Failed");

    alert("Proposal sent✅");
  } catch (err) {
    alert("Something went wrong ❌");
  }
};

const sendWonEmail = async (deal: Deal) => {
  if (!deal.email) return alert("No email found for this deal");

  try {
    const res = await fetch("/api/email/send-won", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dealId: deal.id }),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.error || "Failed to send email");

    alert("Won email sent successfully!");
  } catch (err) {
    console.error(err);
    alert("Error sending email");
  }
};

const sendInvoiceEmail = async (deal: Deal) => {
  if (!deal.email) return alert("No email found for this deal");

  try {
    const res = await fetch("/api/email/send-invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dealId: deal.id }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error || "Failed to send invoice");

    alert("Invoice email sent successfully!");
  } catch (err) {
    console.error(err);
    alert("Error sending invoice");
  }
};

const sendFollowUpEmail = async (deal: Deal) => {
  if (!deal.email) return alert("No email found for this deal");

  try {
    const res = await fetch("/api/email/send-followup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dealId: deal.id }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error || "Failed to send follow-up email");

    alert("Follow-up email sent successfully!");
  } catch (err) {
    console.error(err);
    alert("Error sending follow-up email");
  }
};

export default function SalesPipelinePage() {
  const { deals, updateDeal, removeDeal } = useDeals();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"edit" | "view">("edit");
  const [current, setCurrent] = useState<Deal | null>(null);
  const [pipelineDeals, setPipelineDeals] = useState<Deal[]>(deals);

  useEffect(() => {
    setPipelineDeals(deals);
  }, [deals]);

  const filteredDeals = pipelineDeals.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      (d.owner ?? "").toLowerCase().includes(search.toLowerCase()),
  );

  const openModal = (type: typeof mode, deal: Deal) => {
    setMode(type);
    setCurrent(deal);
    setOpen(true);
  };

  const saveDeal = () => {
    if (!current || !current.id) return;
    updateDeal(current);
    setOpen(false);
  };

  const deleteDeal = (id: string) => removeDeal(id);

  const moveDeal = async (deal: Deal, stage: string) => {
    const res = await fetch(`/api/deals/${deal.id}/stage`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage }),
    });

    if (!res.ok) return;

    const updated = await res.json();
    updateDeal(updated);
  };

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-black min-h-screen space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-4xl font-bold">Sales Pipeline</h1>
        <Input
          className="w-full sm:max-w-sm border-black dark:border-white"
          placeholder="Search deals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Pipeline */}
      <div className="flex gap-4 sm:gap-6 overflow-x-auto py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        {stages.map((stage) => (
          <div
            key={stage}
            className="w-72 sm:w-80 shrink-0 border border-black dark:border-white rounded-xl p-3 sm:p-4"
          >
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold">{stage}</h3>
              <span className="text-xs border px-2 rounded-full">
                {filteredDeals.filter((d) => d.stage === stage).length}
              </span>
            </div>

            <div className="space-y-3">
              {filteredDeals
                .filter((d) => d.stage === stage)
                .map((deal) => (
                  <motion.div
                    key={deal.id}
                    whileHover={{ scale: 1.02 }}
                    className="border rounded-lg p-3 space-y-2 text-sm"
                  >
                    {/* Deal info */}
                    <div className="text-sm space-y-1">
                      <p className="font-semibold">{deal.name}</p>
                      <p className="opacity-70">
                        Lead: {(deal as any)?.lead?.name ?? "—"}
                      </p>
                      {deal.email && <p className="opacity-70">{deal.email}</p>}
                      {deal.owner && (
                        <p className="opacity-70">Owner: {deal.owner}</p>
                      )}
                      <p className="text-green-600 font-medium break-words">
                        ₹ {deal.amount.toLocaleString()}
                      </p>
                    </div>

                    {/* CRUD */}
                    <div className="flex flex-wrap gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openModal("view", deal)}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openModal("edit", deal)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteDeal(deal.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>

                    {/* Stage + Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {/* Proposal */}
                      {deal.stage === "Proposal" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            onClick={() => moveDeal(deal, "Closed Won")}
                          >
                            Closed Won
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            onClick={() => moveDeal(deal, "Closed Lost")}
                          >
                            Closed Lost
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="col-span-2 text-xs"
                            onClick={() => sendProposal(deal.id)}
                          >
                            Send Proposal Email
                          </Button>
                        </>
                      )}

                      {/* Closed Won */}
                      {deal.stage === "Closed Won" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            onClick={() => sendWonEmail(deal)}
                          >
                            Send Won Email
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            onClick={() => sendInvoiceEmail(deal)}
                          >
                            Send Invoice
                          </Button>
                        </>
                      )}

                      {/* Closed Lost */}
                      {deal.stage === "Closed Lost" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="col-span-2 text-xs"
                          onClick={() => sendFollowUpEmail(deal)}
                        >
                          Send Follow-up Email
                        </Button>
                      )}

                      {/* Normal flow */}
                      {deal.stage !== "Proposal" &&
                        deal.stage !== "Closed Won" &&
                        deal.stage !== "Closed Lost" &&
                        (STAGE_FLOW[deal.stage] ?? []).map((s) => (
                          <Button
                            key={s}
                            size="sm"
                            variant="outline"
                            className="text-xs"
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
          <motion.div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 overflow-y-auto">
            <motion.div className="bg-white dark:bg-black p-4 sm:p-6 rounded-xl w-full max-w-md space-y-4">
              <div className="flex justify-between">
                <h2 className="font-bold capitalize">{mode} Deal</h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                >
                  <X size={16} />
                </Button>
              </div>

              {["name", "owner", "amount", "email"].map((field) => (
                <Input
                  className="h-11"
                  key={field}
                  disabled={mode === "view"}
                  value={(current as any)[field] || ""}
                  onChange={(e) =>
                    setCurrent({ ...current, [field]: e.target.value })
                  }
                />
              ))}

              {mode === "edit" && (
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
