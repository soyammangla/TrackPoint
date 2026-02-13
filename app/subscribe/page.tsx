"use client";

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SubscribePage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("Subscribed successfully! Check your email ✅");
        setEmail("");
      } else {
        const data = await res.json();
        toast.error("Error: " + data.error);
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col justify-center items-center px-4 md:px-0">
      <Toaster position="top-right" />

      <div className="max-w-lg w-full bg-gray-100 dark:bg-neutral-900 p-10 rounded-2xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Subscribe to Trackpoint Updates
        </h1>
        <p className="text-black dark:text-white text-lg mb-8 text-center">
          Enter your email to receive all the latest updates, tips, and news
          from Trackpoint.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-xl border border-black dark:border-white focus:outline-none focus:ring-2 dark:bg-black dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition duration-300 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>

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
