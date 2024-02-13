import getCurrentUser from "@/lib/get-current-user";
import { db } from "@/lib/prisma-db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return NextResponse.json(
        {
          message: "Unauthorised",
        },
        { status: 401 }
      );
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    if (isGroup) {
      const newConversations = await db.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return NextResponse.json(newConversations, { status: 201 });
    }

    const existingConversations = await db.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });
    //get the single convo with you and one user
    const singleConversation = existingConversations[0];
    if (singleConversation) {
      return NextResponse.json(singleConversation, { status: 200 });
    }
    //if no single convo start a new here
    const newConversation = await db.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });
    return NextResponse.json(newConversation, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    } else {
      return NextResponse.json(
        {
          error: "Something went wrong",
        },
        { status: 500 }
      );
    }
  }
}
