import { ChevronUp, ChevronDown, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockQueue = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    votes: 42,
    userVoted: 1,
  },
  { id: 2, title: "Levitating", artist: "Dua Lipa", votes: 38, userVoted: 0 },
  {
    id: 3,
    title: "Peaches",
    artist: "Justin Bieber",
    votes: 31,
    userVoted: -1,
  },
  {
    id: 4,
    title: "Save Your Tears",
    artist: "The Weeknd",
    votes: 27,
    userVoted: 0,
  },
];

const QueuePreview = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Live Queue
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              See the Power of
              <span className="gradient-text"> Collective Taste</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Watch as the queue reshuffles in real-time based on votes. The
              most loved tracks rise to the top while others wait their turn.
              It's music democracy in action.
            </p>
            <ul className="space-y-4">
              {[
                "Upvote to boost tracks higher",
                "Downvote to push them down",
                "See live vote counts",
                "Currently playing always on top",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Queue mockup */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-2xl" />

            <div className="relative glass-card rounded-3xl p-6 gradient-border">
              {/* Now playing */}
              <div className="mb-6">
                <span className="text-xs text-muted-foreground uppercase tracking-wider mb-3 block">
                  Now Playing
                </span>
                <div className="flex items-center gap-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Pause className="w-6 h-6 text-background" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Heat Waves</h4>
                    <p className="text-sm text-muted-foreground">
                      Glass Animals
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold gradient-text">56</div>
                    <div className="text-xs text-muted-foreground">votes</div>
                  </div>
                </div>
              </div>

              {/* Queue list */}
              <div className="space-y-3">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Up Next
                </span>
                {mockQueue.map((track, index) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                  >
                    <span className="w-6 text-center text-muted-foreground text-sm font-medium">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{track.title}</h4>
                      <p className="text-sm text-muted-foreground truncate">
                        {track.artist}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground min-w-[2rem] text-center">
                        {track.votes}
                      </span>
                      <div className="flex flex-col">
                        <button
                          className={`p-1 rounded transition-colors ${
                            track.userVoted === 1
                              ? "text-primary"
                              : "text-muted-foreground hover:text-primary"
                          }`}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          className={`p-1 rounded transition-colors ${
                            track.userVoted === -1
                              ? "text-destructive"
                              : "text-muted-foreground hover:text-destructive"
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QueuePreview;
