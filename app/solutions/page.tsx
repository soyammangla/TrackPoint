"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Users,
  Clock,
  BarChart3,
  ArrowRight,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const solutions = [
  {
    icon: ClipboardCheck,
    title: "Task Management",
    desc: "Plan, assign, and track tasks with complete visibility across teams.",
    href: "/solutions/task-management",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Collaborate efficiently with shared updates, roles, and timelines.",
    href: "/solutions/team-collaboration",
  },
  {
    icon: Clock,
    title: "Time Tracking",
    desc: "Understand how time is spent and eliminate productivity leaks.",
    href: "/solutions/time-tracking",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    desc: "Turn work data into insights that help teams grow faster.",
    href: "/solutions/analytics",
  },
];

export default function SolutionsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section
      className={
        resolvedTheme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }
    >
      {/* HERO SECTION */}
      <div className="px-6 pt-32 pb-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Solutions built for modern teams
          </h1>
          <p
            className={`mt-6 text-lg ${
              resolvedTheme === "dark" ? "text-white" : "text-black"
            }`}
          >
            TrackPoint helps teams stay focused, aligned, and productive —
            without unnecessary complexity.
          </p>
        </motion.div>
      </div>

      {/* SOLUTIONS GRID */}
      <div className="px-6 pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                onClick={() => router.push(item.href)}
                className={`group cursor-pointer rounded-2xl border p-8 transition
                  ${
                    resolvedTheme === "dark"
                      ? "bg-neutral-900 border-white/10"
                      : "bg-white border-gray-200"
                  }`}
              >
                <div className="mb-6 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  <Icon size={26} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    resolvedTheme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {item.desc}
                </p>
                <div
                  className={`flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition`}
                >
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FEATURE STRIP */}
      <div
        className={`border-t ${
          resolvedTheme === "dark"
            ? "border-white/10 bg-black"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Built for scale",
                desc: "From startups to enterprises, TrackPoint adapts to any workflow size.",
              },
              {
                title: "Secure by design",
                desc: "Enterprise-grade security with modern authentication and data protection.",
              },
              {
                title: "Easy adoption",
                desc: "Clean interface with minimal learning curve for fast onboarding.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-2xl border p-8 transition ${
                  resolvedTheme === "dark"
                    ? "bg-neutral-900 border-white/10"
                    : "bg-white border-gray-200"
                }`}
              >
                <h4 className="text-lg font-semibold mb-3">{item.title}</h4>
                <p
                  className={`text-sm leading-relaxed ${
                    resolvedTheme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-36">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to bring clarity to your work?
          </h2>
          <p
            className={`mb-10 ${
              resolvedTheme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Start using TrackPoint today and experience structured productivity.
          </p>
          <Button
            size="lg"
            className="px-10"
            onClick={() => (session ? router.push("/") : router.push("/login"))}
          >
            {session ? "Go to Dashboard" : "Get Started"}
          </Button>
        </div>
      </div>
    </section>
  );
}
