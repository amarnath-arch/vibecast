import {
  Zap,
  Globe,
  Shield,
  Headphones,
  BarChart2,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-time Sync",
    description:
      "Everyone hears the same beat at the same time. Zero latency streaming.",
  },
  {
    icon: Globe,
    title: "Global Rooms",
    description:
      "Create public rooms or private sessions. Connect with music lovers worldwide.",
  },
  {
    icon: Shield,
    title: "Fair Voting",
    description:
      "One vote per user per track. Democracy keeps the playlist balanced.",
  },
  {
    icon: Headphones,
    title: "Premium Audio",
    description:
      "Crystal clear 320kbps streaming. Your music deserves the best quality.",
  },
  {
    icon: BarChart2,
    title: "Live Queue",
    description: "Watch votes update in real-time. See what's coming up next.",
  },
  {
    icon: MessageSquare,
    title: "Room Chat",
    description:
      "React to tracks, share vibes, and connect with fellow listeners.",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Features
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-4">
            Everything You Need to
            <span className="gradient-text"> Stream Together</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Powerful features designed for the ultimate collaborative listening
            experience.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:bg-card"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
