"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CTA() {
  const router = useRouter();
  const { status } = useSession(); // "authenticated" | "unauthenticated" | "loading"

  const handleGetStarted = () => {
    if (status === "authenticated") {
      router.push("/"); // or /dashboard
    } else {
      router.push("/login");
    }
  };

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
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg shadow-md transition"
          >
            Get Started
          </button>

          <a
            href="/learn-more"
            className="px-8 py-4 border border-gray-900 dark:border-slate-700 text-gray-900 dark:text-white font-semibold rounded-lg transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
