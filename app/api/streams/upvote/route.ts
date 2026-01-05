import prisma from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UpvoteSchema = z.object({
  streamId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
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

    const data = UpvoteSchema.parse(await req.json());

    await prisma.upvotes.create({
      data: {
        userId: session.user.id,
        streamId: data.streamId,
      },
    });
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
