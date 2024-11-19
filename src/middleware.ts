import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PUBLIC_ROUTES } from "./lib/routes";
import { auth } from "./auth";
//Todo: we can handle as per our project reqirement
export async function middleware(request: NextRequest) {
  const session: any = await auth();
  const isAutheticated = !!session?.user?.token;
  try {
    const path = request.nextUrl.pathname;
    if (isAutheticated && PUBLIC_ROUTES.includes(path)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (!isAutheticated && !PUBLIC_ROUTES.includes(path)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  } catch (error) {
    console.log(error);
  }
}

export const config = {
  matcher: ["/login", "/", "/register", "/dashboard:path*"],
};
