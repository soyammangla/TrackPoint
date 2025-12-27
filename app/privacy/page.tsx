"use client";

import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      {/* ---------------- Hero Section ---------------- */}
      <section className="text-center py-16 px-4 md:px-8 lg:px-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-black dark:text-white text-lg md:text-xl max-w-2xl mx-auto">
          Your privacy is important to us. This policy explains how Trackpoint
          collects, uses, and protects your information.
        </p>
      </section>

      {/* ---------------- Policy Content ---------------- */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto space-y-8">
        {[
          {
            title: "Information Collection",
            description:
              "We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us. This may include your name, email address, and any other information you choose to provide.",
          },
          {
            title: "How We Use Information",
            description:
              "We use the information to provide and improve our services, communicate with you, send updates and promotional content, and ensure a secure experience on Trackpoint.",
          },
          {
            title: "Cookies & Tracking",
            description:
              "Trackpoint may use cookies and similar tracking technologies to enhance user experience, analyze usage patterns, and personalize content.",
          },
          {
            title: "Data Security",
            description:
              "We implement security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.",
          },
          {
            title: "Third-Party Services",
            description:
              "We may share information with third-party service providers who assist in delivering our services, such as email providers and analytics platforms.",
          },
          {
            title: "Your Rights",
            description:
              "You have the right to access, update, or delete your personal information. You can manage your preferences or contact us for assistance.",
          },
          {
            title: "Contact Us",
            description:
              "If you have any questions or concerns about this Privacy Policy, please reach out to us at ",
            linkText: "soyammangla15@gmail.com",
            linkHref: "mailto:soyammangla15@gmail.com",
          },
        ].map((section, idx) => (
          <div
            key={idx}
            className="p-6 md:p-8 bg-gray-50 dark:bg-neutral-900 rounded-2xl shadow-sm md:shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              {section.title}
            </h2>
            <p className="text-black dark:text-white text-base md:text-lg">
              {section.description}
              {section.linkText && (
                <a
                  href={section.linkHref}
                  className="underline text-indigo-600 dark:text-indigo-400 ml-1 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
                >
                  {section.linkText}
                </a>
              )}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
