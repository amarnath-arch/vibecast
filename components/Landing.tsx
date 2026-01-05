import CTA from "./CTA";
import Features from "./Features";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Navbar from "./Navbar";
import QueuePreview from "./QueuePreview";
import Redirect from "./Redirect";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <QueuePreview />
      <CTA />
      <Redirect />
    </div>
  );
}
