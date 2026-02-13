"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Rocket,
  LayoutDashboard,
  CheckCircle,
  Clock,
  Folder,
  Shield,
} from "lucide-react";

const sections = [
  {
    icon: Rocket,
    title: "Getting Started",
    content: [
      "Create an account using email or social login.",
      "Verify your account and log in.",
      "You will be redirected to the TrackPoint dashboard.",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard Overview",
    content: [
      "View all active and completed tasks.",
      "Track productivity statistics in real time.",
      "Use quick actions to create tasks and projects.",
    ],
  },
  {
    icon: CheckCircle,
    title: "Task Management",
    content: [
      "Create tasks with title, description, and due date.",
      "Update task status: Pending, In Progress, Completed.",
      "Delete tasks anytime if no longer needed.",
    ],
  },
  {
    icon: Clock,
    title: "Time Tracking",
    content: [
      "Start timer directly from a task.",
      "Stop timer anytime to save logs.",
      "Analyze time spent using reports.",
    ],
  },
  {
    icon: Folder,
    title: "Projects",
    content: [
      "Group tasks under projects.",
      "Track project progress separately.",
      "Manage deadlines efficiently.",
    ],
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    content: [
      "Secure authentication using NextAuth.",
      "User data is encrypted and protected.",
      "You control your data and visibility.",
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          TrackPoint Documentation
        </motion.h1>

        <p className="text-black dark:text-white max-w-3xl mx-auto text-lg">
          Learn how to use TrackPoint effectively to manage tasks, track time,
          and boost productivity.
        </p>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto space-y-10">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border bg-card p-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <section.icon className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold">{section.title}</h2>
              </div>

              <ul className="list-disc list-inside space-y-2 text-black dark:text-white">
                {section.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
