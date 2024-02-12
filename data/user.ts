import { db } from "@/lib/prisma-db";

export async function getUserByEmail(email: string) {
  return await db.user.findFirst({
    where: {
      email,
    },
  });
}
export async function getUserById(Id: string) {
  try {
    return await db.user.findUnique({
      where: {
        id: Id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
    } else {
      console.log("something went wrong");
    }
  }
}
