"use client";

import React from "react";

const TermsPage = () => {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      {/* ---------------- Hero Section ---------------- */}
      <section className="text-center py-16 px-4 md:px-8 lg:px-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Terms & Conditions
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          Please read these terms and conditions carefully before using
          Trackpoint. By accessing or using our services, you agree to be bound
          by these terms.
        </p>
      </section>

      {/* ---------------- Terms Content ---------------- */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto space-y-8">
        {[
          {
            title: "Acceptance of Terms",
            description:
              "By accessing or using Trackpoint, you agree to comply with and be bound by these Terms and Conditions.",
          },
          {
            title: "Use of Services",
            description:
              "You agree to use Trackpoint only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the platform.",
          },
          {
            title: "Account Responsibility",
            description:
              "You are responsible for maintaining the confidentiality of your account and password, and for all activities that occur under your account.",
          },
          {
            title: "Content",
            description:
              "All content provided through Trackpoint is for informational purposes only. You agree not to upload or share any content that is illegal, harmful, or infringes on others' rights.",
          },
          {
            title: "Subscription and Payments",
            description:
              "If you subscribe to paid services, you agree to provide accurate payment information and to pay all applicable fees.",
          },
          {
            title: "Limitation of Liability",
            description:
              "Trackpoint is not liable for any direct, indirect, incidental, or consequential damages arising from your use of our services.",
          },
          {
            title: "Changes to Terms",
            description:
              "We may update these Terms and Conditions from time to time. Continued use of Trackpoint constitutes acceptance of any changes.",
          },
          {
            title: "Contact Us",
            description:
              "If you have any questions about these Terms and Conditions, please reach out to us at ",
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
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
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

export default TermsPage;
