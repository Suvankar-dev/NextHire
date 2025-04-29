import React, { useState } from "react";

const Messagebar = () => {
  return (
    <div className={`"w-[30%]"  h-full bg-amber-700 `}>
      <div className={`flex flex-col h-screen  bg-gray-800 text-white `}>
        <nav className="flex flex-col mt-4">
          <div className="p-4"></div>
          <div className="bg-gray-700 p-4 rounded-md mb-4">
            <h3 className="text-lg font-bold">John Doe</h3>
            <p className="text-sm">Software Engineer</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md mb-4">
            <h3 className="text-lg font-bold">Jane Smith</h3>
            <p className="text-sm">Product Manager</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md mb-4">
            <h3 className="text-lg font-bold">Alice Johnson</h3>
            <p className="text-sm">UI/UX Designer</p>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default Messagebar;
