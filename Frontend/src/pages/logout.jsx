import React from "react";
import { useNavigate } from "react-router-dom";
export default function Logout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    window.location.reload();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        Are you sure you want to log out?
      </h1>
      <button
        onClick={handleLogout}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Logout
      </button>
    </div>
  );
}
