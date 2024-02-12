import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/prisma-db";
import { getUserById } from "./data/user";
import { getAccountByUserId } from "./data/accounts";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  //these are our custom pages, and here we can redirect to this page if there are errors, and then we can have these custom pages
  pages: {
    // signIn: "/auth/login",
    error: "/auth/error",
  },
  //we use events to do other side effects on our app in this case we are verifying the email, we are doing this here is order to make sure users who log in with social media will have their emailVerified set to verified
  // events: {
  //   async linkAccount({ user }) {
  //     await db.user.update({
  //       where: {
  //         id: user.id,
  //       },
  //       data: {
  //         emailVerified: new Date(),
  //       },
  //     });
  //   },
  // },
  //there is flow of the token from the jwt to the session, so any changes in the jwt will be reflected in the token, so we can get the id and use with in our session to extend it, the implementation is as below
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserById(user.id as string);
      //prevent signin without email verification
      // if (!existingUser?.emailVerified) {
      //   return false;
      // }

      return true;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  debug: true,
});
