"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Lock, Eye, EyeOff, ArrowLeft, Loader2, CheckCircle, RefreshCw } from "lucide-react"
import { AuthService } from "../../services/AuthService"

interface ResetPasswordProps {
    email: string
    onSuccess: () => void
    onBack: () => void
}

export function ResetPassword({ email, onSuccess, onBack }: ResetPasswordProps) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [error, setError] = useState("")
    const [countdown, setCountdown] = useState(60)
    const [canResend, setCanResend] = useState(false)

    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const authService = new AuthService()

    // Countdown timer for resend OTP
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            setCanResend(true)
        }
    }, [countdown])

    const validatePassword = (password: string) => {
        const errors: string[] = []
        if (password.length < 8) errors.push("At least 8 characters")
        if (!/[A-Z]/.test(password)) errors.push("One uppercase letter")
        if (!/[a-z]/.test(password)) errors.push("One lowercase letter")
        if (!/\d/.test(password)) errors.push("One number")
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("One special character")
        return errors
    }

    const passwordErrors = validatePassword(password)
    const isPasswordValid = passwordErrors.length === 0
    const doPasswordsMatch = password === confirmPassword

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }

        console.log("🔢 Reset OTP input changed:", newOtp.join(""))
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const otpString = otp.join("")

        if (otpString.length !== 6) {
            setError("Please enter the complete 6-digit code")
            return
        }

        if (!isPasswordValid) {
            setError("Password doesn't meet requirements")
            return
        }

        if (!doPasswordsMatch) {
            setError("Passwords don't match")
            return
        }

        setIsLoading(true)
        setError("")

        console.log("🔐 Resetting password for:", email, "with OTP:", otpString)

        try {
            const response = await authService.resetPassword({
                email,
                otp: otpString,
                newPassword: password,
            })

            console.log("✅ Password reset successful:", response)
            onSuccess()
        } catch (error: any) {
            console.error("❌ Password reset failed:", error)
            setError(error.message || error.error || "Failed to reset password")
            // Clear OTP on error
            setOtp(["", "", "", "", "", ""])
            inputRefs.current[0]?.focus()
        } finally {
            setIsLoading(false)
        }
    }

    const handleResendOTP = async () => {
        setIsResending(true)
        setError("")

        console.log("🔄 Resending reset code for:", email)

        try {
            const response = await authService.forgotPassword({ email })
            console.log("✅ Reset code resent:", response)

            setCountdown(60)
            setCanResend(false)
            setOtp(["", "", "", "", "", ""])
            inputRefs.current[0]?.focus()
        } catch (error: any) {
            console.error("❌ Failed to resend reset code:", error)
            setError(error.message || error.error || "Failed to resend code")
        } finally {
            setIsResending(false)
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 mt-12">
            <div className="max-w-md w-full">
                <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Reset Your Password</h1>
                        <p className="text-gray-400 mb-2">Enter the code sent to</p>
                        <p className="text-blue-400 font-medium">{email}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* OTP Input */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-4 text-center">Enter verification code</label>
                            <div className="flex justify-center space-x-2 mb-4">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-12 h-12 bg-gray-800 border border-gray-700 text-white text-center text-lg font-semibold rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                        disabled={isLoading}
                                    />
                                ))}
                            </div>

                            {/* Resend Code */}
                            <div className="text-center">
                                {canResend ? (
                                    <button
                                        type="button"
                                        onClick={handleResendOTP}
                                        disabled={isResending}
                                        className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center justify-center mx-auto"
                                    >
                                        {isResending ? (
                                            <>
                                                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                                Resending...
                                            </>
                                        ) : (
                                            <>
                                                <RefreshCw className="h-4 w-4 mr-2" />
                                                Resend Code
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <p className="text-gray-500 text-sm">Resend code in {countdown}s</p>
                                )}
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-700 text-white pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                    placeholder="Enter new password"
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
                            {password && (
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
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-700 text-white pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                    placeholder="Confirm new password"
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

                            {confirmPassword && (
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
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                <p className="text-red-400 text-sm text-center">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || otp.join("").length !== 6 || !isPasswordValid || !doPasswordsMatch}
                            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white disabled:text-gray-400 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                    Resetting Password...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={onBack}
                            className="text-gray-400 hover:text-white font-medium text-sm flex items-center justify-center mx-auto"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
