import { db } from "./prisma-db";

export default async function getMessages(conversationId: string) {
  try {
    const messages = await db.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        created_at: "asc",
      },
    });
    return messages;
  } catch (err) {
    console.log(err);
    return null;
  }
}
