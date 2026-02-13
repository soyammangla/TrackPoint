"use client";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rohit Sharma",
      role: "Sales Manager",
      feedback:
        "TrackPoint CRM streamlined our lead management. The dashboard keeps our team aligned and helps us close deals faster.",
    },
    {
      name: "Anjali Mehta",
      role: "Small Business Owner",
      feedback:
        "Everything from clients to follow-ups is organized in one place. It saves me hours every single week.",
    },
    {
      name: "Vikram Singh",
      role: "Operations Lead",
      feedback:
        "Team collaboration improved instantly. Assigning leads and tracking progress is now smooth and transparent.",
    },
    {
      name: "Priya Kapoor",
      role: "Marketing Consultant",
      feedback:
        "The interface is clean and intuitive. Even new team members adapt without any training.",
    },
  ];

  return (
    <section className="w-full py-20 md:py-28 px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            Trusted by Growing Businesses
          </h2>
          <p className="text-xl text-black dark:text-white max-w-2xl mx-auto">
            See what professionals are saying about using TrackPoint CRM.
          </p>
        </div>

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
