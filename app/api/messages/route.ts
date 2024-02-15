import getCurrentUser from "@/lib/get-current-user";
import { db } from "@/lib/prisma-db";
import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { message, image, conversationId } = body;
    if (!currentUser?.id || !currentUser?.email) {
      return NextResponse.json({ err: "Unathorised" }, { status: 401 });
    }
    const newMessage = await db.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });
    const updatedConversation = await db.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    //pusher
    await pusherServer.trigger(conversationId, "messages:new", newMessage);

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];
    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      });
    });
    return NextResponse.json(newMessage, { status: 200 });
  } catch (err: unknown) {
    console.log(err, "ERROR MESSAGES");
    return NextResponse.json({ err: "Internal error" }, { status: 500 });
  }
}
