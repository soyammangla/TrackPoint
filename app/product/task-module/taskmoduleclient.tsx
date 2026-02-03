"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  CheckCircle2,
  Circle,
  Calendar as CalendarIcon,
  Eye,
  Pencil,
  Trash2,
  Search,
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
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  /* dialogs */
  const [open, setOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);

  /* add task */
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());

  /* view / edit */
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [mode, setMode] = useState<"view" | "edit">("view");

  /* search */
  const [search, setSearch] = useState("");

  /* -------------------- Logic -------------------- */

  const addTask = () => {
    if (!title.trim()) return;

    setTasks((prev) => [
      {
        id: Date.now(),
        title,
        priority,
        due: format(dueDate ?? new Date(), "PPP"),
        completed: false,
      },
      ...prev,
    ]);

    setTitle("");
    setPriority("Medium");
    setDueDate(new Date());
    setOpen(false);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const openView = (task: Task) => {
    setSelectedTask(task);
    setMode("view");
    setActionOpen(true);
  };

  const openEdit = (task: Task) => {
    setSelectedTask({ ...task });
    setMode("edit");
    setActionOpen(true);
  };

  const saveEdit = () => {
    if (!selectedTask) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === selectedTask.id ? selectedTask : t)),
    );
    setActionOpen(false);
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()),
  );

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className=" mb-4 text-4xl font-bold">Tasks</h1>

        {/* Search + Add Task */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black dark:text-white"
            />
            <Input
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-64 border-black dark:border-white"
            />
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="bg-black text-white dark:bg-white dark:text-black"
          >
            <Plus size={16} className="mr-2" /> Add Task
          </Button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Card className="rounded-xl">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex gap-4">
                  <button onClick={() => toggleTask(task.id)}>
                    {task.completed ? <CheckCircle2 /> : <Circle />}
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
                    <div className="text-s flex items-center gap-2 mt-2">
                      <CalendarIcon size={14} /> {task.due}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{task.priority}</Badge>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => openView(task)}
                  >
                    <Eye size={16} />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => openEdit(task)}
                  >
                    <Pencil size={16} />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {filteredTasks.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            No tasks found
          </p>
        )}
      </div>

      {/* ADD TASK DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Select
              value={priority}
              onValueChange={(v) => setPriority(v as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(dueDate ?? new Date(), "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                />
              </PopoverContent>
            </Popover>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addTask} disabled={!title.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* VIEW / EDIT DIALOG */}
      <Dialog open={actionOpen} onOpenChange={setActionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === "view" ? "View Task" : "Edit Task"}
            </DialogTitle>
          </DialogHeader>

          {selectedTask && (
            <div className="space-y-5">
              {/* Task Title */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Task title</label>
                <Input
                  placeholder="e.g. Design dashboard UI"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Priority + Due Date */}
              <div className="grid grid-cols-2 gap-4">
                {/* Priority */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Priority</label>
                  <Select
                    value={priority}
                    onValueChange={(v) => setPriority(v as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">🔥 High</SelectItem>
                      <SelectItem value="Medium">⚡ Medium</SelectItem>
                      <SelectItem value="Low">🌱 Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Due Date */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Due date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(dueDate ?? new Date(), "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionOpen(false)}>
              Close
            </Button>
            {mode === "edit" && <Button onClick={saveEdit}>Save</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
