"use client";

import React from "react";

export default function CTA() {
  return (
    <section className="bg-white dark:bg-black py-36 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
          Ready to Take Your CRM to the Next Level?
        </h2>

        <p className="text-lg sm:text-xl text-black dark:text-white mb-10">
          Start managing your clients efficiently and grow your business with
          ease.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/login"
            className="px-8 py-4 bg-black dark:bg-neutral-900 text-white font-semibold rounded-lg shadow-md "
          >
            Get Started
          </a>

          <a
            href="/learn-more"
            className="px-8 py-4 border border-gray-900 dark:border-slate-700 text-gray-900 dark:text-white font-semibold rounded-lg"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
