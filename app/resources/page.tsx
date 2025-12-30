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

const mainResources = [
  {
    icon: BookOpen,
    title: "Documentation",
    desc: "Step-by-step guides, API references, and setup instructions.",
    href: "/docs",
  },
  {
    icon: Newspaper,
    title: "Blog & Updates",
    desc: "Product updates, productivity tips, and TrackPoint news.",
    href: "/blog",
  },
  {
    icon: FileText,
    title: "Case Studies",
    desc: "See how teams boost productivity using TrackPoint.",
    href: "/case-studies",
  },
  {
    icon: HelpCircle,
    title: "Help Center",
    desc: "FAQs, troubleshooting, and customer support resources.",
    href: "/support",
  },
];

const extraResources = [
  {
    icon: PlayCircle,
    title: "Live Demo",
    desc: "Experience TrackPoint in real time with an interactive live demo.",
  },
  {
    icon: Rocket,
    title: "Getting Started",
    desc: "New here? Launch your productivity journey in minutes.",
  },
];

export default function ResourcesPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // 🔑 click-time auth check
  const handleAuthRedirect = () => {
    if (!session) {
      router.push("/login");
    } else {
      router.push("/"); // ya dashboard
    }
  };

  return (
    <div className="bg-background text-foreground">
      {/* HERO */}
      <section className="px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          TrackPoint Resources
        </motion.h1>

        <p className="text-muted-foreground max-w-3xl mx-auto text-lg mb-8">
          Everything you need to explore, understand, and master productivity
          with TrackPoint.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/docs">
            <Button size="lg">Explore Docs</Button>
          </Link>

          <Link href="/blog">
            <Button size="lg" variant="outline">
              Visit Blog
            </Button>
          </Link>
        </div>
      </section>

      {/* MAIN RESOURCES */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mainResources.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link
                href={item.href}
                className="block h-full rounded-2xl border bg-card p-6 hover:shadow-xl transition"
              >
                <item.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EXTRA SECTION */}
      <section className="px-6 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {extraResources.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border bg-card p-8"
            >
              <item.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground mb-6">{item.desc}</p>

              <Button variant="outline" onClick={handleAuthRedirect}>
                {item.title === "Live Demo" ? "View Demo" : "Get Started"}
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Still Have Questions?
        </h2>

        <p className="text-muted-foreground mb-8">
          Our support team and documentation are always here to help.
        </p>

        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            onClick={() => router.push(session ? "/contact" : "/login")}
          >
            Contact Support
          </Button>

          <Button size="lg" variant="outline" onClick={handleAuthRedirect}>
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
}
