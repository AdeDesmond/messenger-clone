import authConfig from "./auth.config";
import * as routes from "@/routes";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
const { auth } = NextAuth(authConfig);
export default auth((req) => {
  // const { nextUrl } = req;
  // const isLoggedIn = !!req.auth; //converting to a boolean flag
  // if (isLoggedIn) {
  //   return NextResponse.redirect(new URL(routes.routes, nextUrl));
  // }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"], //this matcher is from clerk docs, AuthMiddleware. so check in the future
};
