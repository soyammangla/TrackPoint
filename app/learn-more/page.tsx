"use client";

import React from "react";

const LearnMorePage = () => {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      <section className="text-center py-20 px-4 md:px-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Learn More About Trackpoint
        </h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Discover how Trackpoint helps you track work, manage time, and boost
          productivity with smart insights.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-8 space-y-16 pb-24">
        {/* Section 1 */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            Why Trackpoint?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Trackpoint is built for individuals and teams who want clarity,
            control, and consistency in their work. From task tracking to deep
            analytics, everything is designed to save time and reduce friction.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            Smart Task & Project Tracking
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Organize tasks into projects, set priorities, track progress, and
            never miss deadlines. Trackpoint keeps everything structured and
            easy to manage.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            Analytics That Matter
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Visualize productivity trends, identify bottlenecks, and make
            data-driven decisions to improve performance across your workflow.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            Secure & Reliable
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Your data is protected with modern security practices. Trackpoint
            ensures reliability, privacy, and peace of mind while you focus on
            your work.
          </p>
        </div>

        <div className="text-center pt-10">
          <a
            href="/pricing"
            className="inline-block bg-black dark:bg-neutral-900 text-white px-10 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition"
          >
            View Pricing
          </a>
        </div>
      </section>
    </div>
  );
};

export default LearnMorePage;
