import { Button } from "@/components/ui/button";
import { ArrowRight, Headphones } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="glass-card rounded-3xl p-8 md:p-12 text-center gradient-border glow">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-8">
            <Headphones className="w-8 h-8 text-background" />
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Ready to
            <span className="gradient-text"> Change the Game?</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Join thousands of music lovers who've already discovered the joy of
            streaming together. Your next favorite song is waiting.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="secondary" size="lg">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground">
              No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
