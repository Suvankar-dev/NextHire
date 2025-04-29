import React, { useState } from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-transparent z-10  transition-transform duration-300`}
    >
      <div
        className={`flex flex-col h-screen  bg-gray-800 text-white ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-width duration-300`}
      >
        <nav className="flex flex-col mt-4">
          <Link to="/" className="p-4 hover:bg-gray-700 rounded-md">
            Home
          </Link>
          <Link to="/about" className="p-4 hover:bg-gray-700 rounded-md">
            About
          </Link>
          <Link to="/contact" className="p-4 hover:bg-gray-700 rounded-md">
            Contact
          </Link>
        </nav>
      </div>
      <button
        onClick={toggleSidebar}
        className="p-4 bg-gray-700 z-11 hover:bg-gray-600 rounded-md"
      >
        {isOpen ? "Close" : "Open"}
      </button>
    </div>
  );
};
export default Sidebar;
