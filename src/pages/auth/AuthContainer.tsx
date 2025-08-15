"use client"

import { useState } from "react"
import { SignupInitiate } from "./SignUp"
import { SignupOTP } from "./Otp"
import { SignupComplete } from "./SignupComplete"
import { Login } from "./login"
import { ForgotPassword } from "./ForgotPassword"
import { ResetPassword } from "./ResetPassword"

type AuthStep = "login" | "signup-initiate" | "signup-otp" | "signup-complete" | "forgot-password" | "reset-password"

interface AuthContainerProps {
    onAuthSuccess: (token: string, user: any) => void
}

export function AuthContainer({ onAuthSuccess }: AuthContainerProps) {
    const [currentStep, setCurrentStep] = useState<AuthStep>("login")
    const [email, setEmail] = useState("")

    console.log("🔄 Current auth step:", currentStep, "Email:", email)

    const handleSignupInitiated = (userEmail: string) => {
        console.log("📧 Signup initiated for:", userEmail)
        setEmail(userEmail)
        setCurrentStep("signup-otp")
    }

    const handleOTPVerified = () => {
        console.log("✅ OTP verified, moving to complete signup")
        setCurrentStep("signup-complete")
    }

    const handleSignupCompleted = (token: string, user: any) => {
        console.log("🎉 Signup completed successfully")
        onAuthSuccess(token, user)
    }

    const handleLoginSuccess = (token: string, user: any) => {
        console.log("🎉 Login successful")
        onAuthSuccess(token, user)
    }

    const handleForgotPasswordInitiated = (userEmail: string) => {
        console.log("🔄 Password reset initiated for:", userEmail)
        setEmail(userEmail)
        setCurrentStep("reset-password")
    }

    const handlePasswordResetSuccess = () => {
        console.log("✅ Password reset successful, returning to login")
        setCurrentStep("login")
        setEmail("")
    }

    const resetToLogin = () => {
        console.log("🔙 Returning to login")
        setCurrentStep("login")
        setEmail("")
    }

    switch (currentStep) {
        case "signup-initiate":
            return <SignupInitiate onSuccess={handleSignupInitiated} onSwitchToLogin={() => setCurrentStep("login")} />

        case "signup-otp":
            return <SignupOTP email={email} onSuccess={handleOTPVerified} onBack={() => setCurrentStep("signup-initiate")} />

        case "signup-complete":
            return <SignupComplete email={email} onSuccess={handleSignupCompleted} />

        case "forgot-password":
            return <ForgotPassword onSuccess={handleForgotPasswordInitiated} onBack={resetToLogin} />

        case "reset-password":
            return <ResetPassword email={email} onSuccess={handlePasswordResetSuccess} onBack={resetToLogin} />

        default: // login
            return (
                <Login
                    onSuccess={handleLoginSuccess}
                    onSwitchToSignup={() => setCurrentStep("signup-initiate")}
                    onForgotPassword={() => setCurrentStep("forgot-password")}
                />
            )
    }
}
