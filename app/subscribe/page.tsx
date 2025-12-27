"use client";

import React, { useState } from "react";

const SubscribePage = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    // Simulate subscription success
    setStatus("success");
    setEmail("");
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col justify-center items-center px-4 md:px-0">
      <div className="max-w-lg w-full bg-gray-100 dark:bg-neutral-900 p-10 rounded-2xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Stay Updated
        </h1>
        <p className="text-black dark:text-white text-lg mb-8 text-center">
          Subscribe to our newsletter and get the latest productivity tips and
          updates.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-xl border border-black dark:border-white focus:outline-none focus:ring-2 dark:bg-black dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-black dark:bg-black text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition duration-300"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>

        {status === "success" && (
          <p className="mt-4 text-green-500 text-center">
            Subscribed successfully!
          </p>
        )}
      </div>

      {/* Optional social links below */}
      <div className="mt-12 flex gap-6">
        <a
          href="https://www.linkedin.com/in/soyam-mangla-432b13365/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black dark:text-white transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/soyammangla"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black dark:text-white transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/soyam1134"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black dark:text-white transition-colors"
        >
          Twitter
        </a>
      </div>
    </div>
  );
};

export default SubscribePage;
