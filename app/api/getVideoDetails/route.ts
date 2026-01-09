import { NextRequest, NextResponse } from "next/server";
import youtubesearchapi from "youtube-search-api";

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        {
          error: "url not provided",
        },
        {
          status: 411,
        }
      );
    }
    const extractedId = url.split("?v=")[1];

    // get thumbnail and title
    const result = await youtubesearchapi.GetVideoDetails(extractedId);
    const title = result.title;
    const thumbnails = result.thumbnail.thumbnails;
    thumbnails.sort((a: { width: number }, b: { width: number }) =>
      a.width < b.width ? -1 : 1
    );

    return NextResponse.json(
      {
        message: "done",
        title,
        thumbnail: thumbnails[thumbnails.length - 2].url,
      },
      {
        status: 200,
      }
    );

    // return NextResponse.json(
    //   {
    //     title,
    //     thumbnail: thumbnails[length - 2].url,
    //   },
    //   {
    //     status: 200,
    //   }
    // );
  } catch (err) {
    NextResponse.json(
      {
        error: err,
      },
      {
        status: 500,
      }
    );
  }
}
