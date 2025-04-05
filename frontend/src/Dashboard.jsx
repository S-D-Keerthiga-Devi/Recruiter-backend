import { useState } from "react";
import { Briefcase, BarChart, Users, List, UserPlus, Calendar, Menu } from "lucide-react";
import Navbar from "./components/ui/Navbar";
import Sidebar from "./components/ui/Sidebar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const applicationData = [
  { stage: "Applied", count: 1200 },
  { stage: "Screening", count: 800 },
  { stage: "Interview", count: 500 },
  { stage: "Offer", count: 200 },
  { stage: "Hired", count: 100 },
];

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 md:w-64 w-60 bg-gray-800`}>
        <Sidebar isSidebarOpen={menuOpen} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        <Navbar isSidebarOpen={menuOpen} toggleSidebar={() => setMenuOpen(!menuOpen)} />

        {/* Content Area */}
        <div className="p-4 sm:p-6 mt-16 overflow-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {[ 
              { title: "Applications", value: "2344", icon: Users },
              { title: "Job Openings", value: "21", icon: Briefcase },
              { title: "Announcements", value: "17", icon: List },
              { title: "Analytics", value: "9.3k", icon: BarChart },
            ].map(({ title, value, icon: Icon }, index) => (
              <div key={index} className="p-5 bg-gray-800 rounded-lg shadow-md flex items-center space-x-4 hover:bg-gray-700 transition">
                <Icon size={30} className="text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-xl font-bold">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Application Pipeline Graph */}
          <div className="mt-8 w-full min-w-0">
            <h2 className="text-xl font-bold mb-4">Application Pipeline</h2>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={applicationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#4F46E5" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recruitment Progress */}
          <div className="mt-8 bg-gray-900 p-4 sm:p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Recruitment Progress</h2>
            <div className="space-y-4">
              {[ 
                { name: "Swati Arora", role: "Software Developer", color: "purple", interview: "March 30, 10:00 AM" },
                { name: "Jeniffer Rodriguez", role: "Senior Business Analyst", color: "red", interview: "March 31, 2:00 PM" },
                { name: "Mohammad Ibrahim", role: "Software Engineer", color: "yellow", interview: "April 1, 11:30 AM" },
              ].map(({ name, role, color, interview }, index) => (
                <div key={index} className="p-4 bg-gray-800 rounded-lg shadow flex justify-between items-center hover:bg-gray-700 transition">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center">
                      <span className={`w-3 h-3 rounded-full bg-${color}-400 mr-2`}></span>{name}
                    </h3>
                    <p className="text-gray-400">Applied for {role}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-300 flex items-center"><Calendar size={16} className="mr-2" /> {interview}</div>
                    <UserPlus size={24} className="text-blue-400 cursor-pointer hover:text-blue-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="mt-8 bg-gray-900 p-4 sm:p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Upcoming Interviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[ 
                { candidate: "Amit Sharma", role: "Data Analyst", date: "April 2, 10:00 AM" },
                { candidate: "Riya Mehta", role: "Product Manager", date: "April 3, 1:30 PM" },
                { candidate: "Neha Kapoor", role: "UX Designer", date: "April 4, 11:00 AM" },
              ].map(({ candidate, role, date }, index) => (
                <div key={index} className="p-5 bg-gray-800 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-700 transition">
                  <div>
                    <h3 className="text-lg font-semibold">{candidate}</h3>
                    <p className="text-gray-400">Interview for {role}</p>
                  </div>
                  <div className="text-sm text-gray-300 flex items-center"><Calendar size={16} className="mr-2" /> {date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 md:hidden bg-gray-800 p-2 rounded-lg shadow-md"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu size={24} />
      </button>
    </div>
    // <h1>Hello from dashboard</h1>
  );
}
