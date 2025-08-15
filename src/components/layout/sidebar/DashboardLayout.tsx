import React, { useState } from "react";
import Sidebar from "./index";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={clsx(
          "rounded-full ring-1 dark:text-gray-500 ring-gray-300 dark:ring-gray-600 bg-gray-200 dark:bg-gray-800 h-8 w-8 absolute top-4 left-0 z-50 flex justify-center items-center p-1 transition-all duration-300 ease-in-out",
          { "motion-rotate-out-180 ml-[11rem]": isSidebarOpen },
          { "ml-2": !isSidebarOpen }
        )}
      >
        <ChevronRight />
      </button>

      {/* Main Content */}
      <main
        className={clsx(
          "absolute right-0 min-h-full bg-gray-100 z-40 dark:bg-gray-900 transition-all duration-300 ease-in-out",
          { "w-[calc(100vw-12rem)]": isSidebarOpen },
          { "w-screen": !isSidebarOpen }
        )}
      >
        <div className="relative overflow-auto min-w-full p-8 pt-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
