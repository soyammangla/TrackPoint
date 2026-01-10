"use client";

import React, { useState } from "react";

const ContactSalesPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact-sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", company: "", message: "" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 text-black dark:text-white min-h-screen">
      {/* ---------------- Hero Section ---------------- */}
      <section className="text-center py-24 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-5">Contact Sales</h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-black dark:text-white">
          Get in touch with our sales team to explore how Trackpoint can help
          streamline tracking, insights, and performance for your organization.
        </p>
      </section>

      {/* ---------------- Form Section ---------------- */}
      <section className="max-w-3xl mx-auto px-4 pb-24">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-neutral-800 p-10 rounded-3xl shadow-lg space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">Work Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@company.com"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block mb-2 font-medium">Company Name</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              placeholder="Your company or organization"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 font-medium">Message</label>
            <textarea
              name="message"
              rows={2}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us about your requirements, team size, or use case..."
              className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full font-semibold text-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black dark:bg-white text-white dark:text-black hover:opacity-90"
            }`}
          >
            {loading ? "Sending Request..." : "Contact Sales"}
          </button>

          {/* Success Message */}
          {success && (
            <p className="text-green-600 text-center mt-4">
              Thank you for reaching out. Our sales team will get back to you
              shortly.
            </p>
          )}
        </form>
      </section>
    </div>
  );
};

export default ContactSalesPage;
