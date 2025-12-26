"use client";

export default function Testimonials() {
  const sampleTestimonials = [
    {
      name: "Rohit Sharma",
      feedback:
        "Trackpoint CRM has completely transformed how we manage clients. It’s intuitive, efficient, and the analytics dashboard is extremely helpful.",
    },
    {
      name: "Anjali Mehta",
      feedback:
        "As a small business owner, Trackpoint allowed me to streamline lead tracking and follow-ups effortlessly. Highly recommended!",
    },
    {
      name: "Vikram Singh",
      feedback:
        "The team collaboration features are excellent. Assigning tasks, tracking progress, and communicating with the team is seamless.",
    },
    {
      name: "Priya Kapoor",
      feedback:
        "I love the clean and intuitive interface. No technical skills required, and managing clients has never been easier.",
    },
  ];

  return (
    <section className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] mx-auto py-16 bg-gray-50 dark:bg-black text-black dark:text-white transition-colors">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        What Our Users Say
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {sampleTestimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-black rounded-xl shadow-md dark:shadow-gray-700 p-8 flex flex-col justify-between transition-all hover:shadow-lg"
          >
            {/* Quote with professional style */}
            <p className="text-gray-800 dark:text-white italic text-base sm:text-lg mb-4 relative pl-6 before:content-['“'] before:text-4xl before:absolute before:-top-2 before:left-0">
              {t.feedback}
            </p>

            {/* Name */}
            <span className="mt-auto font-semibold text-gray-900 dark:text-white">
              — {t.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
