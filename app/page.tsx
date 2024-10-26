"use client";
import { Button } from "@/components/ui/button";

const handleLogin = () => {
  window.location.href = "/api/auth/google-redirect";
};
const HomePage: React.FC = () => {
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
          const details = await response.json();
          console.log(details);
        }}
      >
        Generate Meeting
      </Button>
    </div>
  );
};

export default HomePage;
