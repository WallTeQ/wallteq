import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthService } from "../services/AuthService";
import { User } from "../types/iUser";

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: string | null;
  loading: boolean;
  error: string | null;
  validationErrors: string[] | null;
  successMessage: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  // New 3-step signup process
  initiateSignup: (email: string) => Promise<void>;
  verifySignupOTP: (email: string, otp: string) => Promise<void>;
  completeSignup: (email: string, name: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<boolean>;
  clearMessages: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Start as true for initial load
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[] | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const authService = new AuthService(token || undefined);

  useEffect(() => {
    console.log("🔄 [AUTH_CONTEXT] Initializing auth state...")
    // Load user/token from localStorage
    const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");

    console.log("🔄 [AUTH_CONTEXT] Stored token:", storedToken ? "Found" : "None");
    console.log("🔄 [AUTH_CONTEXT] Stored user:", storedUser ? "Found" : "None");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        setRole(parsedUser.role || null);
        console.log("✅ [AUTH_CONTEXT] Auth state restored:", parsedUser.role);
      } catch (error) {
        console.error("❌ [AUTH_CONTEXT] Failed to parse stored user:", error);
        // Clear invalid data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
      }
    }

    setLoading(false); // Done loading initial state
    console.log("✅ [AUTH_CONTEXT] Initialization complete");
  }, []);

  const login = async (email: string, password: string) => {
    console.log("🔐 [AUTH_CONTEXT] Login attempt for:", email);
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await authService.login({ email, password });
      console.log("🔐 [AUTH_CONTEXT] Login response:", res);

      if (res?.token && res?.user) {
        console.log("✅ [AUTH_CONTEXT] Setting auth state");
        setToken(res.token);
        setUser(res.user);
        setRole(res.user.role || null);
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        console.log("✅ [AUTH_CONTEXT] Auth state updated successfully");
      } else if (res?.error) {
        console.error("❌ [AUTH_CONTEXT] Login error:", res.error);
        setError(res.error);
      } else {
        console.error("❌ [AUTH_CONTEXT] Login failed - no token/user");
        setError("Login failed");
      }
    } catch (err: any) {
      console.error("❌ [AUTH_CONTEXT] Login exception:", err);
      // Try to extract error message from server response
      if (err && typeof err === 'object' && err.error) {
        setError(err.error);
      } else if (err && typeof err === 'object' && err.message) {
        setError(err.message);
      } else {
        setError("Login error");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    console.log("🚪 [AUTH_CONTEXT] Logging out");
    try {
      // Call the server logout endpoint
      await authService.logout();
    } catch (err) {
      console.error("Server logout failed:", err);
      // Continue with local logout even if server call fails
    } finally {
      // Clear local state and storage regardless of server response
      setToken(null);
      setUser(null);
      setRole(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      console.log("✅ [AUTH_CONTEXT] Logout complete");
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    setValidationErrors(null);
    setSuccessMessage(null);
    try {
      const res = await authService.Signup({ name, email, password });
      // Only proceed if we have a successful response with token and user
      if (res?.token && res?.user) {
        setToken(res.token);
        setUser(res.user);
        setRole(res.user.role || null);
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        // Set success message from server response
        if (res.message) {
          setSuccessMessage(res.message);
        } else {
          setSuccessMessage("Account created successfully!");
        }
      }
      // Note: No else block here - errors are handled by the service throwing exceptions
    } catch (err: any) {
      // Extract error message and validation details from server response
      if (err && typeof err === 'object') {
        if (err.details && Array.isArray(err.details)) {
          setValidationErrors(err.details);
          setError(err.error || "Validation failed");
        } else if (err.error) {
          setError(err.error);
        } else if (err.message) {
          setError(err.message);
        } else {
          setError("Signup error");
        }
      } else {
        setError("Signup error");
      }
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await authService.forgotPassword({ email });
      return true;
    } catch (err: any) {
      // Extract error message from server response
      if (err && typeof err === 'object' && err.error) {
        setError(err.error);
      } else if (err && typeof err === 'object' && err.message) {
        setError(err.message);
      } else {
        setError("Failed to send OTP");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await authService.verifyOTP({ email, otp });
      return true;
    } catch (err: any) {
      // Extract error message from server response
      if (err && typeof err === 'object' && err.error) {
        setError(err.error);
      } else if (err && typeof err === 'object' && err.message) {
        setError(err.message);
      } else {
        setError("OTP verification failed");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string, otp: string, newPassword: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await authService.resetPassword({ email, otp, newPassword });
      return true;
    } catch (err: any) {
      // Extract error message from server response
      if (err && typeof err === 'object' && err.error) {
        setError(err.error);
      } else if (err && typeof err === 'object' && err.message) {
        setError(err.message);
      } else {
        setError("Password reset failed");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  // New 3-step signup process
  const initiateSignup = async (email: string) => {
    setLoading(true);
    // Only clear messages on success, not at the start
    try {
      const res = await authService.initiateSignup({ email });
      if (res?.message) {
        // Clear previous errors only on success
        setError(null);
        setValidationErrors(null);
        setSuccessMessage(res.message);
      }
    } catch (err: any) {
      // Clear success messages but preserve error context
      setSuccessMessage(null);
      setValidationErrors(null);

      if (err && typeof err === 'object' && err.error) {
        setError(err.error);
      } else if (err && typeof err === 'object' && err.message) {
        setError(err.message);
      } else {
        setError("Failed to send verification email");
      }
    } finally {
      setLoading(false);
    }
  };

  const verifySignupOTP = async (email: string, otp: string) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await authService.verifySignupOTP({ email, otp });
      if (res?.message) {
        setSuccessMessage(res.message);
      }
    } catch (err: any) {
      if (err && typeof err === 'object' && err.error) {
        setError(err.error);
      } else if (err && typeof err === 'object' && err.message) {
        setError(err.message);
      } else {
        setError("OTP verification failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const completeSignup = async (email: string, name: string, password: string) => {
    setLoading(true);
    setError(null);
    setValidationErrors(null);
    setSuccessMessage(null);
    try {
      const res = await authService.completeSignup({ email, name, password });
      if (res?.message || res?.user) {
        // Don't automatically log the user in - just show success message
        // This allows them to manually log in after account creation
        if (res.message) {
          setSuccessMessage(res.message);
        } else {
          setSuccessMessage("Account created successfully! Please log in with your credentials.");
        }
      }
    } catch (err: any) {
      if (err && typeof err === 'object') {
        if (err.details && Array.isArray(err.details)) {
          setValidationErrors(err.details);
          setError(err.error || "Validation failed");
        } else if (err.error) {
          setError(err.error);
        } else if (err.message) {
          setError(err.message);
        } else {
          setError("Signup completion failed");
        }
      } else {
        setError("Signup completion failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setValidationErrors(null);
    setSuccessMessage(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, role, loading, error, validationErrors, successMessage, login, logout, signup, initiateSignup, verifySignupOTP, completeSignup, forgotPassword, verifyOTP, resetPassword, clearMessages }}
    >
      {children}
    </AuthContext.Provider>
  );
};