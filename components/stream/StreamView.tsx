"use client";
import { useEffect, useState } from "react";
import { Stream } from "@/types/stream";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { NowPlaying } from "@/components/dashboard/NowPlaying";
import { AddStreamForm } from "@/components/dashboard/AddStreamForm";
import { StreamQueue } from "@/components/dashboard/StreamQueue";
import { useSession } from "next-auth/react";
import Redirect from "../Redirect";
import { authOptions } from "@/lib/auth";

// const initialStreams: Stream[] = [
//   {
//     id: "1",
//     url: "https://youtube.com/watch?v=example1",
//     title: "Synthwave Dreams - Retro Mix 2024",
//     thumbnail:
//       "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
//     duration: "4:32",
//     type: "Youtube",
//     addedBy: "Alex",
//     votes: 12,
//     userVote: null,
//     addedAt: new Date(),
//   },
//   {
//     id: "2",
//     url: "https://spotify.com/track/example2",
//     title: "Midnight City - Electronic Vibes",
//     thumbnail:
//       "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
//     duration: "3:45",
//     type: "Spotify",
//     addedBy: "Jordan",
//     votes: 8,
//     userVote: "up",
//     addedAt: new Date(),
//   },
//   {
//     id: "3",
//     url: "https://youtube.com/watch?v=example3",
//     title: "Chill Beats to Code To",
//     thumbnail:
//       "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
//     duration: "5:18",
//     type: "Youtube",
//     addedBy: "Sam",
//     votes: 5,
//     userVote: null,
//     addedAt: new Date(),
//   },
//   {
//     id: "4",
//     url: "https://spotify.com/track/example4",
//     title: "Deep House Sessions Vol. 3",
//     thumbnail:
//       "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
//     duration: "6:02",
//     type: "Spotify",
//     addedBy: "Riley",
//     votes: 3,
//     userVote: null,
//     addedAt: new Date(),
//   },
// ];

const StreamView = ({ creatorId }: { creatorId: string }) => {
  const [streams, setStreams] = useState<Stream[]>();
  const [currentStream, setCurrentStream] = useState<Stream | null>(null);

  //   const session = useSession();

  //   console.log("session outside", session);

  useEffect(() => {
    if (creatorId) {
      fetchStreams();
      let intervalId = setInterval(() => {
        fetchStreams();
      }, 10000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [creatorId]);

  const fetchStreams = async () => {
    // console.log("session is ", session);
    // const creatorId = session.data?.user.id;
    const res = await fetch(`/api/streams?creatorId=${creatorId}`, {
      method: "GET",
    });

    let result = await res.json();

    console.log("here is result", result);

    setStreams(
      result?.streams.map((stream: any) => {
        return {
          thumbnail: stream.smallThumbnail,
          votes: stream.upVotesCount,
          haveUpvoted: stream.haveUpvoted,
          ...stream,
        };
      })
    );

    const activeStream = {
      ...result?.activeStream,
      thumbnail: result?.activeStream.smallThumbnail,
    };

    setCurrentStream((videoStream) => {
      if (videoStream?.id == activeStream.id) {
        return videoStream;
      }

      return activeStream;
    });

    console.log("result found is : ", res);
  };

  const handleAddStream = async (
    newStream: Omit<Stream, "id" | "votes" | "userVote" | "addedAt">
  ) => {
    // const stream: Stream = {
    //   ...newStream,
    //   id: Date.now().toString(),
    //   votes: 0,
    //   userVote: null,
    //   addedAt: new Date(),
    // };
    // const stream = await fetch("/api/streams", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     creatorId: "",
    //     url: url,
    //   }),
    // });
    // setStreams([...(streams ?? []), stream]);
  };

  const handleVote = async (id: string, vote: "up" | "down") => {
    alert(vote);

    setStreams(
      streams?.map((stream) => {
        if (stream.id !== id || vote === stream.userVote) return stream;

        let newVotes = stream.votes;
        let newUserVote: "up" | "down" | null = vote;

        if (stream.haveUpvoted && vote == "down") {
          newVotes = stream.votes - 1;
        } else if (!stream.haveUpvoted && vote == "up") {
          newVotes = stream.votes + 1;
        } else {
          return stream;
        }

        return {
          ...stream,
          votes: newVotes,
          userVote: newUserVote,
        };
      })
    );

    const res = await fetch(
      `/api/streams/${vote == "up" ? "upvote" : "downvote"}`,
      {
        method: "POST",
        body: JSON.stringify({
          streamId: id,
        }),
      }
    );

    let result = await res.json();
  };

  const handleSkip = async () => {
    if (streams?.length === 0) {
      setCurrentStream(null);
      return;
    }

    const sortedStreams = [...(streams ?? [])].sort(
      (a, b) => b.votes - a.votes
    );

    const res = await fetch("/api/streams/next", {
      method: "GET",
    });

    let result = await res.json();

    const activeStream = {
      ...result?.activeStream,
      thumbnail: result?.activeStream.smallThumbnail,
    };

    setCurrentStream(activeStream);
    setStreams(streams?.filter((s) => s.id !== result?.activeStream.id));
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
            <NowPlaying
              stream={currentStream}
              onSkip={handleSkip}
              totalStreams={streams?.length ?? 0}
            />
            <AddStreamForm onAddStream={handleAddStream} />
          </div>

          {/* Right column - Queue */}
          <div className="lg:col-span-2 flex flex-col min-h-[600px]">
            <StreamQueue streams={streams ?? []} onVote={handleVote} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamView;
