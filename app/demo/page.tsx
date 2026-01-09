"use client";

import { useState, useEffect } from "react";
import { Play, Image as ImageIcon, ArrowRight, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function DemoPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme(); // resolvedTheme = actual current theme
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleCTA = () => {
    if (session) {
      router.push("/"); // homepage
    } else {
      router.push("/login");
    }
  };

  if (!mounted) return null; // avoid hydration issues

  // Determine initial theme: use resolvedTheme which matches current system/localStorage
  const currentTheme = resolvedTheme || "light";

  return (
    <div
      className={`min-h-screen px-6 py-16 transition-colors duration-300 ${
        currentTheme === "light"
          ? "bg-white text-black"
          : "bg-neutral-950 text-white"
      }`}
    >
      {/* TOP BAR: Dark/Light Toggle */}

      {/* TOP CONTENT */}
      <div className="max-w-5xl mx-auto text-center space-y-5">
        <span className="inline-block rounded-full border px-4 py-1 text-sm font-medium">
          Product Demo
        </span>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          See <span className="font-bold">TrackPoint</span> in Action
        </h1>

        <p className="text-lg max-w-3xl mx-auto">
          Get a quick walkthrough of how TrackPoint helps you manage leads,
          automate workflows, and track revenue — without signing up.
        </p>
      </div>

      {/* MEDIA SECTION */}
      <div className="max-w-5xl mx-auto mt-14">
        <div
          className="group relative rounded-2xl border border-dashed overflow-hidden shadow-md transition-shadow hover:shadow-xl
          dark:border-gray-700 dark:bg-neutral-900 bg-gray-50"
        >
          <div className="aspect-video flex flex-col items-center justify-center gap-6 p-6">
            {/* DEMO VIDEO */}
            <div className="w-full mt-4">
              <video
                controls
                className="w-full h-full object-cover rounded-2xl shadow-lg transition-all duration-300"
                poster="/demo-poster.jpg"
              >
                <source src="/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto mt-14 flex justify-center">
        <Button size="lg" className="gap-2" onClick={handleCTA}>
          {session ? "Go to Homepage" : "Start Free Trial"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
