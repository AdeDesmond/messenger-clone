import { NextResponse, NextRequest } from "next/server";
import bcrpytjs, { genSaltSync } from "bcryptjs";
import { FormSchema } from "@/schemas/schema";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/prisma-db";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedFields = FormSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          error:
            "invalid password or email field, please make sure fields are valid",
        },
        { status: 400 }
      );
    }
    const { name, email, password } = validatedFields.data;

    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
      return NextResponse.json(
        { error: "email already taken" },
        { status: 400 }
      );
    }
    const salt = bcrpytjs.genSaltSync(10);
    const hashPassword = bcrpytjs.hashSync(password, salt);
    const newUser = await db.user.create({
      data: {
        name,
        email,
        hashPassword: hashPassword,
      },
    });
    //TODO ----> send the email confirmation at this point.
    return NextResponse.json(
      { message: "successfully registered" },
      {
        status: 201,
      }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
    } else {
      console.log("Something went wrong");
    }
  }
}
