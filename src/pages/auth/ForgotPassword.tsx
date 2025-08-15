import type React from "react"

import { useState } from "react"
import { Mail, ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { AuthService } from "../../services/AuthService"

interface ForgotPasswordProps {
    onSuccess: (email: string) => void
    onBack: () => void
}

export function ForgotPassword({ onSuccess, onBack }: ForgotPasswordProps) {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const authService = new AuthService()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        console.log("🔄 Requesting password reset for:", email)

        try {
            const response = await authService.forgotPassword({ email })
            console.log("✅ Password reset email sent:", response)

            onSuccess(email)
        } catch (error: any) {
            console.error("❌ Password reset request failed:", error)
            setError(error.message || error.error || "Failed to send reset email")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 mt-12">
            <div className="max-w-md w-full">
                <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
                        <p className="text-gray-400">Enter your email address and we'll send you a code to reset your password</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                    placeholder="Enter your email"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || !email}
                            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white disabled:text-gray-400 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                    Sending Reset Code...
                                </>
                            ) : (
                                <>
                                    Send Reset Code
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </>
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
