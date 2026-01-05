"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  ListTodo,
  Clock,
  Users,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: <ListTodo className="h-6 w-6" />,
    title: "Smart Task Lists",
    desc: "Create, organize, and prioritize tasks with due dates and labels.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Deadline Tracking",
    desc: "Never miss a deadline with reminders and progress indicators.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Team Collaboration",
    desc: "Assign tasks, comment, and collaborate in real time.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Progress Analytics",
    desc: "Track productivity with visual reports and insights.",
  },
];

export default function TaskManagementPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session) {
      router.push("/"); // home
    } else {
      router.push("/login");
    }
  };

  const handleStartFreeTrial = () => {
    if (session) {
      router.push("/dashboard"); // app/dashboard
    } else {
      router.push("/"); // home
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
          Task Management Made <span className="text-primary">Simple</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="max-w-2xl mx-auto text-black dark:text-white text-lg mb-10"
        >
          Plan, track, and complete tasks faster with TrackPoint’s powerful task
          management solution.
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

      {/* How It Works */}
      <section className="bg-muted/40 dark:bg-black py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How Task Management Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Create Tasks", "Assign & Track", "Complete & Analyze"].map(
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
                    {i === 0 &&
                      "Add tasks with priorities, deadlines, and descriptions."}
                    {i === 1 &&
                      "Assign tasks to teammates and monitor progress live."}
                    {i === 2 &&
                      "Mark tasks done and review performance analytics."}
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
          Boost Your Productivity Today
        </h2>
        <p className="text-black dark:text-white max-w-xl mx-auto mb-8">
          Start managing tasks efficiently and keep your team aligned with
          TrackPoint.
        </p>
        <Button size="lg" className="gap-2" onClick={handleStartFreeTrial}>
          Start Free Trial <ArrowRight className="h-4 w-4" />
        </Button>
      </section>
    </main>
  );
}
