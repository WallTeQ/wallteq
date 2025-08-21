export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  suspended?: boolean;
  authorProfile?: {
    id: string;
    name: string;
  };
}

export interface UserRowProps {
  user: User;
  index: number;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onSuspend: (user: User) => void;
}

export interface AuthContextType {
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
