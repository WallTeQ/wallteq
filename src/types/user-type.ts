// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "super-admin" | "admin" | "user";
  suspended: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: "super-admin" | "admin" | "user";
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: "super-admin" | "admin" | "user";
}

export interface UserStats {
  total: number;
  superAdmins: number;
  admins: number;
  users: number;
  suspended: number;
  active: number;
}
