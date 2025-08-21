import { useNavigate } from "react-router-dom"
import { AuthContainer } from "./AuthContainer"

export default function AuthPage() {
    const navigate = useNavigate()

    const handleAuthSuccess = (token: string, user: any) => {
        console.log("🎉 Authentication successful, redirecting user")

        // Store user data if needed
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", token)

        // Redirect based on user role
        if (user.role === "admin" || user.role === "super-admin") {
            navigate("/dashboard")
        } else {
            navigate("/")
        }
    }

    return <AuthContainer onAuthSuccess={handleAuthSuccess} />
}
