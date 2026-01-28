"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  CheckCircle2,
  Circle,
  Calendar as CalendarIcon,
} from "lucide-react";
import { format } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

/* -------------------- Types -------------------- */
type Task = {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  due: string;
  completed: boolean;
};

/* -------------------- Dummy Data -------------------- */
const initialTasks: Task[] = [
  {
    id: 1,
    title: "Finalize Tasks module UI review",
    priority: "High",
    due: "Today",
    completed: false,
  },
  {
    id: 2,
    title: "Prepare deployment checklist for CRM",
    priority: "Medium",
    due: "Tomorrow",
    completed: false,
  },
  {
    id: 3,
    title: "Refactor shared components",
    priority: "Low",
    due: "Completed",
    completed: true,
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [open, setOpen] = useState(false);

  // filters & search
  const [filter, setFilter] = useState<"All" | "High" | "Medium" | "Low">(
    "All",
  );
  const [search, setSearch] = useState("");

  // form state
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());

  /* -------------------- Logic -------------------- */
  const addTask = () => {
    if (!title.trim()) return;

    setTasks([
      {
        id: Date.now(),
        title,
        priority,
        due: dueDate ? format(dueDate, "PPP") : "Upcoming",
        completed: false,
      },
      ...tasks,
    ]);

    setTitle("");
    setPriority("Medium");
    setDueDate(new Date());
    setOpen(false);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const filteredTasks = tasks
    .filter((t) => (filter === "All" ? true : t.priority === filter))
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  /* -------------------- UI -------------------- */
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground max-w-2xl">
          Independent task management module for internal operations. Not linked
          to leads or sales pipeline.
        </p>
      </div>

      {/* Top Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Search tasks..."
            className="h-9 sm:w-[220px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select value={filter} onValueChange={(v) => setFilter(v as any)}>
            <SelectTrigger className="h-9 w-[160px]">
              <SelectValue placeholder="Filter priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Priorities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button size="sm" className="gap-2" onClick={() => setOpen(true)}>
          <Plus size={16} /> Add Task
        </Button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="hover:shadow-sm transition">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex gap-4">
                  <button onClick={() => toggleTask(task.id)}>
                    {task.completed ? (
                      <CheckCircle2 className="text-green-500" />
                    ) : (
                      <Circle className="text-muted-foreground" />
                    )}
                  </button>

                  <div>
                    <p
                      className={`font-medium ${
                        task.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <CalendarIcon size={14} /> {task.due}
                    </div>
                  </div>
                </div>

                <Badge
                  variant={
                    task.priority === "High"
                      ? "destructive"
                      : task.priority === "Medium"
                        ? "default"
                        : "secondary"
                  }
                >
                  {task.priority}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add Task Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Task name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Select
              value={priority}
              onValueChange={(v) => setPriority(v as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>

            {/* Due Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : "Pick due date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addTask}>Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
