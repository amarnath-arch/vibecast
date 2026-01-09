"use client";
import { Radio, Users, Share2, Music2 } from "lucide-react";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

interface DashboardHeaderProps {
  listenerCount: number;
}

export const DashboardHeader = ({ listenerCount }: DashboardHeaderProps) => {
  const session = useSession();
  const loggedIn = session.data?.user;

  const handleShare = async () => {
    const sharableLink = `${window.location.host}/creator/${session?.data?.user?.id}`;
    await navigator.clipboard.writeText(sharableLink);
    alert("Link Copied");
  };

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        {/* <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-sm">
          <Radio className="w-6 h-6 text-primary-foreground" />
        </div> */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Music2 className="w-5 h-5 text-background" />
        </div>
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">
            <span className="gradient-text">VibeCast</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Collaborative Music Streaming
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => (loggedIn ? signOut() : signIn())}
            className="cursor-pointer hover:scale-105 transition-all duration-100"
          >
            {loggedIn ? "Log Out" : "Sign In"}
          </Button>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
          <div className="w-2 h-2 rounded-full bg-upvote animate-pulse" />
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground font-medium">{listenerCount}</span>
          <span className="text-muted-foreground text-sm hidden sm:inline">
            listening
          </span>
        </div>

        <button
          onClick={handleShare}
          className="p-3 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
