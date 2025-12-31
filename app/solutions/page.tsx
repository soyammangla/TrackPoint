"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Users, Clock, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const solutions = [
  {
    icon: ClipboardCheck,
    title: "Task Management",
    desc: "Plan, assign, and track tasks with complete visibility across teams.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Collaborate efficiently with shared updates, roles, and timelines.",
  },
  {
    icon: Clock,
    title: "Time Tracking",
    desc: "Understand how time is spent and eliminate productivity leaks.",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    desc: "Turn work data into insights that help teams grow faster.",
  },
];

export default function SolutionsPage() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <section className="bg-background">
      {/* HERO */}
      <div className="px-6 pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Solutions that scale with your work
          </h1>
          <p className="mt-6 text-lg text-black dark:text-white">
            TrackPoint helps teams stay focused, aligned, and productive without
            complexity.
          </p>
        </motion.div>
      </div>

      {/* SOLUTIONS GRID */}
      <div className="px-6 pb-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          {solutions.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="
                  rounded-2xl border bg-card p-8
                  hover:shadow-md transition
                "
              >
                <div className="mb-5 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  <Icon size={24} />
                </div>

                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-black dark:text-white leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FEATURE STRIP */}
      <div className="border-t border-border bg-gray-50 dark:bg-black"></div>
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Built for teams",
              desc: "From small startups to large organizations, TrackPoint adapts to your workflow.",
            },
            {
              title: "Secure by default",
              desc: "Enterprise-grade security ensures your data remains protected.",
            },
            {
              title: "Easy to adopt",
              desc: "Clean interface with minimal learning curve for faster onboarding.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
                  rounded-2xl border bg-card p-8
                  hover:shadow-md transition
                "
            >
              <h4 className="text-lg font-semibold mb-3">{item.title}</h4>
              <p className="text-sm text-black dark:text-white leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to streamline your workflow?
          </h2>
          <p className="text-black dark:text-white mb-8">
            Start using TrackPoint and bring clarity to your daily work.
          </p>

          <Button
            size="lg"
            onClick={() => {
              if (session) {
                router.push("/");
              } else {
                router.push("/login");
              }
            }}
          >
            {session ? "Go to Dashboard" : "Get Started"}
          </Button>
        </div>
      </div>
    </section>
  );
}
