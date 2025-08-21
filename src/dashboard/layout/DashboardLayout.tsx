// import React, { useState } from "react";
// import Sidebar from "./index";
// import clsx from "clsx";
// import { ChevronRight } from "lucide-react";

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900">
//       {/* Sidebar */}
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Toggle Button */}
//       <button
//         onClick={toggleSidebar}
//         className={clsx(
//           "rounded-full ring-1 dark:text-gray-500 ring-gray-300 dark:ring-gray-600 bg-gray-200 dark:bg-gray-800 h-8 w-8 absolute top-4 left-0 z-50 flex justify-center items-center p-1 transition-all duration-300 ease-in-out",
//           { "motion-rotate-out-180 ml-[11rem]": isSidebarOpen },
//           { "ml-2": !isSidebarOpen }
//         )}
//       >
//         <ChevronRight />
//       </button>

//       {/* Main Content */}
//       <main
//         className={clsx(
//           "absolute right-0 min-h-full bg-gray-100 z-40 dark:bg-gray-900 transition-all duration-300 ease-in-out",
//           { "w-[calc(100vw-12rem)]": isSidebarOpen },
//           { "w-screen": !isSidebarOpen }
//         )}
//       >
//         <div className="relative overflow-auto min-w-full p-8 pt-4">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;


import type React from "react"

import { Sidebar } from "./Sidebar"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Header from "./Header"

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 🚨 DEVELOPMENT MODE - BYPASS AUTH
    // const isDevelopment = process.env.NODE_ENV === "development" || true // Set to true to always bypass

    // if (isDevelopment) {
    //   console.log("🔓 Development mode: Bypassing authentication")

    // Mock user data for development
    // const mockUser = {
    //   id: "dev-user",
    //   name: "Development Admin",
    //   email: "dev@wall-teq.com",
    //   role: "super-admin",
    // }

    // Set mock data in localStorage for consistency
    //   localStorage.setItem("auth_token", "dev-token-123")
    //   localStorage.setItem("user", JSON.stringify(mockUser))

    //   setIsAuthenticated(true)
    //   setIsLoading(false)
    //   return
    // }

    // 🔐 PRODUCTION AUTH CHECK (commented out for development)

    const token = localStorage.getItem("token") || sessionStorage.getItem("token")
    const user = localStorage.getItem("user")

    console.log("🔐 Dashboard auth check:", { token: !!token, user: !!user })
    console.log("logged in user:", user)



    if (!token) {
      console.log("❌ No auth token found, redirecting to auth")
      console.log("token:", token)
      navigate("/auth")
      return
    }

    // Check user role (admin or super-admin only)
    if (user) {
      const userData = JSON.parse(user)
      if (userData.role !== "admin" && userData.role !== "super-admin") {
        console.log("❌ Insufficient permissions, redirecting to home")
        navigate("/")
        return
      }
    }

    setIsAuthenticated(true)
    setIsLoading(false)

  }, [navigate])

  const handleLogout = () => {
    console.log("🚪 Logging out from dashboard")
    localStorage.removeItem("token")
    sessionStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/auth")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
export default DashboardLayout;










