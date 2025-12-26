"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-6 transition-colors">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
        {/* LOGO / TITLE */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-black dark:text-white">
            Sign in to Trackpoint
          </h1>
          <p className="mt-2 text-sm text-black dark:text-white">
            Secure access to your CRM workspace
          </p>
        </div>

        {/* GOOGLE BUTTON */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-slate-300 dark:border-slate-700 py-3 text-sm font-medium text-black dark:text-white"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* INFO TEXT */}
        <p className="mt-6 text-center text-xs text-black dark:text-white leading-relaxed">
          By continuing, you agree to Trackpoint’s Terms of Service and Privacy
          Policy.
        </p>

        {/* FOOTER NOTE */}
        {/* <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Access is currently invite-only.
          <br />
          <span className="text-black dark:text-white font-medium">
            Contact admin if you need access.
          </span>
        </p> */}
      </div>
    </div>
  );
}
