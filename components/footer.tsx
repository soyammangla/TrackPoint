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
          <p className="mt-3 text-sm text-black dark:text-white">
            Plan Smarter. Work Better. <br />
            Helping you manage clients, tasks, and projects efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:ml-auto">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-black dark:text-white">
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
          <ul className="space-y-2 text-black dark:text-white   ">
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

        {/* Social Media + Status */}
        <div className="md:ml-auto">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>

          <div className="flex justify-center sm:justify-start space-x-4 text-xl mb-2">
            <a
              href="https://twitter.com/soyam1134"
              target="_blank"
              rel="noopener noreferrer"
              // className="hover:text-indigo-500 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://github.com/soyammangla"
              target="_blank"
              rel="noopener noreferrer"
              // className="hover:text-indigo-500 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/soyam-mangla-432b13365/"
              target="_blank"
              rel="noopener noreferrer"
              // className="hover:text-indigo-500 transition"
            >
              <FaLinkedin />
            </a>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 justify-center sm:justify-start mt-14">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="text-sm text-black dark:text-white">
              All systems operational
            </span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300 dark:border-slate-800 mt-10 pt-6 text-center text-sm flex flex-row items-center justify-center gap-2 text-black dark:text-white">
        <span>Made with</span>
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.5 }}
          className="inline-flex"
        >
          <IoIosHeart className="text-red-500 text-lg cursor-pointer" />
        </motion.span>
        <span>
          by{" "}
          <Link
            href="https://twitter.com/Trackpoint"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-semibold text-black dark:text-white cursor-pointer hover:underline">
              Trackpoint Team
            </span>
          </Link>
          .
        </span>
      </div>
    </footer>
  );
};

export default Footer;
