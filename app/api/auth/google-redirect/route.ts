import { NextResponse } from "next/server";

export async function GET() {
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.append("client_id", process.env.GOOGLE_CLIENT_ID!);
  authUrl.searchParams.append(
    "redirect_uri",
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google-callback`
  );
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append(
    "scope",
    "https://www.googleapis.com/auth/calendar"
  );
  authUrl.searchParams.append("access_type", "offline");
  authUrl.searchParams.append("prompt", "consent");

  return NextResponse.redirect(authUrl.toString());
}
