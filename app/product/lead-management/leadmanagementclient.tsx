"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  owner: string;
};

export default function LeadManagementPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<any>({
    name: "",
    email: "",
    phone: "",
    status: "New",
    owner: "",
  });

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => setLeads(data));
  }, []);

  const saveLead = async () => {
    const res = await fetch("/api/leads", {
      method: "POST",
      body: JSON.stringify(current),
    });

    const data = await res.json();

    if (data.error === "LIMIT") {
      alert("Upgrade to Paid plan to add more leads");
      return;
    }

    setLeads([...leads, data]);
    setOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Lead Management</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus size={16} /> Add Lead
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td>{l.name}</td>
                  <td>{l.email}</td>
                  <td>{l.status}</td>
                  <td>{l.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <motion.div className="bg-white p-6 rounded-xl space-y-4">
              <Input
                placeholder="Name"
                onChange={(e) =>
                  setCurrent({ ...current, name: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                onChange={(e) =>
                  setCurrent({ ...current, email: e.target.value })
                }
              />
              <Input
                placeholder="Phone"
                onChange={(e) =>
                  setCurrent({ ...current, phone: e.target.value })
                }
              />
              <Input
                placeholder="Owner"
                onChange={(e) =>
                  setCurrent({ ...current, owner: e.target.value })
                }
              />
              <Button onClick={saveLead}>Save Lead</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
