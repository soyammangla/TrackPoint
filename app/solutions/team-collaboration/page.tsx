"use client";

import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Share2,
  Bell,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const features = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Team Workspaces",
    desc: "Create shared workspaces where your entire team collaborates seamlessly.",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Real‑time Comments",
    desc: "Discuss tasks instantly with mentions and threaded comments.",
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    title: "Easy Sharing",
    desc: "Share tasks, files, and updates with complete visibility.",
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Smart Notifications",
    desc: "Stay updated with alerts for mentions, deadlines, and changes.",
  },
];

export default function TeamCollaborationPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  };

  const handleStartCollaborating = () => {
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
          Team Collaboration That{" "}
          <span className="text-primary">Actually Works</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="max-w-2xl mx-auto text-black dark:text-white text-lg mb-10"
        >
          Bring your team together with real‑time collaboration, clear
          ownership, and transparent communication — all inside TrackPoint.
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
            How Team Collaboration Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Create Workspace",
              "Collaborate in Real‑time",
              "Deliver Faster",
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
                  {i === 0 && "Set up teams, roles, and shared workspaces."}
                  {i === 1 &&
                    "Comment, tag teammates, and share updates instantly."}
                  {i === 2 && "Reduce miscommunication and ship work faster."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Build Better Together
        </h2>
        <p className="text-black dark:text-white max-w-xl mx-auto mb-8">
          Empower your team with seamless collaboration and clear communication.
        </p>
        <Button size="lg" className="gap-2" onClick={handleStartCollaborating}>
          Start Collaborating <ArrowRight className="h-4 w-4" />
        </Button>
      </section>
    </main>
  );
}
