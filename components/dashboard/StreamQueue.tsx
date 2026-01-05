import { Stream } from "@/types/stream";
import { StreamCard } from "./StreamCard";
import { ListMusic } from "lucide-react";

interface StreamQueueProps {
  streams: Stream[];
  onVote: (id: string, vote: "up" | "down") => void;
}

export const StreamQueue = ({ streams, onVote }: StreamQueueProps) => {
  const sortedStreams = [...streams].sort((a, b) => b.votes - a.votes);

  return (
    <div className="glass-card rounded-lg p-6 flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg text-foreground flex items-center gap-2">
          <ListMusic className="w-5 h-5 text-primary" />
          Up Next
        </h2>
        <span className="text-muted-foreground text-sm">
          {streams.length} {streams.length === 1 ? "track" : "tracks"}
        </span>
      </div>

      {streams.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <ListMusic className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">The queue is empty</p>
          <p className="text-muted-foreground text-sm mt-1">
            Add a stream to get the party started!
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto scrollbar-thin space-y-3 pr-2">
          {sortedStreams.map((stream, index) => (
            <StreamCard
              key={stream.id}
              stream={stream}
              rank={index + 1}
              onVote={onVote}
            />
          ))}
        </div>
      )}
    </div>
  );
};
