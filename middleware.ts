import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);
const isHomeRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // 🚫 If trying to access dashboard while NOT signed in
  if (isDashboardRoute(req) && !userId) {
    return (await auth()).redirectToSignIn();
  }

  // 🚫 If already signed in and trying to access home page
  if (isHomeRoute(req) && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
