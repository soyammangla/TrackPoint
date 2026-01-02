"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  LineChart,
  PieChart,
  FileText,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const features = [
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Performance Dashboards",
    desc: "Visual dashboards to track productivity, progress, and team output.",
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: "Trends & Insights",
    desc: "Identify trends over time and make data-driven decisions.",
  },
  {
    icon: <PieChart className="h-6 w-6" />,
    title: "Workload Distribution",
    desc: "See how work is distributed across people and projects.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Exportable Reports",
    desc: "Download reports in CSV or PDF format for sharing.",
  },
];

export default function ReportsAnalyticsPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session) {
      router.push("/home");
    } else {
      router.push("/login");
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
          Reports & Analytics That{" "}
          <span className="text-primary">Drive Growth</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="max-w-2xl mx-auto text-black dark:text-white text-lg mb-10"
        >
          Turn your data into actionable insights with real-time reports and
          powerful analytics — all in one place.
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

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border bg-card dark:bg-zinc-900 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4 text-primary">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-black dark:text-white">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How Analytics Works */}
      <section className="bg-muted/40 dark:bg-black py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How Reports & Analytics Work
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Collect Data",
              "Analyze Performance",
              "Make Better Decisions",
            ].map((step, i) => (
              <div
                key={i}
                className="rounded-2xl bg-background dark:bg-zinc-900 dark:border dark:border-zinc-800 p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="text-primary" />
                  <h4 className="text-lg font-semibold">{step}</h4>
                </div>
                <p className="text-black dark:text-white">
                  {i === 0 && "Automatically collect task and time data."}
                  {i === 1 && "Visualize metrics with charts and summaries."}
                  {i === 2 && "Use insights to optimize workflows and output."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Make Smarter Decisions
        </h2>
        <p className="text-black dark:text-white max-w-xl mx-auto mb-8">
          Get complete visibility into your team’s performance with TrackPoint
          analytics.
        </p>
        <Button size="lg" className="gap-2" onClick={handleGetStarted}>
          View Your Reports <ArrowRight className="h-4 w-4" />
        </Button>
      </section>
    </main>
  );
}
