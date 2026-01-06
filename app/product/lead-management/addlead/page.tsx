"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function AddLeadPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "New",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-neutral-100 flex justify-center items-start">
      <div className="w-full max-w-3xl px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>

          <h1 className="text-3xl font-bold">Add New Lead</h1>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="rounded-2xl dark:bg-neutral-900 dark:border-neutral-800">
            <CardHeader>
              <CardTitle>Lead Details</CardTitle>
              <p className="text-sm text-black dark:text-white0">
                Fill in the information to create a new lead
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Name */}
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  name="name"
                  placeholder="Rahul Sharma"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 dark:bg-black dark:border-neutral-800"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  name="email"
                  placeholder="rahul@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 dark:bg-black dark:border-neutral-800"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  name="phone"
                  placeholder="+91 9XXXXXXXXX"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-1 dark:bg-black dark:border-neutral-800"
                />
              </div>

              {/* Company */}
              <div>
                <label className="text-sm font-medium">Company</label>
                <Input
                  name="company"
                  placeholder="TechNova Pvt Ltd"
                  value={form.company}
                  onChange={handleChange}
                  className="mt-1 dark:bg-black dark:border-neutral-800"
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Lead Status
                </label>

                <div className="flex gap-2">
                  {["New", "In Progress", "Converted"].map((s) => (
                    <Badge
                      key={s}
                      className="cursor-pointer"
                      variant={form.status === s ? "default" : "outline"}
                      onClick={() => setForm({ ...form, status: s })}
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => router.push("/leads")}>
                  Cancel
                </Button>

                <Button className="gap-2">
                  <Save size={16} />
                  Save Lead
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
