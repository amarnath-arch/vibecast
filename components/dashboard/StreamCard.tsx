import { ChevronUp, ChevronDown, Youtube, Music2 } from "lucide-react";
import { Stream } from "@/types/stream";
import { cn } from "@/lib/utils";

interface StreamCardProps {
  stream: Stream;
  rank: number;
  onVote: (id: string, vote: "up" | "down") => void;
}

export const StreamCard = ({ stream, rank, onVote }: StreamCardProps) => {
  const isTopRanked = rank === 1;

  return (
    <div
      className={cn(
        "glass-card rounded-lg p-4 transition-all duration-300 hover:scale-[1.02]",
        isTopRanked && "gradient-border glow-sm"
      )}
    >
      <div className="flex items-center gap-4">
        {/* Rank */}
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm",
            isTopRanked
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          {rank}
        </div>

        {/* Thumbnail */}
        <img
          src={stream.thumbnail}
          alt={stream.title}
          className="w-14 h-14 rounded-lg object-cover"
        />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate">
            {stream.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {stream.platform === "youtube" ? (
              <Youtube className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <Music2 className="w-3.5 h-3.5 text-green-400" />
            )}
            <span className="text-muted-foreground text-sm">
              {stream.duration}
            </span>
            <span className="text-muted-foreground text-sm">•</span>
            <span className="text-muted-foreground text-sm truncate">
              by <span className="text-primary">{stream.addedBy}</span>
            </span>
          </div>
        </div>

        {/* Voting */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => onVote(stream.id, "up")}
            className={cn(
              "p-1.5 rounded-lg transition-all",
              stream.userVote === "up"
                ? "bg-upvote/20 text-upvote"
                : "text-muted-foreground hover:text-upvote hover:bg-upvote/10"
            )}
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          <span
            className={cn(
              "font-display font-bold text-lg min-w-[2rem] text-center",
              stream.votes > 0 && "text-upvote",
              stream.votes < 0 && "text-downvote",
              stream.votes === 0 && "text-muted-foreground"
            )}
          >
            {stream.votes}
          </span>

          <button
            onClick={() => onVote(stream.id, "down")}
            className={cn(
              "p-1.5 rounded-lg transition-all",
              stream.userVote === "down"
                ? "bg-downvote/20 text-downvote"
                : "text-muted-foreground hover:text-downvote hover:bg-downvote/10"
            )}
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
