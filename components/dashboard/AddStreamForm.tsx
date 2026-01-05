"use client";
import { useState } from "react";
import { Plus, Link, Youtube, Music2, X, Loader2 } from "lucide-react";
import { Stream } from "@/types/stream";

interface AddStreamFormProps {
  onAddStream: (
    stream: Omit<Stream, "id" | "votes" | "userVote" | "addedAt">
  ) => void;
}

interface PreviewData {
  title: string;
  thumbnail: string;
  duration: string;
  platform: "youtube" | "spotify";
}

// Mock function to simulate fetching video/track info
const fetchPreview = async (url: string): Promise<PreviewData | null> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return {
      title: "Lofi Hip Hop Radio - Beats to Relax/Study To",
      thumbnail:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      duration: "3:45",
      platform: "youtube",
    };
  } else if (url.includes("spotify.com")) {
    return {
      title: "Blinding Lights - The Weeknd",
      thumbnail:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
      duration: "4:22",
      platform: "spotify",
    };
  }
  return null;
};

export const AddStreamForm = ({ onAddStream }: AddStreamFormProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [error, setError] = useState("");

  const handleUrlChange = async (value: string) => {
    setUrl(value);
    setError("");
    setPreview(null);

    if (!value.trim()) return;

    const isValidUrl =
      value.includes("youtube.com") ||
      value.includes("youtu.be") ||
      value.includes("spotify.com");

    if (!isValidUrl) {
      setError("Please enter a valid YouTube or Spotify URL");
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchPreview(value);
      if (data) {
        setPreview(data);
      } else {
        setError("Could not fetch preview for this URL");
      }
    } catch {
      setError("Failed to load preview");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!preview) return;

    onAddStream({
      url,
      title: preview.title,
      thumbnail: preview.thumbnail,
      duration: preview.duration,
      platform: preview.platform,
      addedBy: "You",
    });

    setUrl("");
    setPreview(null);
  };

  const clearInput = () => {
    setUrl("");
    setPreview(null);
    setError("");
  };

  return (
    <div className="glass-card rounded-lg p-6">
      <h2 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-primary" />
        Add to Queue
      </h2>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Link className="w-5 h-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="Paste YouTube or Spotify link..."
          className="w-full bg-muted border border-border rounded-lg pl-12 pr-12 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
        {url && (
          <button
            onClick={clearInput}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Platform hints */}
      <div className="flex gap-3 mt-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Youtube className="w-4 h-4 text-red-400" />
          <span>YouTube</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Music2 className="w-4 h-4 text-green-400" />
          <span>Spotify</span>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="mt-4 flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Fetching preview...</span>
        </div>
      )}

      {/* Error state */}
      {error && <p className="mt-4 text-destructive text-sm">{error}</p>}

      {/* Preview */}
      {preview && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex gap-4">
            <img
              src={preview.thumbnail}
              alt={preview.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">
                {preview.title}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    preview.platform === "youtube"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {preview.platform === "youtube" ? "YouTube" : "Spotify"}
                </span>
                <span className="text-muted-foreground text-sm">
                  {preview.duration}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add to Queue
          </button>
        </div>
      )}
    </div>
  );
};
