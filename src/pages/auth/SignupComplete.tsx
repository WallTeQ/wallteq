import type React from "react"

import { useState } from "react"
import { User, Lock, Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react"
import { AuthService } from "../../services/AuthService"

interface SignupCompleteProps {
    email: string
    onSuccess: (token: string, user: any) => void
}

export function SignupComplete({ email, onSuccess }: SignupCompleteProps) {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})

    const authService = new AuthService()

    const validatePassword = (password: string) => {
        const errors: string[] = []
        if (password.length < 8) errors.push("At least 8 characters")
        if (!/[A-Z]/.test(password)) errors.push("One uppercase letter")
        if (!/[a-z]/.test(password)) errors.push("One lowercase letter")
        if (!/\d/.test(password)) errors.push("One number")
        if (!/[!@#$%^&*(),?":{}|<>]/.test(password)) errors.push("One special character")
        return errors
    }

    const passwordErrors = validatePassword(formData.password)
    const isPasswordValid = passwordErrors.length === 0
    const doPasswordsMatch = formData.password === formData.confirmPassword

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear field-specific errors when user starts typing
        if (fieldErrors[field]) {
            setFieldErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setFieldErrors({})

        // Validate form
        const errors: { [key: string]: string } = {}

        if (!formData.name.trim()) {
            errors.name = "Name is required"
        }

        if (!isPasswordValid) {
            errors.password = "Password doesn't meet requirements"
        }

        if (!doPasswordsMatch) {
            errors.confirmPassword = "Passwords don't match"
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            setIsLoading(false)
            return
        }

        console.log("🎯 Completing signup for:", { email, name: formData.name })

        try {
            const response = await authService.completeSignup({
                email,
                name: formData.name.trim(),
                password: formData.password,
            })

            console.log("✅ Signup completed successfully:", response)

            // Store token and redirect
            if (response.token) {
                localStorage.setItem("token", response.token)
                onSuccess(response.token, response.user)
            }
        } catch (error: any) {
            console.error("❌ Signup completion failed:", error)

            // Handle validation errors from server
            if (error.details && Array.isArray(error.details)) {
                const serverErrors: { [key: string]: string } = {}
                error.details.forEach((detail: any) => {
                    if (detail.field) {
                        serverErrors[detail.field] = detail.message
                    }
                })
                setFieldErrors(serverErrors)
            } else {
                setError(error.message || error.error || "Failed to complete signup")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 pb-6 pt-12">
            <div className="max-w-md w-full">
                <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="h-8 w-8 text-blue-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Complete Your Account</h1>
                        <p className="text-gray-400">
                            Email verified for <span className="text-blue-400">{email}</span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    className={`w-full bg-gray-800 border ${fieldErrors.name ? "border-red-500" : "border-gray-700"} text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400`}
                                    placeholder="Enter your full name"
                                    disabled={isLoading}
                                />
                            </div>
                            {fieldErrors.name && <p className="text-red-400 text-sm mt-1">{fieldErrors.name}</p>}
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
                                    className={`w-full bg-gray-800 border ${fieldErrors.password ? "border-red-500" : "border-gray-700"} text-white pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400`}
                                    placeholder="Create a strong password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>

                            {/* Password Requirements */}
                            {formData.password && (
                                <div className="mt-2 space-y-1">
                                    {passwordErrors.map((error, index) => (
                                        <p key={index} className="text-red-400 text-xs flex items-center">
                                            <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                                            {error}
                                        </p>
                                    ))}
                                    {isPasswordValid && (
                                        <p className="text-blue-400 text-xs flex items-center">
                                            <CheckCircle className="h-3 w-3 mr-2" />
                                            Password meets all requirements
                                        </p>
                                    )}
                                </div>
                            )}

                            {fieldErrors.password && <p className="text-red-400 text-sm mt-1">{fieldErrors.password}</p>}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                    className={`w-full bg-gray-800 border ${fieldErrors.confirmPassword ? "border-red-500" : "border-gray-700"} text-white pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400`}
                                    placeholder="Confirm your password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>

                            {formData.confirmPassword && (
                                <div className="mt-1">
                                    {doPasswordsMatch ? (
                                        <p className="text-blue-400 text-xs flex items-center">
                                            <CheckCircle className="h-3 w-3 mr-2" />
                                            Passwords match
                                        </p>
                                    ) : (
                                        <p className="text-red-400 text-xs">Passwords don't match</p>
                                    )}
                                </div>
                            )}

                            {fieldErrors.confirmPassword && (
                                <p className="text-red-400 text-sm mt-1">{fieldErrors.confirmPassword}</p>
                            )}
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || !formData.name || !isPasswordValid || !doPasswordsMatch}
                            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white disabled:text-gray-400 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                    Creating Account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
