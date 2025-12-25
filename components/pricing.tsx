"use client";

import React from "react";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      features: ["Manage up to 10 clients", "Basic analytics", "Email support"],
      color: "bg-gray-400",
    },
    {
      name: "Pro",
      price: "₹499",
      features: [
        "Manage up to 100 clients",
        "Advanced analytics",
        "Priority email support",
        "Task automation",
      ],
      color: "bg-indigo-500",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "₹999",
      features: [
        "Unlimited clients",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced automations",
      ],
      color: "bg-pink-500",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Pricing Plans
        </h2>
        <p className="text-lg sm:text-xl text-black dark:text-white max-w-2xl mx-auto mb-16">
          One-time payment, no recurring charges. Choose the plan that fits your
          business needs.
        </p>

        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-10 rounded-3xl shadow-xl transform transition-all duration-300 flex flex-col items-center text-center
                ${
                  plan.highlighted
                    ? "bg-indigo-50 dark:bg-indigo-900 scale-105 z-10"
                    : "bg-white dark:bg-gray-800 hover:shadow-2xl hover:-translate-y-2"
                }
              `}
            >
              {plan.highlighted && (
                <span className="absolute -top-5 px-4 py-1 rounded-full bg-indigo-600 text-white text-sm font-semibold shadow-md">
                  Most Popular
                </span>
              )}

              <div
                className={`flex items-center justify-center w-16 h-16 mb-5 rounded-full ${plan.color} bg-gradient-to-br from-indigo-400 to-indigo-600`}
              >
                <span className="text-white font-bold text-lg">
                  {plan.name[0]}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {plan.name}
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {plan.price}
              </p>

              <ul className="text-black dark:text-white mb-8 space-y-3 text-sm sm:text-base">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center justify-center">
                    <span className="mr-2 text-indigo-600 dark:text-indigo-400 font-bold">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`px-8 py-3 rounded-lg font-semibold transition
                  ${
                    plan.highlighted
                      ? "bg-indigo-600 text-white hover:bg-indigo-500"
                      : "bg-gray-800 text-white dark:bg-gray-700 hover:bg-gray-700"
                  }
                `}
              >
                {plan.highlighted ? "Get Pro" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
