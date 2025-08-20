
import { API } from "./API";

export class AuthService {
  private api: API;

  constructor(token?: string) {
    this.api = new API(token);
    console.log("🔧 AuthService initialized");
  }

  // Method to get stored token
  private getStoredToken(): string | null {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("auth_token") || localStorage.getItem("token")
      );
    }
    return null;
  }

  // Method to store token
  private storeToken(token: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("token", token); // Keep both for compatibility
      this.api.setToken(token);
    }
  }

  // Method to remove token
  private removeToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("token");
      this.api.setToken("");
    }
  }

  async Signup(data: { name: string; email: string; password: string }) {
    try {
      const response = await this.api.post("/api/auth/signup", data);
      if (response.error) {
        throw {
          error: response.error,
          message: response.message,
          details: response.details,
        };
      }

      // Store token after successful signup
      if (response.token) {
        this.storeToken(response.token);
      }

      // Return the full response which includes message, token, and user
      return {
        message: response.message,
        token: response.token,
        user: response.user,
        success: true,
      };
    } catch (error: any) {
      console.error("Error during signup:", error);
      throw error; // Re-throw to preserve error details
    }
  }

  // New 3-step signup process
  async initiateSignup(data: { email: string }) {
    try {
      const response = await this.api.post("/api/auth/signup/initiate", data);
      if (response.error) {
        throw { error: response.error, message: response.message };
      }
      return response;
    } catch (error: any) {
      console.error("Error during signup initiation:", error);
      throw error;
    }
  }

  async verifySignupOTP(data: { email: string; otp: string }) {
    try {
      const response = await this.api.post("/api/auth/signup/verify-otp", data);
      if (response.error) {
        throw { error: response.error, message: response.message };
      }
      return response;
    } catch (error: any) {
      console.error("Error during signup OTP verification:", error);
      throw error;
    }
  }

  async completeSignup(data: {
    email: string;
    name: string;
    password: string;
  }) {
    try {
      const response = await this.api.post("/api/auth/signup/complete", data);
      if (response.error) {
        throw {
          error: response.error,
          message: response.message,
          details: response.details,
        };
      }

      // Store token after successful signup completion
      if (response.token) {
        this.storeToken(response.token);
      }

      return {
        message: response.message,
        token: response.token,
        user: response.user,
        success: true,
      };
    } catch (error: any) {
      console.error("Error during signup completion:", error);
      throw error;
    }
  }

  async login(data: { email: string; password: string }) {
    try {
      const response = await this.api.post("/api/auth/login", data);
      if (response.error) {
        throw { error: response.error, message: response.message };
      }

      // Store token after successful login
      if (response.token) {
        this.storeToken(response.token);
      }

      return response;
    } catch (error: any) {
      console.error("Error during login:", error);
      throw error; // Re-throw to preserve error details
    }
  }

  async forgotPassword(data: { email: string }) {
    try {
      const response = await this.api.post("/api/auth/forgot-password", data);
      if (response.error) {
        throw { error: response.error, message: response.message };
      }
      return response;
    } catch (error: any) {
      console.error("Error during reset", error);
      throw error; // Re-throw to preserve error details
    }
  }

  async verifyOTP(data: { email: string; otp: string }) {
    try {
      const response = await this.api.post("/api/auth/verify-otp", data);
      if (response.error) {
        throw { error: response.error, message: response.message };
      }
      return response;
    } catch (error: any) {
      console.error("Error during OTP verification", error);
      throw error; // Re-throw to preserve error details
    }
  }

  async resetPassword(data: {
    email: string;
    otp: string;
    newPassword: string;
  }) {
    try {
      const response = await this.api.post("/api/auth/reset-password", data);
      if (response.error) {
        throw { error: response.error, message: response.message };
      }
      return response;
    } catch (error: any) {
      console.error("Error during password reset", error);
      throw error; // Re-throw to preserve error details
    }
  }

  async logout() {
    try {
      const response = await this.api.post("/api/auth/logout", {});
      if (response.error) {
        throw { error: response.error, message: response.message };
      }

      // Remove token after successful logout
      this.removeToken();

      return response;
    } catch (error: any) {
      console.error("Error during logout", error);
      // Remove token even if logout fails
      this.removeToken();
      throw error; // Re-throw to preserve error details
    }
  }

  // Method to check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }

  // Method to get current token
  getToken(): string | null {
    return this.getStoredToken();
  }
}
