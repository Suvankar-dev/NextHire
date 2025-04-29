import Sidebar from "../components/sidebar";
import { useEffect, use } from "react";
import { useState } from "react";
import JobField from "../components/jobfield.jsx";
import MessageBar from "../components/messageBar.jsx";

export default function HomePage() {
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.token) {
      Navigate("/login");
    } else {
      console.log(" User is logged in", userInfo);
    }
  }, []);
  return (
    // <div className="flex justify-between min-h-screen bg-gray-100 border-2 border-amber-300">
    <div className="flex justify-evenly flex-col min-h-screen  bg-amber-500 ">
      <JobField />
      {window.innerWidth > 768 && <MessageBar />}
    </div>
  );
}
