import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const redirectUrl = new URL("/login", request.url);
  redirectUrl.searchParams.set("error", "OAuth login is disabled. Use email + password.");
  return NextResponse.redirect(redirectUrl);
}
