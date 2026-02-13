"use client";

import React from "react";
import Link from "next/link";

const BlogCard = ({ title = "", summary = "", date = "", link = "#" }) => {
  return (
    <a
      href={link}
      className="flex flex-col justify-between p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
    >
      <div>
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-black dark:text-white">
          {title}
        </h3>
        <p className="text-black dark:text-white mb-4">{summary}</p>
      </div>
      <p className="text-sm text-black dark:text-white">{date}</p>
    </a>
  );
};

const BlogPage = () => {
  const blogPosts = [
    {
      title: "Boost Productivity with Smart Tracking",
      summary:
        "Learn how Trackpoint's features help you stay on top of tasks and projects.",
      date: "Dec 20, 2025",
      link: "#",
    },
    {
      title: "Time Management Tips for Remote Teams",
      summary:
        "Optimize your workflow and improve efficiency in remote work environments.",
      date: "Dec 15, 2025",
      link: "#",
    },
    {
      title: "Data Security in Modern Productivity Apps",
      summary:
        "Keep your information safe while using Trackpoint and other SaaS tools.",
      date: "Dec 10, 2025",
      link: "#",
    },
    {
      title: "Analyzing Productivity with Analytics",
      summary:
        "How Trackpoint helps you measure progress and make informed decisions.",
      date: "Dec 5, 2025",
      link: "#",
    },
  ];

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      <section className="text-center py-16 px-4 md:px-8 lg:px-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Trackpoint Blog</h1>
        <p className="text-black dark:text-white text-lg md:text-xl max-w-2xl mx-auto">
          Insights, tips, and news to help you boost productivity and optimize
          your work.
        </p>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <BlogCard
              key={idx}
              title={post.title}
              summary={post.summary}
              date={post.date}
              link={post.link}
            />
          ))}
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Want to stay updated?
        </h2>
        <p className="text-black dark:text-white text-lg mb-8">
          Subscribe to our newsletter for the latest productivity tips and
          updates.
        </p>
        <Link href="/subscribe">
          <button className="bg-black dark:bg-neutral-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition duration-300">
            Subscribe
          </button>
        </Link>
      </section>
    </div>
  );
};

export default BlogPage;
