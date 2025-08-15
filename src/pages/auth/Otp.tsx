"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, ArrowRight, Loader2, RefreshCw } from "lucide-react"
import { AuthService } from "../../services/AuthService"

interface SignupOTPProps {
    email: string
    onSuccess: () => void
    onBack: () => void
}

export function SignupOTP({ email, onSuccess, onBack }: SignupOTPProps) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [isResending, setIsResending] = useState(false)
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

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return // Prevent multiple characters

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }

        console.log("🔢 OTP input changed:", newOtp.join(""))
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
            setError("Please enter the complete 6-digit OTP")
            return
        }

        setIsLoading(true)
        setError("")

        console.log("🔐 Verifying OTP for email:", email, "OTP:", otpString)

        try {
            const response = await authService.verifySignupOTP({
                email,
                otp: otpString,
            })
            console.log("✅ OTP verification successful:", response)

            onSuccess()
        } catch (error: any) {
            console.error("❌ OTP verification failed:", error)
            setError(error.message || error.error || "Invalid OTP. Please try again.")
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

        console.log("🔄 Resending OTP for email:", email)

        try {
            const response = await authService.initiateSignup({ email })
            console.log("✅ OTP resent successfully:", response)

            // Reset countdown
            setCountdown(60)
            setCanResend(false)
            setOtp(["", "", "", "", "", ""])
            inputRefs.current[0]?.focus()
        } catch (error: any) {
            console.error("❌ Failed to resend OTP:", error)
            setError(error.message || error.error || "Failed to resend OTP")
        } finally {
            setIsResending(false)
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Verify Your Email</h1>
                        <p className="text-gray-400 mb-2">We've sent a 6-digit code to</p>
                        <p className="text-blue-400 font-medium">{email}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-white mb-4 text-center">Enter verification code</label>
                            <div className="flex justify-center space-x-2">
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
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                <p className="text-red-400 text-sm text-center">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || otp.join("").length !== 6}
                            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-black disabled:text-gray-400 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Verify Code
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center space-y-3">
                        <p className="text-gray-400 text-sm">Didn't receive the code?</p>

                        {canResend ? (
                            <button
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

                        <button
                            onClick={onBack}
                            className="text-gray-400 hover:text-white font-medium text-sm flex items-center justify-center mx-auto mt-4"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Change Email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
