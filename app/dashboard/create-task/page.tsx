"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Task {
  title: string;
  assignedTo: string;
}

interface TeamMember {
  name: string;
}

export default function CreateTaskPage() {
  const router = useRouter();

  const [team, setTeam] = useState<TeamMember[]>([
    { name: "Alice" },
    { name: "Bob" },
  ]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState(team[0].name);
  const [newMember, setNewMember] = useState(""); // For adding new member

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    let finalAssignedTo = assignedTo;

    if (assignedTo === "Add New Member") {
      if (!newMember.trim()) return;
      finalAssignedTo = newMember.trim();

      if (!team.find((m) => m.name === finalAssignedTo)) {
        setTeam((prev) => [...prev, { name: finalAssignedTo }]);
      }
    }

    const newTask: Task = { title, assignedTo: finalAssignedTo };
    setTasks((prev) => [...prev, newTask]);

    setTitle("");
    setAssignedTo(team[0]?.name || "");
    setNewMember("");

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black px-6 py-8 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Create Task
        </h1>
        <Link href="/dashboard">
          <Button
            variant="outline"
            className="text-black dark:text-white border-black dark:border-white"
          >
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <Card className="rounded-2xl max-w-md mx-auto bg-card border transition-colors duration-300">
        <CardHeader>
          <CardTitle className="text-black dark:text-white">New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Task Title */}
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-lg p-2 bg-white dark:bg-black  text-black dark:text-white placeholder-black dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors duration-300"
              required
            />

            {/* Assigned To */}
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="border rounded-lg p-2 bg-white dark:bg-black  text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors duration-300"
            >
              {team.map((m, i) => (
                <option key={i} value={m.name}>
                  {m.name}
                </option>
              ))}
              <option value="Add New Member">+ Add New Member</option>
            </select>

            {/* New Member Input */}
            {assignedTo === "Add New Member" && (
              <input
                type="text"
                placeholder="Enter new member name"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                className="border rounded-lg p-2 bg-white dark:bg-black border-black dark:border-white text-black dark:text-white placeholder-black dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors duration-300"
                required
              />
            )}

            <Button
              type="submit"
              className="bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-colors duration-300"
            >
              Create Task
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
