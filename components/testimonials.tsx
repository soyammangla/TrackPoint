"use client";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rohit Sharma",
      role: "Sales Manager",
      feedback:
        "TrackPoint CRM has made lead management simple. The dashboard helps our team stay organized and close deals faster.",
    },
    {
      name: "Anjali Mehta",
      role: "Small Business Owner",
      feedback:
        "Managing clients and follow-ups is now effortless. TrackPoint keeps everything in one place and saves me hours every week.",
    },
    {
      name: "Vikram Singh",
      role: "Operations Lead",
      feedback:
        "Our team collaboration improved a lot. Assigning leads, tracking progress, and staying aligned is now very easy.",
    },
    {
      name: "Priya Kapoor",
      role: "Marketing Consultant",
      feedback:
        "The clean interface makes it easy for anyone to use. Even new team members can start working without training.",
    },
  ];

  return (
    <section className="w-full py-20 md:py-28 px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            Trusted by Growing Businesses
          </h2>
          <p className="text-xl text-black dark:text-white max-w-2xl mx-auto">
            See what professionals are saying about using TrackPoint CRM.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border bg-card p-10 transition-all duration-300 hover:shadow-lg hover:border-border/70"
            >
              <p className="text-sm text-black dark:text-white leading-relaxed mb-8">
                “{t.feedback}”
              </p>

              <div>
                <p className="text-lg font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-black dark:text-white">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
