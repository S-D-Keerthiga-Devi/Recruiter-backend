import { Briefcase, Search, BarChart, Users, List, Menu } from "lucide-react";

export default function Sidebar({ isSidebarOpen, toggleSidebar, onNavigate }) {
  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-gray-900 text-white shadow-lg transition-all duration-300 transform z-50
      ${isSidebarOpen ? "w-64 translate-x-0" : "w-20 -translate-x-0"} md:w-64`}
    >
      {/* Sidebar Header with Hamburger Icon */}
      <div className="p-4 text-xl font-semibold border-b border-gray-800 flex justify-between items-center">
        <span className={`${isSidebarOpen ? "block" : "hidden"} md:block`}>Dashboard</span>
        <button
          className="p-2 rounded-lg hover:bg-gray-700 transition md:hidden"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>
      </div>
      {/* Sidebar Menu Items */}
      <ul className="mt-4 space-y-2">
        {[
          { label: "Applications", icon: Users, route: "/applications" },
          { label: "Job Openings", icon: Briefcase, route: "/job-openings" },
          { label: "Announcements", icon: List, route: "/announcements" },
          { label: "Analytics", icon: BarChart, route: "/analytics" },
          { label: "Current Vacancies", icon: Search, route: "/vacancies" },
        ].map(({ label, icon: Icon, route }) => (
          <li
            key={label}
            className="p-4 hover:bg-gray-700 transition flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate(route)}
          >
            <Icon size={20} />
            <span className={`${isSidebarOpen ? "block" : "hidden"} md:block`}>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}