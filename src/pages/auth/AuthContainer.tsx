import { useCallback, useState } from "react"
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

    const handleSignupInitiated = useCallback((userEmail: string) => {
        console.log("📧 Signup initiated for:", userEmail)
        setEmail(userEmail)
        setCurrentStep("signup-otp")
    }, [])

    const handleOTPVerified = useCallback(() => {
        console.log("✅ OTP verified, moving to complete signup")
        setCurrentStep("signup-complete")
    }, [])

    const handleSignupCompleted = useCallback(
        (token: string, user: any) => {
            console.log("🎉 Signup completed successfully")
            onAuthSuccess(token, user)
        },
        [onAuthSuccess],
    )

    const handleLoginSuccess = useCallback(
        (token: string, user: any) => {
            console.log("🎉 Login successful")
            onAuthSuccess(token, user)
        },
        [onAuthSuccess],
    )

    const handleForgotPasswordInitiated = useCallback((userEmail: string) => {
        console.log("🔄 Password reset initiated for:", userEmail)
        setEmail(userEmail)
        setCurrentStep("reset-password")
    }, [])

    const handlePasswordResetSuccess = useCallback(() => {
        console.log("✅ Password reset successful, returning to login")
        setCurrentStep("login")
        setEmail("")
    }, [])

    const resetToLogin = useCallback(() => {
        console.log("🔙 Returning to login")
        setCurrentStep("login")
        setEmail("")
    }, [])

    const switchToLogin = useCallback(() => setCurrentStep("login"), [])
    const switchToSignup = useCallback(() => setCurrentStep("signup-initiate"), [])
    const switchToForgotPassword = useCallback(() => setCurrentStep("forgot-password"), [])
    const backToSignupInitiate = useCallback(() => setCurrentStep("signup-initiate"), [])

    switch (currentStep) {
        case "signup-initiate":
            return <SignupInitiate onSuccess={handleSignupInitiated} onSwitchToLogin={switchToLogin} />

        case "signup-otp":
            return <SignupOTP email={email} onSuccess={handleOTPVerified} onBack={backToSignupInitiate} />

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
                    onSwitchToSignup={switchToSignup}
                    onForgotPassword={switchToForgotPassword}
                />
            )
    }
}
