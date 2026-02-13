"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building2, Users, TrendingUp } from "lucide-react";

const caseStudies = [
  {
    company: "TechNova Solutions",
    slug: "technova-solutions",
    industry: "Software Development",
    icon: Building2,
    result: "35% Productivity Boost",
    description:
      "TechNova streamlined task management and improved delivery timelines using TrackPoint.",
    challenge:
      "Managing multiple projects and tasks across distributed teams caused delays and missed deadlines.",
    solution:
      "Implemented TrackPoint to centralize task tracking, set clear timelines, and monitor progress in real-time.",
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
    challenge:
      "Multiple tools and poor visibility slowed down project delivery and collaboration.",
    solution:
      "Adopted TrackPoint for centralized task management, time tracking, and team dashboards.",
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
    challenge:
      "Manual processes and lack of real-time insights were affecting operational efficiency.",
    solution:
      "Deployed TrackPoint to automate workflow, generate reports, and streamline operations.",
    stats: [
      "60% workflow optimization",
      "Accurate real-time reporting",
      "Better decision making",
    ],
  },
];

export default function CaseStudyPage() {
  const params = useParams();
  const { slug } = params;

  const study = caseStudies.find((c) => c.slug === slug);

  if (!study) {
    return (
      <div className="px-6 py-24 text-center">
        <h1 className="text-3xl font-bold">Case Study Not Found</h1>
        <Link href="/case-studies">
          <Button className="mt-4">Back to Case Studies</Button>
        </Link>
      </div>
    );
  }

  const Icon = study.icon;

  return (
    <div className="bg-background text-foreground px-6 py-24 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">{study.company}</h1>
        <p className="text-black dark:text-white mb-2">{study.industry}</p>
        <p className="text-lg font-semibold text-primary">{study.result}</p>
      </motion.div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-black dark:text-white">{study.description}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Challenge</h2>
        <p className="text-black dark:text-white">{study.challenge}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Solution</h2>
        <p className="text-black dark:text-white">{study.solution}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Key Results</h2>
        <ul className="list-disc list-inside text-black dark:text-white space-y-1">
          {study.stats.map((stat, i) => (
            <li key={i}>{stat}</li>
          ))}
        </ul>
      </section>

      <div className="text-center">
        <Link href="/case-studies">
          <Button>Back to Case Studies</Button>
        </Link>
      </div>
    </div>
  );
}
