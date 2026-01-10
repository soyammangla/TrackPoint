"use client";

import React, { useState } from "react";

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(""); // ✅ status message

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      setStatus("Please fill all fields!");
      return;
    }

    setLoading(true);
    setStatus(""); // clear previous status

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (res.ok) {
        setStatus("Message sent successfully 🚀");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("Failed to send message.");
      }
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-gray-50 dark:bg-neutral-900 p-8 rounded-2xl w-full max-w-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mb-4 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        />
        <textarea
          placeholder="Message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-4 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        />

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-3 rounded-full font-semibold text-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black dark:bg-white text-white dark:text-black hover:opacity-90"
          }`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {/* ✅ Status message */}
        {status && (
          <p className="mt-4 text-center text-sm text-green-600 dark:text-green-400">
            {status}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactPage;
