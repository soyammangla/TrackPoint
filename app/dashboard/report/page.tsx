"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Report {
  title: string;
  reviewed: boolean;
}

export default function CreateReportPage() {
  const router = useRouter();

  const [reports, setReports] = useState<Report[]>([]); // Existing reports can also be loaded

  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Add new report
    const newReport: Report = { title: title.trim(), reviewed: false };
    setReports((prev) => [...prev, newReport]);

    // Reset form
    setTitle("");

    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create Report</h1>
        <Link href="/dashboard">
          <Button
            variant="outline"
            className="text-black dark:text-white border-black dark:border-white"
          >
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <Card className="rounded-2xl max-w-md mx-auto">
        <CardHeader>
          <CardTitle>New Report</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Report Title */}
            <input
              type="text"
              placeholder="Report Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-lg p-2"
              required
            />

            <Button type="submit">Create Report</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
