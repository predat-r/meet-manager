'use client';

import { Button } from "@/components/ui/button";

const handleLogin = () => {
  window.location.href = '/api/auth/google-redirect';
};
const HomePage: React.FC = () => {
  return (
    <div className="p-3 w-screen h-screen flex flex-col justify-center items-center gap-y-6">
      <h1>Google Meeting Manager</h1>
     <Button onClick={()=>{handleLogin()}}>Generate Meeting</Button>
    </div>
  );
};

export default HomePage;

