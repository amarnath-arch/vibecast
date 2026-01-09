"use client";
import { Play, Pause, SkipForward, Volume2, Plus } from "lucide-react";
import { Stream } from "@/types/stream";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface NowPlayingProps {
  stream: Stream | null;
  totalStreams: number;
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

export const NowPlaying = ({
  stream,
  onSkip,
  totalStreams,
}: NowPlayingProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  const initializedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const playNext = async () => {
    const res = await fetch("/api/streams/next", {
      method: "GET",
    });

    let result = await res.json();
  };

  const togglePlay = () => {
    if (!playerRef.current) return;

    try {
      if (isPlaying) {
        setIsPlaying(false);
        playerRef.current.pauseVideo();
      } else {
        setIsPlaying(true);
        playerRef.current.playVideo();
      }
    } catch (err) {
      // setIsPlaying(false);
      // playerRef.current.pauseVideo();
      console.error(err);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const seekTime = percentage * duration;

    playerRef.current.seekTo(seekTime, true);
  };

  const formatTime = (seconds: number) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!stream) return;

    const loadPlayer = () => {
      playerRef.current = new window.YT.Player(containerRef.current!, {
        videoId: stream.extractedId,
        width: 0,
        height: 0,
        playerVars: {
          autoplay: 1,
          controls: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            playerRef.current.playVideo();

            const interval = setInterval(() => {
              setCurrentTime(playerRef.current.getCurrentTime());
              setDuration(playerRef.current.getDuration());
            }, 500);

            playerRef.current._interval = interval;
          },
          onStateChange: (e: any) => {
            const YT = window.YT;
            if (e.data === YT.PlayerState.PLAYING) setIsPlaying(true);
            if (
              e.data === YT.PlayerState.PAUSED ||
              e.data === YT.PlayerState.ENDED
            )
              setIsPlaying(false);
          },
        },
      });
    };

    if (window.YT?.Player) {
      loadPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = loadPlayer;
    }

    return () => {
      if (playerRef.current?._interval) {
        clearInterval(playerRef.current._interval);
      }
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [stream]);

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
        {totalStreams > 0 && (
          <button
            onClick={onSkip}
            className="cursor-pointer w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Play Next
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="glass-card rounded-lg p-6 glow">
      {/* Hidden audio player */}
      <div
        ref={containerRef}
        style={{
          width: 0,
          height: 0,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
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
              onClick={() => togglePlay()}
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
                stream.type === "Youtube"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {stream.type === "Youtube" ? "YouTube" : "Spotify"}
            </span>
            <span className="text-muted-foreground text-sm">
              {stream.duration}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div
              onClick={handleSeek}
              className="h-1 bg-muted rounded-full overflow-hidden cursor-pointer group"
            >
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
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
