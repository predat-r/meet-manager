"use client";
import { useEffect } from "react";
import { redirect, useParams } from "next/navigation";

const SuccessPage = () => {
  const { accessToken } = useParams<{ accessToken: string }>();

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      redirect("http://localhost:3000"); 
    }
  }, [accessToken]); 

  return null; 
};

export default SuccessPage;
