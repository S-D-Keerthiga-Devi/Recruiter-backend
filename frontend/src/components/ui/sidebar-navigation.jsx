import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // If using React Router
import Sidebar from './sidebar';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // If using React Router
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigate = (route) => {
    // Option 1: If using React Router
    navigate(route);
    
    // Option 2: If using another navigation method or state-based rendering
    // setCurrentView(route);
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onNavigate={handleNavigate}
      />
      <div className="flex-1 ml-20 md:ml-64">
        {/* Your page content here */}
      </div>
    </div>
  );
}

export default Dashboard;