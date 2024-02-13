import { db } from "./prisma-db";
import { auth } from "@/auth";

export default async function getUsers() {
  const session = await auth();
  if (!session?.user) {
    return [];
  }

  try {
    const users = await db.user.findMany({
      orderBy: {
        created_at: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });
    return users;
  } catch (err: unknown) {
    return null;
  }
}
