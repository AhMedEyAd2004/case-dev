import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth/auth";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  console.log("Session:", session);
  if (!session) return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
