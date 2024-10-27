import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { accessToken } = await req.json();
  console.log(accessToken);
  if (!accessToken) {
    return NextResponse.json(
      { error: "Access token not found." },
      { status: 401 }
    );
  }

  const event = {
    summary: "Sample Event with meeting",
    location: "123 Main St, Anytown, USA",
    description:
      "This is a sample event along with meeting created via Google Calendar API.",
    start: {
      dateTime: "2024-10-30T10:00:00-07:00", // Start time in ISO format
      timeZone: "America/Los_Angeles", // Time zone
    },
    end: {
      dateTime: "2024-10-30T11:00:00-07:00", // End time in ISO format
      timeZone: "America/Los_Angeles", // Time zone
    },
    attendees: [
      { email: "attendee@example.com" }, // List of attendees
    ],
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now().toString()}`, // Unique identifier for the request
        conferenceSolutionKey: {
          type: "hangoutsMeet", // Specifying Google Meet
        },
      },
    },
    //privatizing the call 
    guestsCanModify: false,
    guestsCanInviteOthers: false,
    guestsCanSeeOtherGuests: false,
  };

  const calendarId = "primary"; // 'primary' for the primary calendar

  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?conferenceDataVersion=1`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating event:", errorData);
      return NextResponse.json(
        { error: "Error creating event.", details: errorData },
        { status: 400 }
      );
    }

    const createdEvent = await response.json();
    return NextResponse.json(createdEvent);
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the event." },
      { status: 500 }
    );
  }
}
