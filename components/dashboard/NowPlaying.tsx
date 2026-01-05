import { Play, Pause, SkipForward, Volume2 } from "lucide-react";
import { Stream } from "@/types/stream";
import { useState } from "react";

interface NowPlayingProps {
  stream: Stream | null;
  onSkip: () => void;
}

const AudioVisualizer = () => {
  return (
    <div className="flex items-end gap-1 h-8">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-primary rounded-full animate-bars origin-bottom"
          style={{
            height: "100%",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
};

export const NowPlaying = ({ stream, onSkip }: NowPlayingProps) => {
  const [isPlaying, setIsPlaying] = useState(true);

  if (!stream) {
    return (
      <div className="glass-card rounded-lg p-6 glow">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center">
            <Volume2 className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Nothing playing</p>
            <p className="text-foreground font-display text-lg">
              Add a stream to get started
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-lg p-6 glow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg text-muted-foreground">
          Now Playing
        </h2>
        <AudioVisualizer />
      </div>

      <div className="flex gap-4">
        <div className="relative group">
          <img
            src={stream.thumbnail}
            alt={stream.title}
            className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover"
          />
          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-display text-xl font-semibold text-foreground truncate">
            {stream.title}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            Added by <span className="text-primary">{stream.addedBy}</span>
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                stream.platform === "youtube"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {stream.platform === "youtube" ? "YouTube" : "Spotify"}
            </span>
            <span className="text-muted-foreground text-sm">
              {stream.duration}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                style={{ width: "35%" }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1:24</span>
              <span>{stream.duration}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2">
          <button
            onClick={onSkip}
            className="p-3 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
