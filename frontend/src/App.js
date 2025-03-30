import { useState } from "react";
import Navbar from "./components/ui/Navbar";
import Sidebar from "./components/ui/Sidebar";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
          <h2 className="text-3xl font-semibold">Welcome to the Dashboard</h2>
        </main>
      </div>
    </div>
  );
}
