import type React from "react"
import { useState, useEffect } from "react"
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react"
import { AuthService } from "../../services/AuthService"

interface LoginProps {
    onSuccess: (token: string, user: any) => void
    onSwitchToSignup: () => void
    onForgotPassword: () => void
}

export function Login({ onSuccess, onSwitchToSignup, onForgotPassword }: LoginProps) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const authService = new AuthService()

    useEffect(() => {
        console.log("🔧 Environment check:", {
            VITE_SERVER_URL: import.meta.env?.VITE_SERVER_URL,
            NODE_ENV: import.meta.env?.NODE_ENV,
            MODE: import.meta.env?.MODE,
        })
    }, [])

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (error) setError("")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        console.log("🔐 Attempting login for:", formData.email)

        try {
            const response = await authService.login({
                email: formData.email,
                password: formData.password,
            })

            console.log("✅ Login successful:", response)

            // Store token
            if (response.token) {
                if (rememberMe) {
                    localStorage.setItem("token", response.token)
                } else {
                    sessionStorage.setItem("token", response.token)
                }
                onSuccess(response.token, response.user)
            }
        } catch (error: any) {
            console.error("❌ Login failed:", error)
            setError(error.message || error.error || "Login failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 mt-12">
            <div className="max-w-md w-full">
                <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-400">Sign in to your Wall-Teq account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    required
                                    className="w-full bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                    placeholder="Enter your email"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                    required
                                    className="w-full bg-gray-800 border border-gray-700 text-white pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                    placeholder="Enter your password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-400 focus:ring-2"
                                />
                                <span className="ml-2 text-sm text-gray-400">Remember me</span>
                            </label>
                            <button
                                type="button"
                                onClick={onForgotPassword}
                                className="text-sm text-blue-400 hover:text-blue-300"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || !formData.email || !formData.password}
                            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white disabled:text-gray-400 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Don't have an account?{" "}
                            <button onClick={onSwitchToSignup} className="text-blue-400 hover:text-blue-300 font-medium">
                                Create account
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
