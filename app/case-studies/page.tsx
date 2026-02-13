"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    company: "TechNova Solutions",
    slug: "technova-solutions",
    industry: "Software Development",
    icon: Building2,
    result: "35% Productivity Boost",
    description:
      "TechNova streamlined task management and improved delivery timelines.",
    stats: [
      "35% faster task completion",
      "50% better time visibility",
      "Reduced missed deadlines",
    ],
  },
  {
    company: "BrightMark Agency",
    slug: "brightmark-agency",
    industry: "Marketing & Design",
    icon: Users,
    result: "2x Team Efficiency",
    description:
      "BrightMark unified projects, tracked time, and improved collaboration across teams.",
    stats: [
      "2x efficiency improvement",
      "40% less project overhead",
      "Improved client satisfaction",
    ],
  },
  {
    company: "OpsCore Logistics",
    slug: "opscore-logistics",
    industry: "Operations & Logistics",
    icon: TrendingUp,
    result: "60% Workflow Optimization",
    description:
      "OpsCore optimized internal workflows and real-time reporting with TrackPoint.",
    stats: [
      "60% workflow optimization",
      "Accurate real-time reporting",
      "Better decision making",
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="bg-background dark:bg-black text-foreground">
      {/* HERO */}
      <section className="px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-black dark:text-white"
        >
          Customer Success Stories
        </motion.h1>

        <p className="text-black dark:text-white max-w-3xl mx-auto text-lg">
          See how teams across industries use TrackPoint to improve
          productivity, streamline workflows, and achieve better results.
        </p>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border bg-card dark:bg-black p-8 hover:shadow-xl transition"
            >
              <study.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-1 text-black dark:text-white">
                {study.company}
              </h3>
              <p className="text-sm text-black dark:text-white mb-4">
                {study.industry}
              </p>
              <p className="mb-4 text-black dark:text-white">
                {study.description}
              </p>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-primary">Key Results</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-black dark:text-white">
                  {study.stats.map((stat, i) => (
                    <li key={i}>{stat}</li>
                  ))}
                </ul>
              </div>

              <Link href={`/case-studies/${study.slug}`}>
                <Button variant="outline" className="w-full group">
                  Read Full Case Study
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-24 text-center bg-muted/30 dark:bg-black">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6 text-black dark:text-white"
        >
          Want to Be Our Next Success Story?
        </motion.h2>

        <p className="text-black dark:text-white max-w-2xl mx-auto mb-8">
          Join thousands of teams using TrackPoint to work smarter, faster, and
          better.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/">
            <Button size="lg">Get Started</Button>
          </Link>

          <Link href="/contact">
            <Button size="lg" variant="outline">
              Talk to Sales
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
