"use client";

import React from "react";

export default function CTA() {
  return (
    <section className="bg-white dark:bg-gray-900 py-24 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Ready to Take Your CRM to the Next Level?
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8">
          Start managing your clients efficiently and grow your business with
          ease.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="#get-started"
            className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 transition"
          >
            Get Started
          </a>
          <a
            href="#learn-more"
            className="px-8 py-4 border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
