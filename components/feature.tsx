"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

export default function Features() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const features = [
    {
      title: "Lead Management",
      description: "Easily track and manage all your leads in one place.",
      icon: <CheckCircle className="w-8 h-8 text-white" />,
      color: "bg-indigo-500",
    },
    {
      title: "Client Tracking",
      description: "Monitor client interactions and history seamlessly.",
      icon: <CheckCircle className="w-8 h-8 text-white" />,
      color: "bg-green-500",
    },
    {
      title: "Analytics & Reports",
      description: "Gain insights with real-time analytics and reports.",
      icon: <CheckCircle className="w-8 h-8 text-white" />,
      color: "bg-yellow-500",
    },
    {
      title: "Automations",
      description:
        "Automate repetitive tasks to save time and improve efficiency.",
      icon: <CheckCircle className="w-8 h-8 text-white" />,
      color: "bg-pink-500",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-black py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Powerful Features
        </h2>

        <p className="text-lg sm:text-xl text-black dark:text-white max-w-2xl mx-auto mb-16">
          Everything you need to manage your clients and grow your business
          efficiently.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-black border border-transparent dark:border-slate-800 p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div
                className={`flex items-center justify-center w-16 h-16 mb-5 rounded-full ${feature.color}`}
              >
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>

              <p className="text-black dark:text-white text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
