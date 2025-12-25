"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="text-2xl font-semibold tracking-tight text-black dark:text-white">
          Track
          <span className="text-indigo-600 dark:text-indigo-400">point</span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10 text-base font-medium text-black dark:text-white">
          {/* Product Dropdown */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1"
            >
              Product
              <span
                className={`text-sm transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {open && (
              <div
                className="absolute left-1/2 top-12 -translate-x-1/2 w-64 rounded-xl
                              border border-slate-200 dark:border-slate-800
                              bg-white dark:bg-slate-900 shadow-xl p-5"
              >
                <ul className="space-y-3 text-base text-black dark:text-white">
                  <li>Lead Management</li>
                  <li>Sales Pipeline</li>
                  <li>Workflow Automation</li>
                  <li>Reports & Analytics</li>
                </ul>
              </div>
            )}
          </div>

          <a>Solutions</a>
          <a>Pricing</a>
          <a>Resources</a>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 rounded-full border flex items-center justify-center
                       border-slate-300 dark:border-slate-700"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 text-black dark:text-white">
          <button
            className="
    hidden md:block
    px-4 py-2
    text-base font-medium
    rounded-md
    bg-black text-white
    dark:bg-white dark:text-black
  "
          >
            Login
          </button>

          {/* HAMBURGER */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1"
          >
            <span className="w-6 h-0.5 bg-black dark:bg-white"></span>
            <span className="w-6 h-0.5 bg-black dark:bg-white"></span>
            <span className="w-6 h-0.5 bg-black dark:bg-white"></span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-6 py-6 space-y-4 text-base text-black dark:text-white">
          <a className="block">Product</a>
          <a className="block">Solutions</a>
          <a className="block">Pricing</a>
          <a className="block">Resources</a>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-2"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button className="pt-2 text-left font-medium">Login</button>
        </div>
      )}
    </nav>
  );
}
