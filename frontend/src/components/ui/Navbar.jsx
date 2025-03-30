import { useState } from "react";
import { Menu, Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export default function Navbar({ toggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-md flex justify-between items-center z-50">
      {/* Left Section: Hamburger Icon */}
      <div className="flex items-center space-x-4">
        <button
          className="p-2 rounded-lg hover:bg-gray-700 transition md:hidden"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold hidden md:block">Dashboard</h1>
      </div>

      {/* Right Section: Search Bar, Notifications & Profile Dropdown */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="hidden md:flex w-48">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-1 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        {/* Notification Icon */}
        <button className="p-2 rounded-lg hover:bg-gray-700 transition relative">
          <Bell size={24} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="p-2 rounded-lg hover:bg-gray-700 transition flex items-center space-x-2"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 shadow-lg rounded-lg">
              <ul className="p-2 text-sm">
                <li className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer">Settings</li>
                <li className="p-2 hover:bg-red-600 rounded-lg cursor-pointer text-red-400 hover:text-white">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
