import { auth } from "@/auth";
import { db } from "./prisma-db";

export default async function getCurrentUser() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return null;
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (err: unknown) {
    return null;
  }
}
