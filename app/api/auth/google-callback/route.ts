import { NextResponse } from "next/server";
import { GoogleTokenResponse, ErrorResponse } from "@/app/types/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    const errorResponse: ErrorResponse = {
      error: "No authorization code received.",
    };
    return NextResponse.json(errorResponse, { status: 400 });
  }

  const tokenUrl = "https://oauth2.googleapis.com/token";
  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google-callback`;

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });
    const data: GoogleTokenResponse = await response.json();
 
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to exchange code for tokens.", details: data },
        { status: 400 }
      );
    }

    //success scenario , manage the token here
    const accessToken = data.access_token;
    console.log("\nAccess Token successfully recieved : ",accessToken);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  } catch (error) {
    const errorResponse: ErrorResponse = { error: "Internal server error." };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
