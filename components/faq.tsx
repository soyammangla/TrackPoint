"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What is Trackpoint CRM?",
      answer:
        "Trackpoint CRM is a modern platform designed to help businesses manage clients, track interactions, and streamline workflows efficiently.",
    },
    {
      question: "Is there a free plan or trial available?",
      answer:
        "Yes! Trackpoint offers a free plan for individuals and small teams, allowing you to manage up to 10 clients and access core CRM features.",
    },
    {
      question: "Can I upgrade or change my plan anytime?",
      answer:
        "Absolutely. You can switch between Free, Pro, or Enterprise plans at any time without losing your data.",
    },
    {
      question: "How secure is my data?",
      answer:
        "Trackpoint uses encrypted data storage, secure authentication, and regular backups to keep your information safe and private.",
    },
    {
      question: "Can I collaborate with my team?",
      answer:
        "Yes. You can invite team members, assign tasks, track client interactions, and collaborate seamlessly within Trackpoint.",
    },
    {
      question: "Do I need technical skills to use Trackpoint?",
      answer:
        "Not at all. Trackpoint is user-friendly and intuitive, so anyone can start managing clients without technical knowledge.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[50%] mx-auto py-12 sm:py-14 md:py-16 bg-white dark:bg-black text-black dark:text-white transition-colors">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-neutral-900 rounded-lg shadow-md overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left font-medium transition-colors"
            >
              <span className="text-base sm:text-lg">{faq.question}</span>
              <span className="text-xl font-bold">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="px-6 pb-4 pt-1 text-black dark:text-white text-sm sm:text-base transition-colors">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
