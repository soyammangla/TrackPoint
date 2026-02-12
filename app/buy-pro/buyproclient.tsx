"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BuyPro() {
  const [method, setMethod] = useState<"card" | "upi">("card");

  const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      // 1️Create order on backend
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 199 }), // ₹199
      });
      const order = await orderRes.json();

      // 2️Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: "TrackPoint Pro",
        description: "One-time payment for TrackPoint Pro",
        order_id: order.id,
        handler: async function (response: any) {
          // 3️Verify payment
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const data = await verifyRes.json();
          if (data.success) {
            alert("Payment Successful! Thank you.");
          } else {
            alert("Payment Failed. Please try again.");
          }
        },
        theme: { color: "#000000" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while creating the order.");
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* LEFT – PRODUCT INFO */}
        <section className="flex flex-col justify-center">
          <span className="text-lg font-bold uppercase tracking-wide mb-3">
            TrackPoint Pro
          </span>

          <h1 className="text-4xl font-semibold leading-tight mb-5">
            Advanced tracking and analytics - one-time access
          </h1>

          <p className="text-sm max-w-md mb-10">
            TrackPoint Pro gives you professional-grade tracking and actionable
            analytics to understand performance and user behavior. Pay once and
            get lifetime access with no recurring fees.
          </p>

          <ul className="space-y-3 text-sm">
            <li>• Manage up to 500 clients</li>
            <li>• Advanced analytics</li>
            <li>• Graphical dashboards</li>
            <li>• Team collaboration</li>
            <li>• Priority email support</li>
          </ul>

          <div className="mt-12 border border-black dark:border-white px-6 py-4 w-fit">
            <div className="text-3xl font-semibold">₹199</div>
            <div className="text-xs mt-1">
              One-time payment · Lifetime access
            </div>
          </div>
        </section>

        {/* RIGHT – CHECKOUT */}
        <Card className="border-black dark:border-white bg-transparent rounded-xl">
          <CardContent className="p-8 space-y-8">
            <h2 className="text-lg font-medium">Checkout</h2>

            <div>
              <Label className="mb-4">Email address</Label>
              <Input
                placeholder="you@company.com"
                className="text-black dark:text-white"
              />
            </div>

            {/* Payment Method */}
            <div>
              <Label className="mb-4">Payment method</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={() => setMethod("card")}
                  className={`py-2 text-sm border transition ${
                    method === "card"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "border-black dark:border-white"
                  }`}
                >
                  Card
                </button>

                <button
                  onClick={() => setMethod("upi")}
                  className={`py-2 text-sm border transition ${
                    method === "upi"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "border-black dark:border-white"
                  }`}
                >
                  UPI
                </button>
              </div>
            </div>

            {method === "card" && (
              <>
                <div>
                  <Label className="mb-4">Card number</Label>
                  <Input
                    placeholder="1234 1234 1234 1234"
                    className="text-black dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="MM / YY"
                    className="text-black dark:text-white"
                  />
                  <Input
                    placeholder="CVC"
                    className="text-black dark:text-white"
                  />
                </div>

                <Input
                  placeholder="Cardholder name"
                  className="text-black dark:text-white"
                />
              </>
            )}

            {method === "upi" && (
              <div>
                <Label className="mb-4">UPI ID</Label>
                <Input
                  placeholder="name@upi"
                  className="text-black dark:text-white"
                />
              </div>
            )}

            <div>
              <Label className="mb-4">Billing country</Label>
              <Input
                value="India"
                disabled
                className="text-black dark:text-white"
              />
            </div>

            <div className="border-t border-black dark:border-white pt-5 text-sm">
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-medium">₹199</span>
              </div>
              <p className="text-xs mt-2">
                One-time payment. No subscriptions or recurring charges.
              </p>
            </div>

            <Button
              className="w-full bg-black text-white dark:bg-white dark:text-black h-12 text-base"
              onClick={handlePayment}
            >
              Pay ₹199
            </Button>

            <p className="text-xs text-center leading-relaxed">
              Secure checkout. Payments supported in India only.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
