import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import youtubesearchapi from "youtube-search-api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const streamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

function getYoutubeRegex() {
  return new RegExp(
    "^https?:\\/\\/(www\\.)?youtube\\.com\\/watch\\?v=([a-zA-Z0-9_-]{11})$"
  );
}

export async function POST(req: NextRequest) {
  try {
    // get the user id
    const session = await getServerSession(authOptions);

    if (!session.user.id) {
      return NextResponse.json(
        {
          error: "Unauthorized Access",
        },
        {
          status: 403,
        }
      );
    }

    const data = streamSchema.parse(await req.json());

    const isYtUrl = getYoutubeRegex().test(data.url);

    if (!isYtUrl) {
      return NextResponse.json(
        {
          error: "Wrong URL FORMAT",
        },
        {
          status: 411,
        }
      );
    }

    const extractedId = data.url.split("?v=")[1];

    // get thumbnail and title
    const result = await youtubesearchapi.GetVideoDetails(extractedId);
    const title = result.title;
    const thumbnails = result.thumbnail.thumbnails;

    thumbnails.sort((a: { width: number }, b: { width: number }) =>
      a.width < b.width ? -1 : 1
    );

    console.log(thumbnails[thumbnails.length - 1].url);
    console.log(title);

    const stream = await prisma.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId: extractedId,
        type: "Youtube",
        title: result.title,
        smallThumbnail: thumbnails[thumbnails.length - 2].url,
        bigThumbnail: thumbnails[thumbnails.length - 1].url,
        addedBy: session.user.id,
        // title: title,
        // smallThumbnail: thumbnails[thumbnails.length - 2].url,
        // bigThumbnail: thumbnails[thumbnails.length - 1].url,
      },
    });

    return NextResponse.json({
      message: "stream created",
      stream,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: err,
      },
      {
        status: 411,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session.user.id) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        status: 403,
      }
    );
  }

  const creatorId = req.nextUrl.searchParams.get("creatorId");

  if (!creatorId) {
    return NextResponse.json(
      {
        error: "creatorId not provided",
      },
      {
        status: 411,
      }
    );
  }

  const streams = await prisma.stream.findMany({
    where: {
      userId: creatorId,
      currentlyPlaying: false,
    },
    include: {
      _count: {
        select: {
          upvotes: true,
        },
      },
      upvotes: {
        where: {
          userId: session.user.id,
        },
      },
    },
  });

  const activeStream = await prisma.stream.findFirst({
    where: {
      currentlyPlaying: true,
    },
  });

  return NextResponse.json(
    {
      streams: streams.map(({ _count, ...rest }) => {
        return {
          ...rest,
          upVotesCount: _count.upvotes,
          haveUpvoted: rest.upvotes.length ? true : false,
        };
      }),

      activeStream,
    },
    {
      status: 200,
    }
  );
}
