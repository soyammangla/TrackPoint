"use client";

import { motion } from "framer-motion";
import {
  Users,
  GitBranch,
  Settings,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import ProtectedLink from "@/components/protectedlink";

const solutions = [
  {
    title: "Secure CRM",
    desc: "Centralized, secure system to manage your entire customer lifecycle.",
    icon: ShieldCheck,
    href: "/dashboard",
  },
  {
    title: "Lead Management",
    desc: "Capture, track, assign, and convert leads efficiently.",
    icon: Users,
    href: "/product/lead-management",
  },
  {
    title: "Sales Pipeline",
    desc: "Visualize deals across stages and close faster.",
    icon: GitBranch,
    href: "/product/sales-pipeline",
  },
  {
    title: "Task-Module",
    desc: "Organize and prioritize your daily activities with ease.",
    icon: Settings,
    href: "/product/task-module",
  },
  {
    title: "Reports & Analytics",
    desc: "Track performance with real-time insights.",
    icon: BarChart3,
    href: "/product/reports-analytics",
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold">Solutions</h1>
        <p className="mt-4 text-black dark:text-white max-w-2xl mx-auto">
          Everything you need to manage customers, sales, and growth — in one
          secure CRM platform.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className="h-6 w-6 text-neutral-800 dark:text-neutral-200" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>

              <p className="text-sm text-black dark:text-white mb-6">
                {item.desc}
              </p>

              <ProtectedLink
                href={item.href}
                className="inline-block text-sm font-medium text-black dark:text-white underline underline-offset-4"
              >
                Explore →
              </ProtectedLink>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
