"use client";
import { useState } from "react";
import { Stream } from "@/types/stream";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { NowPlaying } from "@/components/dashboard/NowPlaying";
import { AddStreamForm } from "@/components/dashboard/AddStreamForm";
import { StreamQueue } from "@/components/dashboard/StreamQueue";
import { useSession } from "next-auth/react";
import Redirect from "../Redirect";

const initialStreams: Stream[] = [
  {
    id: "1",
    url: "https://youtube.com/watch?v=example1",
    title: "Synthwave Dreams - Retro Mix 2024",
    thumbnail:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    duration: "4:32",
    platform: "youtube",
    addedBy: "Alex",
    votes: 12,
    userVote: null,
    addedAt: new Date(),
  },
  {
    id: "2",
    url: "https://spotify.com/track/example2",
    title: "Midnight City - Electronic Vibes",
    thumbnail:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
    duration: "3:45",
    platform: "spotify",
    addedBy: "Jordan",
    votes: 8,
    userVote: "up",
    addedAt: new Date(),
  },
  {
    id: "3",
    url: "https://youtube.com/watch?v=example3",
    title: "Chill Beats to Code To",
    thumbnail:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
    duration: "5:18",
    platform: "youtube",
    addedBy: "Sam",
    votes: 5,
    userVote: null,
    addedAt: new Date(),
  },
  {
    id: "4",
    url: "https://spotify.com/track/example4",
    title: "Deep House Sessions Vol. 3",
    thumbnail:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
    duration: "6:02",
    platform: "spotify",
    addedBy: "Riley",
    votes: 3,
    userVote: null,
    addedAt: new Date(),
  },
];

const nowPlayingStream: Stream = {
  id: "now",
  url: "https://youtube.com/watch?v=current",
  title: "Neon Lights - A Cyberpunk Journey",
  thumbnail:
    "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400&h=400&fit=crop",
  duration: "4:15",
  platform: "youtube",
  addedBy: "Chris",
  votes: 15,
  userVote: null,
  addedAt: new Date(),
};

const Dashboard = () => {
  const [streams, setStreams] = useState<Stream[]>(initialStreams);
  const [currentStream, setCurrentStream] = useState<Stream | null>(
    nowPlayingStream
  );

  const handleAddStream = (
    newStream: Omit<Stream, "id" | "votes" | "userVote" | "addedAt">
  ) => {
    const stream: Stream = {
      ...newStream,
      id: Date.now().toString(),
      votes: 0,
      userVote: null,
      addedAt: new Date(),
    };
    setStreams([...streams, stream]);
  };

  const handleVote = (id: string, vote: "up" | "down") => {
    setStreams(
      streams.map((stream) => {
        if (stream.id !== id) return stream;

        let newVotes = stream.votes;
        let newUserVote: "up" | "down" | null = vote;

        if (stream.userVote === vote) {
          newVotes = vote === "up" ? stream.votes - 1 : stream.votes + 1;
          newUserVote = null;
        } else if (stream.userVote === null) {
          newVotes = vote === "up" ? stream.votes + 1 : stream.votes - 1;
        } else {
          newVotes = vote === "up" ? stream.votes + 2 : stream.votes - 2;
        }

        return {
          ...stream,
          votes: newVotes,
          userVote: newUserVote,
        };
      })
    );
  };

  const handleSkip = () => {
    if (streams.length === 0) {
      setCurrentStream(null);
      return;
    }

    const sortedStreams = [...streams].sort((a, b) => b.votes - a.votes);
    const nextStream = sortedStreams[0];
    setCurrentStream(nextStream);
    setStreams(streams.filter((s) => s.id !== nextStream.id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Redirect />
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader listenerCount={24} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Now Playing & Add Stream */}
          <div className="lg:col-span-1 space-y-6">
            <NowPlaying stream={currentStream} onSkip={handleSkip} />
            <AddStreamForm onAddStream={handleAddStream} />
          </div>

          {/* Right column - Queue */}
          <div className="lg:col-span-2 flex flex-col min-h-[600px]">
            <StreamQueue streams={streams} onVote={handleVote} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
