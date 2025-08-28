


import type React from "react"

import { Sidebar } from "./Sidebar"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Header from "./Header"
import { useAuth } from "../../contexts/AuthContext"
import Loader from "../../components/Loader"

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  //check if logged in user is admin and give access
  useEffect(() => {
    if (user) {
      if (user.role === "admin" || user.role === "super-admin") {
        setIsAuthenticated(true);
      } else {
        navigate("/");
      }
    }
    setIsLoading(false);
  }, [user, navigate]);

  if (isLoading) {
    return <Loader/>
  }

  if (!isAuthenticated) {
    return null
  }

  // Sidebar width values
  const sidebarWidth = isSidebarCollapsed ? 64 : 256; // px (w-16 or w-64)
  const sidebarClass = isSidebarCollapsed ? "w-16" : "w-64";

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

      {/* Sidebar Toggle Button */}
      {/* <button
        onClick={() => setIsSidebarCollapsed((prev) => !prev)}
        className={`rounded-full ring-1 text-gray-500 ring-gray-300 bg-gray-200 h-8 w-8 absolute top-4 left-0 z-50 flex justify-center items-center p-1 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? "ml-2" : "ml-64"}`}
        style={{ transition: "margin-left 0.3s" }}
      >
        <svg className={`h-5 w-5 transform ${isSidebarCollapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button> */}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ease-in-out min-h-screen bg-gray-100 flex flex-col`}
        style={{ marginLeft: sidebarWidth }}
      >
        <Header title="Dashboard" subtitle="Welcome to wallteq dashboard" />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
export default DashboardLayout;
