import { useNavigate } from "react-router-dom"
import { AuthContainer } from "./AuthContainer"
import { useEffect, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"


export default function AuthPage() {
    const navigate = useNavigate()
    const [isRedirecting, setIsRedirecting] = useState(false)
    const { user, token } = useAuth()

    // Check if user is already authenticated on mount
    useEffect(() => {
        

        if (token && user) {
            console.log("🔄 User already authenticated, redirecting...")
            setIsRedirecting(true)

            try {

                if (user?.role === "admin" || user?.role === "super-admin") {
                    navigate("/dashboard")
                } else {
                    navigate("/")
                }
            } catch (error) {
                console.error("Error parsing user data:", error)
                // Clear invalid data
                localStorage.removeItem("auth_token")
                localStorage.removeItem("token")
                localStorage.removeItem("user")
            }
        }
    }, [navigate])

    const handleAuthSuccess = (token: string, user: any) => {
        console.log("🎉 Authentication successful, redirecting user")

        // Prevent multiple redirects
        if (isRedirecting) return

        setIsRedirecting(true)

        // Store user data with consistent keys
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", token)
        localStorage.setItem("auth_token", token) // For consistency with dashboard

        // Small delay to ensure localStorage is written
        setTimeout(() => {
            // Redirect based on user role
            if (user.role === "admin" || user.role === "super-admin") {
                navigate("/dashboard")
            } else {
                navigate("/")
            }
        }, 100)
    }

    // Show loading while redirecting
    if (isRedirecting) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl">Redirecting...</div>
            </div>
        )
    }

    return <AuthContainer onAuthSuccess={handleAuthSuccess} />
}

