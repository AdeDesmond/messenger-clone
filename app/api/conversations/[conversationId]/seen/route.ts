import getCurrentUser from "@/lib/get-current-user";
import { db } from "@/lib/prisma-db";
import { NextRequest, NextResponse } from "next/server";

interface Iparams {
  conversationId?: string;
}

export async function POST(req: NextRequest, { params }: { params: Iparams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unathorised", { status: 401 });
    }

    //fetch existing conversation
    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });
    if (!conversation) {
      return new NextResponse("invalid id", { status: 400 });
    }

    //find the last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (!lastMessage) {
      return NextResponse.json(conversation);
    }
    //update seen of the last message
    const updatedMessage = await db.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
    return NextResponse.json(updatedMessage);
  } catch (err: unknown) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
