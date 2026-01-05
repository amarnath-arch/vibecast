import { UserPlus, ListMusic, ThumbsUp, Play } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create or Join",
    description:
      "Start your own streaming room or join an existing session with a single click.",
  },
  {
    icon: ListMusic,
    step: "02",
    title: "Add to Queue",
    description:
      "Search and add your favorite tracks to the shared playlist. Everyone can contribute.",
  },
  {
    icon: ThumbsUp,
    step: "03",
    title: "Vote & Vibe",
    description:
      "Upvote tracks you love, downvote the rest. The most popular song plays next.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-4">
            Music Democracy in
            <span className="gradient-text"> Three Steps</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            No more fighting over the aux. Let the crowd decide what plays next.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-px bg-gradient-to-r from-border to-transparent z-0" />
              )}

              <div className="glass-card rounded-2xl p-8 h-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10">
                {/* Step number */}
                <span className="text-6xl font-bold text-muted/30 font-display absolute top-4 right-6">
                  {step.step}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="font-display text-xl font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
