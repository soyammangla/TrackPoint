"use client";

import React from "react";
import { CheckCircle, Users, FileText, Zap } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Sign Up",
      description:
        "Create your account in seconds and start managing your clients.",
      icon: <Users className="w-8 h-8 text-white" />,
      color: "bg-indigo-500",
    },
    {
      title: "Add Clients",
      description: "Add your clients, leads, and contacts with ease.",
      icon: <FileText className="w-8 h-8 text-white" />,
      color: "bg-green-500",
    },
    {
      title: "Track Progress",
      description:
        "Monitor interactions, follow-ups, and analytics in real-time.",
      icon: <CheckCircle className="w-8 h-8 text-white" />,
      color: "bg-yellow-500",
    },
    {
      title: "Automate Tasks",
      description: "Automate repetitive tasks and save time for what matters.",
      icon: <Zap className="w-8 h-8 text-white" />,
      color: "bg-pink-500",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-black py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          How It Works
        </h2>

        <p className="text-lg sm:text-xl text-black dark:text-white max-w-2xl mx-auto mb-16">
          Follow these simple steps to get started and make the most out of our
          CRM.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-black border border-transparent dark:border-slate-800 p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div
                className={`flex items-center justify-center w-16 h-16 mb-5 rounded-full ${step.color}`}
              >
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>

              <p className="text-black dark:text-white text-sm sm:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
