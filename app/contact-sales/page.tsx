"use client";

import React, { useState } from "react";

const ContactSalesPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We will contact you soon.");
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <div className="bg-white dark:bg-neutral-900 text-black dark:text-white min-h-screen">
      {/* ---------------- Hero Section ---------------- */}
      <section className="text-center py-20 px-4 md:px-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Contact Sales</h1>
        <p className="text-black dark:text-white max-w-2xl mx-auto text-lg md:text-xl">
          Have questions? Our team is here to help you choose the right plan for
          your business.
        </p>
      </section>

      {/* ---------------- Contact Form ---------------- */}
      <section className="max-w-3xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        <form
          className="bg-white dark:bg-neutral-800 p-10 rounded-3xl shadow-lg space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block mb-2 font-semibold text-gray-900 dark:text-gray-200">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-900 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-900 dark:text-gray-200">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              placeholder="Your Company Name"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-900 dark:text-gray-200">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              placeholder="Write your message here..."
              className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-semibold text-lg hover:opacity-90 transition duration-300"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactSalesPage;
