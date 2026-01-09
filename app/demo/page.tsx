"use client";

import { Play, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DemoPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleCTA = () => {
    if (session) {
      router.push("/"); // homepage
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white px-6 py-16">
      {/* TOP CONTENT */}
      <div className="max-w-5xl mx-auto text-center space-y-5">
        <span className="inline-block rounded-full border px-4 py-1 text-sm text-black dark:text-white ">
          Product Demo
        </span>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          See <span className="text-black dark:text-white">TrackPoint</span> in
          Action
        </h1>

        <p className="text-lg text-black dark:text-white max-w-3xl mx-auto">
          Get a quick walkthrough of how TrackPoint helps you manage leads,
          automate workflows, and track revenue — without signing up.
        </p>
      </div>

      {/* MEDIA SECTION */}
      <div className="max-w-5xl mx-auto mt-14">
        <div className="group relative rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 overflow-hidden">
          {/* PLACEHOLDER */}
          <div className="aspect-video flex flex-col items-center justify-center gap-4">
            <div className="flex gap-4">
              <div className="p-3 rounded-full bg-white dark:bg-neutral-800">
                <Play className="h-7 w-7 opacity-70" />
              </div>
              <div className="p-3 rounded-full bg-white dark:bg-neutral-800">
                <ImageIcon className="h-7 w-7 opacity-70" />
              </div>
            </div>

            <p className="text-sm opacity-70 text-center max-w-md">
              Add your demo video or product screenshots here.
            </p>

            <Button variant="outline" className="gap-2">
              Add Demo Media
              <ArrowRight className="h-4 w-4" />
            </Button>

            {/* 
              🔹 VIDEO EXAMPLE:
              Replace the above placeholder div with this when ready:

              <video controls className="w-full h-full object-cover rounded-2xl">
                <source src="/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              🔹 IMAGE EXAMPLE:
              Or replace with an image:
              
              <img
                src="/demo.png"
                alt="TrackPoint Demo"
                className="w-full h-full object-cover rounded-2xl"
              />
            */}
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
