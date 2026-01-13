"use client";

import { Users, FileText, CheckCircle, Zap } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Sign Up",
      description:
        "Create your account in seconds and get instant access to your CRM dashboard.",
    },
    {
      title: "Add Clients & Leads",
      description:
        "Store all your leads, clients, and contacts in one secure place.",
    },
    {
      title: "Track & Analyze",
      description:
        "Monitor conversations, deals, and business performance in real time.",
    },
    {
      title: "Automate & Grow",
      description:
        "Let the system handle follow-ups and workflows while you focus on closing deals.",
    },
  ];

  return (
    <section className="w-full py-20 md:py-28 px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-xl text-black dark:text-white max-w-2xl mx-auto">
            Get started in minutes and manage your entire business from one
            simple platform.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-10 transition-all duration-300 hover:shadow-lg hover:border-border/70"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">
                {step.title}
              </h3>

              <p className="text-sm text-black dark:text-white leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
