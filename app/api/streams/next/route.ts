import prisma from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session.user.id) {
    NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        status: 403,
      }
    );
  }

  //is any stream currently playing;
  const isCurrentlyPlaying = await prisma.stream.findFirst({
    where: {
      currentlyPlaying: true,
    },
  });

  // get the most upvoted stream
  const mostUpvotedStream = await prisma.stream.findFirst({
    where: {
      userId: session.user.id, // for the creator
      currentlyPlaying: false,
    },
    orderBy: {
      upvotes: {
        _count: "desc",
      },
    },
  });

  if (isCurrentlyPlaying) {
    // delete the currently playing stream
    await prisma.stream.delete({
      where: {
        id: isCurrentlyPlaying.id,
      },
    });
  }

  // make the most Upvoted Stream to be currently playing
  await prisma.stream.update({
    where: {
      id: mostUpvotedStream?.id,
    },
    data: {
      currentlyPlaying: true,
    },
  });

  return NextResponse.json(
    {
      activeStream: mostUpvotedStream,
    },
    {
      status: 200,
    }
  );
}
