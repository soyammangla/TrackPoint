"use client";

import { motion } from "framer-motion";
import {
  Clock,
  PlayCircle,
  PauseCircle,
  BarChart3,
  Calendar,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const features = [
  {
    icon: <PlayCircle className="h-6 w-6" />,
    title: "One-click Time Tracking",
    desc: "Start and stop timers instantly to track work accurately.",
  },
  {
    icon: <PauseCircle className="h-6 w-6" />,
    title: "Idle Detection",
    desc: "Automatically detect idle time and keep logs clean.",
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Daily & Weekly Logs",
    desc: "Review time spent with detailed daily and weekly breakdowns.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Productivity Insights",
    desc: "Understand where time goes with clear analytics and reports.",
  },
];

export default function TimeTrackingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleGetStarted = () => {
    if (session) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  };

  const handleStartTracking = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/home");
    }
  };

  return (
    <main className="relative overflow-hidden bg-background dark:bg-black">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Time Tracking That <span className="text-primary">Boosts Focus</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="max-w-2xl mx-auto text-black dark:text-white text-lg mb-10"
        >
          Track time effortlessly, reduce distractions, and gain full visibility
          into how your team works.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center gap-4"
        >
          <Button size="lg" className="gap-2" onClick={handleGetStarted}>
            Get Started <ArrowRight className="h-4 w-4" />
          </Button>

          <Button size="lg" variant="outline" asChild>
            <Link href="/demo">View Demo</Link>
          </Button>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4 text-primary">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-black dark:text-white">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-muted/40 dark:bg-black py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How Time Tracking Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Start Timer", "Track Automatically", "Analyze Productivity"].map(
              (step, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-background dark:bg-zinc-900 dark:border dark:border-zinc-800 p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="text-primary" />
                    <h4 className="text-lg font-semibold">{step}</h4>
                  </div>
                  <p className="text-black dark:text-white">
                    {i === 0 && "Start tracking time with a single click."}
                    {i === 1 && "Time is logged automatically as you work."}
                    {i === 2 && "Review reports to improve efficiency."}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Make Every Minute Count
        </h2>
        <p className="text-black dark:text-white max-w-xl mx-auto mb-8">
          Understand productivity better and build smarter workflows with
          TrackPoint Time Tracking.
        </p>
        <Button size="lg" className="gap-2" onClick={handleStartTracking}>
          Start Tracking Time <ArrowRight className="h-4 w-4" />
        </Button>
      </section>
    </main>
  );
}
