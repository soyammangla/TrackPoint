"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BuyPro() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const res = await fetch("/api/get-user");
        if (!res.ok) return;

        const data = await res.json();
        if (data?.email) setEmail(data.email);
      } catch {
        console.log("No active session");
      }
    };

    fetchUserEmail();
  }, []);

  const loadRazorpayScript = () =>
    new Promise<boolean>((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (!email) {
      alert("Email is required");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded) {
        alert("Failed to load Razorpay SDK");
        setLoading(false);
        return;
      }

      const orderRes = await fetch("/api/create-order", {
        method: "POST",
      });

      if (!orderRes.ok) {
        alert("Unable to create order");
        setLoading(false);
        return;
      }

      const order = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "TrackPoint Pro",
        description: "Lifetime Access Plan",

        prefill: {
          email: email,
        },

        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            const data = await verifyRes.json();

            if (!verifyRes.ok || !data?.success) {
              alert(data?.message || "Payment verification failed");
              setLoading(false);
              return;
            }

            alert("Payment Successful 🎉 Plan Activated!");

            window.location.reload();
          } catch (error) {
            console.error(error);
            alert("Verification failed");
            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },

        theme: {
          color: "#000000",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* LEFT */}
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

        <Card className="border-black dark:border-white bg-transparent rounded-xl">
          <CardContent className="p-8 space-y-8">
            <h2 className="text-lg font-medium">Checkout</h2>

            <div>
              <Label>Email address</Label>
              <Input
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay ₹199"}
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
