


import type React from "react"

import { Sidebar } from "./Sidebar"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Header from "./Header"
import { useAuth } from "../../contexts/AuthContext"

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


// import { Sidebar } from "./Sidebar"
// import { useNavigate } from "react-router-dom"
// import { useState, useEffect } from "react"
// import Header from "./Header"
// import type React from "react"
// import { useCallback } from "react"

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const navigate = useNavigate()
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [isRedirecting, setIsRedirecting] = useState(false)

//   useEffect(() => {
//     let isMounted = true

//     const checkAuthentication = () => {
//       // 🚨 DEVELOPMENT MODE - BYPASS AUTH
//       // const isDevelopment = process.env.NODE_ENV === "development" || true // Set to true to always bypass

//       // if (isDevelopment) {
//       //   console.log("🔓 Development mode: Bypassing authentication")

//       //   // Mock user data for development
//       //   const mockUser = {
//       //     id: "dev-user",
//       //     name: "Development Admin",
//       //     email: "dev@wall-teq.com",
//       //     role: "super-admin",
//       //   }

//       //   // Set mock data in localStorage for consistency
//       //   localStorage.setItem("auth_token", "dev-token-123")
//       //   localStorage.setItem("user", JSON.stringify(mockUser))

//       //   if (isMounted) {
//       //     setIsAuthenticated(true)
//       //     setIsLoading(false)
//       //   }
//       //   return
//       // }

//       // 🔐 PRODUCTION AUTH CHECK (commented out for development)
//       /*
//       const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token")
//       const user = localStorage.getItem("user")

//       console.log("🔐 Dashboard auth check:", { token: !!token, user: !!user })

//       if (!token) {
//         console.log("❌ No auth token found, redirecting to auth")
//         if (isMounted && !isRedirecting) {
//           setIsRedirecting(true)
//           router.replace("/auth")
//         }
//         return
//       }

//       // Check user role (admin or super-admin only)
//       if (user) {
//         try {
//           const userData = JSON.parse(user)
//           if (userData.role !== "admin" && userData.role !== "super-admin") {
//             console.log("❌ Insufficient permissions, redirecting to home")
//             if (isMounted && !isRedirecting) {
//               setIsRedirecting(true)
//               router.replace("/")
//             }
//             return
//           }
//         } catch (error) {
//           console.error("Error parsing user data:", error)
//           // Clear invalid data and redirect
//           localStorage.removeItem("auth_token")
//           sessionStorage.removeItem("auth_token")
//           localStorage.removeItem("user")
//           if (isMounted && !isRedirecting) {
//             setIsRedirecting(true)
//             router.replace("/auth")
//           }
//           return
//         }
//       }

//       if (isMounted) {
//         setIsAuthenticated(true)
//         setIsLoading(false)
//       }
//       */
//     }

//     checkAuthentication()

//     return () => {
//       isMounted = false
//     }
//   }, [navigate, isRedirecting])

//   const handleLogout = useCallback(() => {
//     console.log("🚪 Logging out from dashboard")

//     // Prevent multiple logout attempts
//     if (isRedirecting) return

//     setIsRedirecting(true)

//     // Clear all auth data
//     localStorage.removeItem("auth_token")
//     sessionStorage.removeItem("auth_token")
//     localStorage.removeItem("token")
//     sessionStorage.removeItem("token")
//     localStorage.removeItem("user")

//     // Reset state
//     setIsAuthenticated(false)

//     // Redirect to auth page
//     navigate("/auth")
//   }, [navigate, isRedirecting])

//   if (isLoading || isRedirecting) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
//       </div>
//     )
//   }

//   if (!isAuthenticated) {
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       <Sidebar onLogout={handleLogout} />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header title="Dashboard" subtitle="Welcome to your dashboard" />
//         <main className="flex-1 overflow-y-auto p-6">{children}</main>
//       </div>
//     </div>
//   )
// }









