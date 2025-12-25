"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[360px] w-[360px] sm:h-[420px] sm:w-[420px] -translate-x-1/2 rounded-full bg-indigo-500/20 dark:bg-indigo-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-center lg:text-left"
          >
            <span className="mx-auto inline-flex items-center justify-center rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-1 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 lg:mx-0">
              🚀 Modern CRM Platform
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
              Manage Customers.
              <br />
              Grow Faster with{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                Trackpoint
              </span>
            </h1>

            <p className="mx-auto max-w-md sm:max-w-xl text-base sm:text-lg text-black dark:text-white lg:mx-0">
              Trackpoint helps teams manage leads, automate follow-ups, and
              close more deals — all from one simple CRM dashboard.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 lg:justify-start">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="gap-2 w-full sm:w-auto"
              >
                <Play className="h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            <p className="text-xs sm:text-sm text-black dark:text-white">
              No credit card required • Setup in 2 minutes
            </p>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative w-full"
          >
            <div className="absolute -inset-4 sm:-inset-6 -z-10 rounded-3xl bg-indigo-500/20 dark:bg-indigo-400/10 blur-3xl" />

            <div className="relative mx-auto max-w-md sm:max-w-xl lg:max-w-none rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-2 sm:p-3 shadow-xl">
              <Image
                src="/dashboard.png"
                alt="Trackpoint CRM Dashboard"
                width={720}
                height={480}
                className="w-full h-auto rounded-xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
