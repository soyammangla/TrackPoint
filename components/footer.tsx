"use client";
import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 py-10 mt-16">
      <div className="w-[90%] sm:w-[85%] md:w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">Trackpoint</h2>
          <p className="mt-3 text-sm">
            Plan Smarter. Work Better. <br />
            Helping you manage clients, tasks, and projects efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:ml-auto">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/features">Features</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="md:ml-auto">
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/help">Help Center</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="md:ml-auto">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center sm:justify-start space-x-4 text-xl">
            <a
              href="https://twitter.com/trackpoint"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://github.com/trackpoint"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/company/trackpoint/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-6 text-center text-sm flex flex-row sm:flex-row items-center justify-center gap-2">
        <span>Made with</span>
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.5 }}
          className="inline-flex"
        >
          <IoIosHeart className="text-red-500 text-lg cursor-pointer" />
        </motion.span>
        <span>
          by <span className="font-semibold">Trackpoint Team</span>.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
