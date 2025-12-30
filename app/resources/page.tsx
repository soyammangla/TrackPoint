"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Newspaper,
  HelpCircle,
  FileText,
  Rocket,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const resources = [
  {
    icon: BookOpen,
    title: "Documentation",
    desc: "Complete guides, setup instructions, and API references.",
    href: "/docs",
    protected: false,
  },
  {
    icon: Newspaper,
    title: "Blog & Updates",
    desc: "Product updates, productivity tips, and announcements.",
    href: "/blog",
    protected: false,
  },
  {
    icon: FileText,
    title: "Case Studies",
    desc: "Real stories of teams improving productivity with TrackPoint.",
    href: "/case-studies",
    protected: false,
  },
  {
    icon: HelpCircle,
    title: "Help Center",
    desc: "FAQs, troubleshooting, and customer support.",
    href: "/contact",
    protected: true,
  },
];

export default function ResourcesPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const navigate = (path: string, isProtected = false) => {
    if (isProtected && !session) {
      router.push("/login");
    } else {
      router.push(path);
    }
  };

  return (
    <div className="bg-background text-foreground">
      {/* ================= HERO ================= */}
      <section className="px-6 py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Resources for Smarter Productivity
        </motion.h1>

        <p className="max-w-3xl mx-auto text-lg mb-10 text-black dark:text-white">
          Learn, explore, and master TrackPoint with detailed documentation,
          real-world case studies, and live product demos.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/docs">
            <Button size="lg">Read Documentation</Button>
          </Link>

          <Link href="/case-studies">
            <Button size="lg" variant="outline">
              View Case Studies
            </Button>
          </Link>
        </div>
      </section>

      {/* ================= RESOURCES GRID ================= */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => navigate(item.href, item.protected)}
                className="w-full text-left h-full rounded-2xl border bg-card p-6 hover:shadow-xl transition"
              >
                <item.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-black dark:text-white">
                  {item.desc}
                </p>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= EXTRA SECTION ================= */}
      <section className="px-6 py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LIVE DEMO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border bg-card p-10"
          >
            <PlayCircle className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Live Product Demo</h3>
            <p className="text-black dark:text-white mb-6">
              Explore TrackPoint in real-time and see how it works for your
              team.
            </p>

            <Button variant="outline" onClick={() => navigate("/demo", true)}>
              View Live Demo
            </Button>
          </motion.div>

          {/* GET STARTED */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border bg-card p-10"
          >
            <Rocket className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-3">
              Get Started in Minutes
            </h3>
            <p className="text-black dark:text-white mb-6">
              Jump into your dashboard and start tracking productivity today.
            </p>

            <Button variant="outline" onClick={() => navigate("/", true)}>
              Go to Dashboard
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 py-28 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Need More Help?</h2>

        <p className="text-black dark:text-white mb-8">
          Our team and documentation are always ready to support you.
        </p>

        <div className="flex justify-center gap-4">
          <Button size="lg" onClick={() => navigate("/contact", true)}>
            Contact Support
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/", true)}
          >
            Open Dashboard
          </Button>
        </div>
      </section>
    </div>
  );
}
