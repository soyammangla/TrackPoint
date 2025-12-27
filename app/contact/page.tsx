"use client";

import React from "react";

// ---------------- Contact Input Component ----------------
type InputFieldProps = {
  label: string;
  type?: string;
  placeholder: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="flex flex-col mb-6">
      <label className="mb-2 font-semibold text-black dark:text-white">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition duration-300"
      />
    </div>
  );
};

// ---------------- Contact TextArea Component ----------------
type TextAreaFieldProps = {
  label: string;
  placeholder: string;
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  placeholder,
}) => {
  return (
    <div className="flex flex-col mb-6">
      <label className="mb-2 font-semibold text-gray-900 dark:text-white">
        {label}
      </label>
      <textarea
        rows={3}
        placeholder={placeholder}
        className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition duration-300"
      />
    </div>
  );
};

// ---------------- Main Contact Page ----------------
const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }

    alert("Message sent successfully 🚀");
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 md:px-8 lg:px-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-black dark:text-white text-lg md:text-xl max-w-2xl mx-auto">
          We’d love to hear from you! Fill out the form below and we’ll get back
          to you as soon as possible.
        </p>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto bg-gray-50 dark:bg-neutral-900 rounded-2xl shadow-md p-8 md:p-12">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <InputField label="Full Name" placeholder="Enter your full name" />
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
            <InputField label="Subject" placeholder="Subject of your message" />
            <TextAreaField
              label="Message"
              placeholder="Write your message here..."
            />

            <button
              type="submit"
              className="mt-4 bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
