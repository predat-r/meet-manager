"use client";
import { Button } from "@/components/ui/button";
import { meet } from "googleapis/build/src/apis/meet";
import Link from "next/link";
import { useState } from "react";

const handleLogin = () => {
  window.location.href = "/api/auth/google-redirect";
};
interface GoogleCalendarEvent {
  kind: "calendar#event";
  etag: string;
  id: string;
  status: "confirmed" | "tentative" | "cancelled";
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description?: string;
  location?: string;
  creator: {
    email: string;
    self?: boolean;
  };
  organizer: {
    email: string;
    self?: boolean;
  };
  start: {
    dateTime: string;
    timeZone?: string;
  };
  end: {
    dateTime: string;
    timeZone?: string;
  };
  attendees?: Array<{
    email: string;
    displayName?: string;
    organizer?: boolean;
    self?: boolean;
    resource?: boolean;
    optional?: boolean;
    responseStatus?: "accepted" | "declined" | "tentative" | "needsAction";
    comment?: string;
    additionalGuests?: number;
  }>;
  reminders?: {
    useDefault: boolean;
    overrides?: Array<{
      method: "email" | "popup";
      minutes: number;
    }>;
  };
  sequence: number;
  eventType: "default" | "outOfOffice" | "focusTime";
  iCalUID: string;
  conferenceData?: {
    entryPoints?: Array<{
      entryPointType: "video" | "phone" | "sip" | "more";
      uri: string;
      label?: string;
      pin?: string;
      accessCode?: string;
    }>;
    conferenceSolution?: {
      iconUri: string;
      name: string;
    };
    notes?: string;
  };
}

const HomePage: React.FC = () => {
  const [meetingLink, setmeetingLink] = useState<string>();
  return (
    <div className="p-3 w-screen h-screen flex flex-col justify-center items-center gap-y-6">
      <h1 className="text-xl">Google Calander And Meets Manager</h1>
      <Button
        onClick={() => {
          handleLogin();
        }}
      >
        Authorize
      </Button>
      <Button
        onClick={async () => {
          const response = await fetch("/api/calendar/schedule-meeting", {
            method: "POST",
            body: JSON.stringify({
              accessToken: localStorage.getItem("accessToken"),
            }),
          });
          const details: GoogleCalendarEvent = await response.json();
          if (
            details.conferenceData &&
            details.conferenceData?.entryPoints &&
            details.conferenceData?.entryPoints[0].uri
          ) {
            setmeetingLink(details.conferenceData?.entryPoints[0].uri);
          }
        }}
      >
        Generate Meeting
      </Button>
      <div className="flex w-1/2 flex-row justify-evenly items-center">
        <Button>
          <Link href={meetingLink ? meetingLink : ""}>Click to join</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
