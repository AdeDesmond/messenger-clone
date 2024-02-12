import Credentials from "next-auth/providers/credentials";

import { NextResponse, NextRequest } from "next/server";
import { signIn } from "@/auth";
import { db } from "@/lib/prisma-db";
import bcrpytjs from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { FormSchema } from "@/schemas/schema";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validatedFields = FormSchema.safeParse(body);
  if (!validatedFields.success) {
    return NextResponse.json(
      { error: "invalid password or email, all fields should be valid" },
      { status: 400 }
    );
  }
  const { email, password } = validatedFields.data;
  const checkUserExist = await getUserByEmail(email);
  if (!checkUserExist) {
    return NextResponse.json({ error: "User doesn't exist" }, { status: 404 });
  }

  try {
    await signIn("credentials", {
      ...validatedFields.data,
      redirect: false,
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err: unknown) {
    console.log(err);
  }

  return NextResponse.json(
    { message: "success", user: checkUserExist },
    { status: 200 }
  );
}
// Credentials({
//     async authorize(credentials) {
//       const validatedFields = FormSchema.safeParse(credentials);

//       if (validatedFields.success) {
//         console.log(validatedFields.data);
//         const { email, password } = validatedFields.data;

//         const user = await getUserByEmail(email);
//         if (!user || !user.hashPassword) return null;

//         const passwordMatch = bcrpytjs.compareSync(
//           password,
//           user.hashPassword
//         );

//         if (passwordMatch) return user;
//       }

//       return null;
//     },
//   });
