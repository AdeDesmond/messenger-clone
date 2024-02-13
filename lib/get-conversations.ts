import { db } from "./prisma-db";
import getCurrentUser from "./get-current-user";

export async function getConversation() {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return [];
  }
  try {
    const conversations = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return conversations;
  } catch (err: unknown) {
    console.log(err);
    return null;
  }
}
