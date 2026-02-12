"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Features() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const features = [
    {
      title: "Lead & Client Management",
      description:
        "Organize leads, manage clients, and keep track of every interaction in one place.",
    },
    {
      title: "Sales Pipeline Management",
      description:
        "Move deals through stages, monitor progress, and close opportunities faster.",
    },
    {
      title: "Email & Task Management",
      description:
        "Send emails, assign tasks, and stay on top of follow-ups without switching tools.",
    },
    {
      title: "Reports & Analytics Dashboard",
      description:
        "Track performance, monitor growth, and make decisions with clear visual insights.",
    },
  ];

  return (
    <section className="w-full py-20 md:py-28 px-6 bg-white dark:bg-black ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-black dark:text-white max-w-2xl mx-auto">
            Everything you need to manage your clients and grow your business
            efficiently.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-10 transition-all duration-300 hover:shadow-lg hover:border-border/70"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">
                {feature.title}
              </h3>
              <p className="text-sm text-black dark:text-white leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
