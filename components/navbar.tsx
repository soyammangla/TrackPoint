"use client";

import { useState, useEffect, useRef } from "react";
import ProtectedLink from "@/components/protectedlink";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { data: session } = useSession();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const productLinks = [
    { name: "Lead Management", href: "/product/lead-management" },
    { name: "Sales Pipeline", href: "/product/sales-pipeline" },
    { name: "Workflow Automation", href: "/product/workflow-automation" },
    { name: "Reports & Analytics", href: "/product/reports-analytics" },
  ];

  // ------------------- Mounted & Click Outside -------------------
  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
        setProductDropdownOpen(false);
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ------------------- Hydration-safe navBg -------------------
  const [navBg, setNavBg] = useState("bg-white text-black"); // SSR fallback
  useEffect(() => {
    if (mounted) {
      setNavBg(
        resolvedTheme === "dark" ? "bg-black text-white" : "bg-white text-black"
      );
    }
  }, [mounted, resolvedTheme]);

  const dropdownBg = mounted
    ? resolvedTheme === "dark"
      ? "bg-black text-white"
      : "bg-white text-black"
    : "bg-white text-black";

  return (
    <nav
      className={`shadow sticky top-0 z-50 transition-colors duration-300 ${navBg}`}
    >
      <div className="max-w-[1342px] mx-auto px-8 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-0">
              <img
                src="/logo-dark.jpg"
                alt="TrackPoint Logo"
                className="h-14 w-18 block dark:hidden -mr-3.5 mt-1"
              />
              <img
                src="/logo-light.png"
                alt="TrackPoint Logo"
                className="h-14 w-18 hidden dark:block -mr-3.5 mt-1"
              />
              <span className="text-xl font-bold text-black dark:text-white relative top-1">
                TrackPoint
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center space-x-6">
            {/* Product Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1">
                Product
                <ChevronDown
                  size={16}
                  className="transition-transform duration-300 ease-in-out group-hover:rotate-180"
                />
              </button>

              {/* Dropdown — hidden by default, show on hover */}
              <div
                className={`absolute mt-2 w-56 rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ${dropdownBg}`}
              >
                {productLinks.map((link) => (
                  <ProtectedLink
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-2 transition-colors"
                  >
                    {link.name}
                  </ProtectedLink>
                ))}
              </div>
            </div>

            <ProtectedLink href="/dashboard">Dashboard</ProtectedLink>
            <Link href="/pricing">Pricing</Link>
            <Link href="/resources">Resources</Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Desktop only buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  {resolvedTheme === "light" ? <Moon /> : <Sun />}
                </button>
              )}

              {/* Auth */}
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 border px-2 py-1 rounded-full"
                  >
                    <img
                      src={session.user?.image || "/default-avatar.png"}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    {/* <span className="hidden md:block">
                      {session.user?.name || "User"}
                    </span> */}
                    <ChevronDown size={16} />
                  </button>
                  {userDropdownOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg py-2 ${dropdownBg}`}
                    >
                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black transition-colors duration-200"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 bg-black text-white dark:bg-neutral-900 dark:text-white rounded-md"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className={`md:hidden border-t py-2 ${navBg}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Product Links */}
            <button
              onClick={() => setProductDropdownOpen(!productDropdownOpen)}
              className="flex w-full justify-between items-center px-3 py-2 rounded-md"
            >
              Product <ChevronDown size={16} />
            </button>
            {productDropdownOpen && (
              <div className="pl-4 space-y-1">
                {productLinks.map((link) => (
                  <ProtectedLink
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2 rounded-md"
                  >
                    {link.name}
                  </ProtectedLink>
                ))}
              </div>
            )}

            <ProtectedLink
              href="/dashboard"
              className="block px-3 py-2 rounded-md"
            >
              Dashboard
            </ProtectedLink>
            <Link href="/pricing" className="block px-3 py-2 rounded-md">
              Pricing
            </Link>
            <Link href="/resources" className="block px-3 py-2 rounded-md">
              Resources
            </Link>

            {/* Mobile Theme Toggle */}
            {mounted && (
              <div className="flex justify-left px-3 py-1">
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  {resolvedTheme === "light" ? <Moon /> : <Sun />}
                </button>
              </div>
            )}
          </div>

          {/* Mobile bottom buttons */}
          <div className="flex justify-between items-center px-4 py-3 border-t">
            {session ? (
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-black text-white dark:bg-neutral-900 dark:text-white rounded-md"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-black text-white dark:bg-neutral-900 dark:text-white rounded-md"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
