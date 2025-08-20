import { useState, useEffect } from "react";
import { API } from "../services/API";
import { Category, CreateCategoryData, UpdateCategoryData } from "../types/category-type";


export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const api = new API();

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/api/categories");
      setCategories(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch categories";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create new category
  const createCategory = async (data: CreateCategoryData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/api/categories", data);

      if (response.category) {
        setCategories((prev) => [...prev, response.category]);
      }

      return response.category;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to create category";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update category
  const updateCategory = async (id: string, data: UpdateCategoryData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.put(`/api/categories/${id}`, data);

      if (response.category) {
        setCategories((prev) =>
          prev.map((cat) => (cat.id === id ? response.category : cat))
        );
      }

      return response.category;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to update category";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const deleteCategory = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/api/categories/${id}`);

      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      return true;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to delete category";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => setError(null);

  // Load categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    clearError,
  };
};
