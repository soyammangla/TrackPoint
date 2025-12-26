"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
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

  const navBg =
    theme === "dark" ? "bg-black text-white" : "bg-white text-black";
  const dropdownBg =
    theme === "dark" ? "bg-black text-white" : "bg-white text-black";

  return (
    <nav
      className={`shadow sticky top-0 z-50 transition-colors duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              Trackpoint
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center space-x-6">
            <div className="relative">
              <button
                onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                className="flex items-center gap-1"
              >
                Product <ChevronDown size={16} />
              </button>
              {productDropdownOpen && (
                <div
                  className={`absolute mt-2 w-56 rounded-md shadow-lg py-2 ${dropdownBg}`}
                >
                  {productLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-2 hover:opacity-80"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/solutions" className="hover:opacity-80">
              Solutions
            </Link>
            <Link href="/pricing" className="hover:opacity-80">
              Pricing
            </Link>
            <Link href="/resources" className="hover:opacity-80">
              Resources
            </Link>
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
                  {theme === "light" ? <Moon /> : <Sun />}
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
                    <span className="hidden md:block">
                      {session.user?.name || "User"}
                    </span>
                    <ChevronDown size={16} />
                  </button>
                  {userDropdownOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg py-2 ${dropdownBg}`}
                    >
                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 rounded-lg bg-black text-white dark:bg-neutral-900 dark:text-white 
             shadow-md hover:shadow-lg 
             transition-colors duration-200 ease-in-out"
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
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2 rounded-md"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/solutions" className="block px-3 py-2 rounded-md">
              Solutions
            </Link>
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
                  {theme === "light" ? <Moon /> : <Sun />}
                </button>
              </div>
            )}
          </div>

          {/* Mobile bottom buttons */}
          <div className="flex justify-between items-center px-4 py-3 border-t">
            {session ? (
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-black text-white dark:bg-neutral-900 dark:text-black rounded-md"
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
