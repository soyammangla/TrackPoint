"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";

export default function OneTimeCheckout() {
  return (
    <div
      className="
      min-h-screen
      flex items-center justify-center
      px-4 sm:px-6
      bg-gray-50 text-gray-900
      dark:bg-black dark:text-white
    "
    >
      <Card
        className="
          w-full max-w-xl
          rounded-2xl
          border
          bg-white border-gray-200
          dark:bg-zinc-900 dark:border-zinc-800
          shadow-xl
        "
      >
        {/* Header */}
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            TrackPoint Pro Access
          </CardTitle>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            One-time payment • Lifetime access
          </p>

          <div className="text-4xl sm:text-5xl font-bold pt-2">₹499</div>
        </CardHeader>

        <CardContent className="space-y-5 sm:space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-700 dark:text-gray-300">
              Full Name
            </Label>
            <Input
              placeholder="Your name"
              className="
                bg-white text-black border-gray-300
                dark:bg-black dark:text-white dark:border-zinc-700
              "
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-700 dark:text-gray-300">
              Email Address
            </Label>
            <Input
              type="email"
              placeholder="you@example.com"
              className="
                bg-white text-black border-gray-300
                dark:bg-black dark:text-white dark:border-zinc-700
              "
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-700 dark:text-gray-300">
              Phone Number
            </Label>
            <Input
              placeholder="+91 XXXXX XXXXX"
              className="
                bg-white text-black border-gray-300
                dark:bg-black dark:text-white dark:border-zinc-700
              "
            />
          </div>

          {/* Divider */}
          <div
            className="
            flex justify-between items-center
            border-t pt-4 text-sm
            border-gray-200 dark:border-zinc-800
          "
          >
            <span className="text-gray-500 dark:text-gray-400">
              Total Payable
            </span>
            <span className="font-semibold">₹499</span>
          </div>

          {/* CTA */}
          <Button
            className="
              w-full h-12 text-base font-medium
              bg-black text-white hover:bg-zinc-900
              dark:bg-white dark:text-black dark:hover:bg-gray-200
            "
          >
            Pay Once & Get Access
          </Button>

          {/* Trust */}
          <div
            className="
            flex items-center justify-center gap-2
            text-xs
            text-gray-500 dark:text-gray-400
            pt-1
          "
          >
            <ShieldCheck size={14} />
            Secure payment • No subscription • No renewal
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
