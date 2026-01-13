"use client";

import React from "react";
import { Check, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Pricing() {
  const { data: session } = useSession();
  const router = useRouter();

  const handlePlanClick = (link = "/") => {
    if (!session) {
      router.push("/login");
    } else {
      router.push(link);
    }
  };

  const plans = [
    {
      name: "Free",
      description: "Best for individuals getting started.",
      price: "₹0",
      duration: "/ free",
      features: [
        "Manage up to 10 clients",
        "Basic analytics",
        "Email support",
        "Core CRM features",
      ],
      buttonText: "Get Started Free",
      link: "/",
      highlighted: false,
    },
    {
      name: "Pro",
      description: "Perfect for growing teams & businesses.",
      price: "₹499",
      duration: "/ one-time",
      features: [
        "Manage up to 500 clients",
        "Advanced analytics",
        "Priority email support",
        "Task automation",
        "Team collaboration",
      ],
      buttonText: "Buy Pro",
      link: "/",
      highlighted: true,
    },
    {
      name: "Enterprise",
      description: "For large teams with custom needs.",
      price: "₹999",
      duration: "/ one-time",
      features: [
        "Unlimited clients",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced automations",
        "Premium support",
      ],
      buttonText: "Contact Sales",
      link: "/contact-sales",
      highlighted: false,
    },
  ];

  return (
    <section className="flex min-h-screen items-center justify-center py-20 bg-gray-50 dark:bg-black px-6">
      <div className="w-full max-w-6xl space-y-14">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
            Trackpoint Pricing Plans
          </h2>
          <p className="text-black dark:text-white max-w-2xl mx-auto">
            Simple, transparent pricing. Pay once and use forever.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-2xl border transition 
                ${
                  plan.highlighted
                    ? "bg-white dark:bg-black border-black dark:border-white scale-[1.03]"
                    : "bg-white dark:bg-black border-gray-200 dark:border-gray-800"
                }
              `}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs bg-white dark:bg-black">
                  <Star className="h-3 w-3 fill-current text-green-700" />
                  Popular
                </div>
              )}

              {/* Header */}
              <div className="rounded-t-2xl border-b p-6 bg-gray-50 dark:bg-black">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-sm text-black dark:text-white mt-1">
                  {plan.description}
                </p>

                <div className="mt-4 flex items-end gap-1">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-sm text-black dark:text-white">
                    {plan.duration}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-800"></div>

              {/* Features */}
              <div className="flex-1 px-6 py-6 space-y-4 text-sm text-black dark:text-white">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-700" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <div className="border-t p-4">
                <button
                  onClick={() => handlePlanClick(plan.link)}
                  className={`w-full rounded-md py-2.5 text-sm font-semibold transition
                    ${
                      plan.highlighted
                        ? "bg-neutral-900 text-white"
                        : "border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                    }
                  `}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
