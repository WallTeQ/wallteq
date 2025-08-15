import { API } from "./API";

export class AuthService {
  private api;

  constructor(token?: string) {
    this.api = new API(token);
  }

  async Signup(data: { name: string; email: string; password: string }) {
    try {
      const response = await this.api.post("/api/auth/signup", data);
      if (response.error) {
        throw { error: response.error, message: response.message, details: response.details };
      }
      // Return the full response which includes message, token, and user
      return {
        message: response.message,
        token: response.token,
        user: response.user,
        success: true
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

  async completeSignup(data: { email: string; name: string; password: string }) {
    try {
      const response = await this.api.post("/api/auth/signup/complete", data);
      if (response.error) {
        throw { error: response.error, message: response.message, details: response.details };
      }
      return {
        message: response.message,
        token: response.token,
        user: response.user,
        success: true
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

  async resetPassword(data: { email: string; otp: string; newPassword: string }) {
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
      const response = await this.api.post("/api/auth/logout");
      if (response.error) {
        throw { error: response.error, message: response.message };
      }
      return response;
    } catch (error: any) {
      console.error("Error during logout", error);
      throw error; // Re-throw to preserve error details
    }
  }
}
