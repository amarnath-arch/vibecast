import { Music } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
      {/* <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
      linear-gradient(var(--color-foreground) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)
    `,
          backgroundSize: "50px 50px",
          opacity: 0.15,
        }}
      /> */}

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">
            Real-time collaborative streaming
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          Stream Together,
          <br />
          <span className="gradient-text">Vote the Vibe</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Join rooms where everyone shapes the playlist. Add tracks, vote for
          your favorites, and let the crowd decide what plays next.
        </p>
      </div>

      {/* Floating music icons */}
      <div className="absolute bottom-20 left-10 animate-float opacity-20">
        <Music className="w-12 h-12 text-primary" />
      </div>
      <div
        className="absolute top-32 right-16 animate-float opacity-20"
        style={{ animationDelay: "1s" }}
      >
        <Music className="w-8 h-8 text-secondary" />
      </div>
    </section>
  );
};

export default Hero;
