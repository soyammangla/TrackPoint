"use client";

import React from "react";
import Link from "next/link";

// ---------------- Reusable Step Component ----------------
const Step = ({ number = "", title = "" }) => {
  return (
    <div className="flex flex-col items-center text-center p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-black dark:border-white">
      <div className="text-5xl font-bold text-black dark:text-white mb-3">
        {number}
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-black dark:text-white">
        {title}
      </h3>
    </div>
  );
};

// ---------------- Feature Card Component ----------------
const FeatureCard = ({ icon = "💡", title = "", description = "" }) => {
  return (
    <div className="flex flex-col items-center text-center p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-black dark:text-white">{description}</p>
    </div>
  );
};

// ---------------- Main Features Page ----------------
const FeaturesPage = () => {
  const features = [
    {
      icon: "📊",
      title: "Smart Tracking",
      description: "Keep track of all your tasks and projects efficiently.",
    },
    {
      icon: "⏰",
      title: "Time Management",
      description: "Manage your time and deadlines effectively.",
    },
    {
      icon: "🔔",
      title: "Notifications",
      description: "Stay updated with real-time alerts and reminders.",
    },
    {
      icon: "📈",
      title: "Analytics",
      description: "Analyze productivity and improve performance.",
    },
    {
      icon: "🔒",
      title: "Secure Data",
      description: "Your data is safe and encrypted at all times.",
    },
    {
      icon: "⚡",
      title: "Fast Performance",
      description: "Experience lightning-fast response across the app.",
    },
  ];

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      {/* ---------------- Hero Section ---------------- */}
      <section className="text-center py-16 px-4 md:px-8 lg:px-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Powerful Features built for Productivity
        </h1>
        <p className="text-black dark:text-white text-lg md:text-xl max-w-2xl mx-auto">
          Trackpoint helps you track, manage and optimize your work — all in one
          place.
        </p>
      </section>

      {/* ---------------- Features Grid ---------------- */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      {/* ---------------- How It Works Section ---------------- */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-black dark:text-white">
            How It Works
          </h2>
          <p className="text-black dark:text-white text-lg">
            Simple steps to get started and boost your productivity.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Step number="01" title="Create Account" />
          <Step number="02" title="Track Your Work" />
          <Step number="03" title="Analyze & Improve" />
        </div>
      </section>

      {/* ---------------- CTA Section ---------------- */}
      <section className="py-16 px-4 md:px-8 lg:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start using Trackpoint today
        </h2>
        <p className="text-black dark:text-white text-lg mb-8">
          Boost productivity with smart tracking.
        </p>

        <Link href="/login">
          <button className="bg-black dark:bg-neutral-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition duration-300">
            Get Started
          </button>
        </Link>
      </section>
    </div>
  );
};

export default FeaturesPage;
