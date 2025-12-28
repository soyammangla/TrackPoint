"use client";

import React from "react";

// ---------------- FAQ Card Component ----------------
interface FAQCardProps {
  question: string;
  answer: React.ReactNode; // allow JSX for links
}

const FAQCard: React.FC<FAQCardProps> = ({ question, answer }) => {
  return (
    <div className="p-6 md:p-8 bg-gray-50 dark:bg-neutral-900 rounded-2xl shadow-sm md:shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
        {question}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
        {answer}
      </p>
    </div>
  );
};

// ---------------- Main Help Center Page ----------------
const HelpCenterPage = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "Click on the 'Sign Up' button in the top right corner and follow the steps.",
    },
    {
      question: "I forgot my password. What should I do?",
      answer:
        "Go to the login page and click 'Forgot Password' to reset your password.",
    },
    {
      question: "How can I subscribe to the newsletter?",
      answer: "You can subscribe from our ",
      linkText: "Blog page",
      linkHref: "/blog",
    },
    {
      question: "Where can I find the Privacy Policy?",
      answer: "You can view our privacy policy here: ",
      linkText: "Privacy Policy",
      linkHref: "/privacy",
    },
    {
      question: "Who can I contact for support?",
      answer: "Email us at ",
      linkText: "soyammangla15@gmail.com",
      linkHref: "mailto:soyammangla15@gmail.com",
    },
  ];

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      {/* ---------------- Hero Section ---------------- */}
      <section className="text-center py-16 px-4 md:px-8 lg:px-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Help Center</h1>
        <p className="text-black dark:text-white text-lg md:text-xl max-w-2xl mx-auto">
          Find answers to common questions and get help with Trackpoint.
        </p>
      </section>

      {/* ---------------- FAQ Grid ---------------- */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {faqs.map((faq, idx) => (
            <FAQCard
              key={idx}
              question={faq.question}
              answer={
                faq.linkText ? (
                  <>
                    {faq.answer}{" "}
                    <a
                      href={faq.linkHref}
                      className="underline text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
                      target={
                        faq.linkHref.startsWith("http") ? "_blank" : "_self"
                      }
                      rel={
                        faq.linkHref.startsWith("http")
                          ? "noopener noreferrer"
                          : ""
                      }
                    >
                      {faq.linkText}
                    </a>
                  </>
                ) : (
                  faq.answer
                )
              }
            />
          ))}
        </div>
      </section>

      {/* ---------------- CTA Section ---------------- */}
      <section className="py-16 px-4 md:px-8 lg:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Still have questions?
        </h2>
        <p className="text-black dark:text-white text-lg mb-8">
          Contact our support team for assistance.
        </p>
        <a
          href="mailto:soyammangla15@gmail.com"
          className="bg-black dark:bg-neutral-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition duration-300"
        >
          Contact Support
        </a>
      </section>
    </div>
  );
};

export default HelpCenterPage;
