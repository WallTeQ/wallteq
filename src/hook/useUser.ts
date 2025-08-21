import { useState, useEffect } from "react";
import { API } from "../services/API";
import { CreateUserData, UpdateUserData, User, UserStats } from "../types/user-type";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [api] = useState(() => new API());

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/users");
      setUsers(response);
    } catch (err: any) {
      console.error("Failed to fetch users:", err);
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Create new user
  const createUser = async (userData: CreateUserData): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/api/users", userData);
      const newUser = response.user;
      setUsers((prev) => [...prev, newUser]);
      return newUser;
    } catch (err: any) {
      console.error("Failed to create user:", err);
      setError(err.message || "Failed to create user");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update user
  const updateUser = async (
    userId: string,
    userData: UpdateUserData
  ): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/api/users/${userId}`, userData);
      const updatedUser = response.user;
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? updatedUser : user))
      );
      return updatedUser;
    } catch (err: any) {
      console.error("Failed to update user:", err);
      setError(err.message || "Failed to update user");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Suspend user
  const suspendUser = async (userId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await api.post(`/api/users/${userId}/suspend`, {});
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, suspended: true } : user
        )
      );
      return true;
    } catch (err: any) {
      console.error("Failed to suspend user:", err);
      setError(err.message || "Failed to suspend user");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Unsuspend user
  const unsuspendUser = async (userId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await api.post(`/api/users/${userId}/unsuspend`, {});
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, suspended: false } : user
        )
      );
      return true;
    } catch (err: any) {
      console.error("Failed to unsuspend user:", err);
      setError(err.message || "Failed to unsuspend user");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (userId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/api/users/${userId}`);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      return true;
    } catch (err: any) {
      console.error("Failed to delete user:", err);
      setError(err.message || "Failed to delete user");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Utility functions
  const getUsersByRole = (role: string): User[] => {
    return users.filter((user) => user.role === role);
  };

  const getSuspendedUsers = (): User[] => {
    return users.filter((user) => user.suspended);
  };

  const getActiveUsers = (): User[] => {
    return users.filter((user) => !user.suspended);
  };

  const getUserStats = (): UserStats => {
    return {
      total: users.length,
      active: users.filter((user) => !user.suspended).length,
      suspended: users.filter((user) => user.suspended).length,
      admins: users.filter((user) => user.role === "admin").length,
      superAdmins: users.filter((user) => user.role === "super-admin").length,
      users: users.filter((user) => user.role === "user").length,
    };
  };

  const findUserById = (userId: string): User | undefined => {
    return users.find((user) => user.id === userId);
  };

  const clearError = () => {
    setError(null);
  };

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    suspendUser,
    unsuspendUser,
    deleteUser,
    getUsersByRole,
    getSuspendedUsers,
    getActiveUsers,
    getUserStats,
    findUserById,
    clearError,
  };
}

