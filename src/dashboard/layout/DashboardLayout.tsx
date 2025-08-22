


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
    <Loader/>
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
