"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <nav className="w-full border-b bg-white dark:bg-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold">
          Trackpoint
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <button className="flex items-center gap-1">
            Product <ChevronDown size={16} />
          </button>
          <Link href="#">Solutions</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Resources</Link>

          {/* THEME */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 flex items-center justify-center rounded-full border"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button className="rounded-md bg-black px-4 py-2 text-white dark:bg-white dark:text-black">
            Sign In
          </button>
        </div>

        {/* MOBILE BUTTONS */}
        <div className="flex items-center gap-2 md:hidden">
          {/* THEME */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 flex items-center justify-center rounded-full border"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* HAMBURGER */}
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-black">
          {/* HEADER */}
          <div className="flex items-center justify-between border-b px-4 h-16">
            <span className="text-lg font-bold">Trackpoint</span>
            <button onClick={() => setMobileOpen(false)}>
              <X size={24} />
            </button>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col gap-4 px-4 py-6 overflow-y-auto">
            {/* PRODUCT */}
            <button
              onClick={() => setProductOpen(!productOpen)}
              className="flex items-center justify-between text-left font-medium"
            >
              Product
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  productOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {productOpen && (
              <div className="ml-4 flex flex-col gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                <Link href="#">Lead Management</Link>
                <Link href="#">Sales Pipeline</Link>
                <Link href="#">Workflow Automation</Link>
                <Link href="#">Reports & Analytics</Link>
              </div>
            )}

            <Link href="#" className="font-medium">
              Solutions
            </Link>
            <Link href="#" className="font-medium">
              Pricing
            </Link>
            <Link href="#" className="font-medium">
              Resources
            </Link>

            <button className="mt-4 rounded-md bg-black py-3 text-white dark:bg-white dark:text-black">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
