import { useState, useEffect } from "react";
import { API } from "../services/API";
import { Cart } from "../types/cart-type";

export const useCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const api = new API();

  // Get user's cart
  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/cart");
      setCart(response.cart || response.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch cart");
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  // Add templates to cart
  const addToCart = async (templateIds: string[]): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/api/cart/add", { templateIds });
      setCart(response.cart || response.data);
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to add to cart");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Add single template to cart
  const addTemplateToCart = async (templateId: string): Promise<boolean> => {
    return await addToCart([templateId]);
  };

  // Remove template from cart
  const removeFromCart = async (templateId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/api/cart/remove/${templateId}`);
      setCart(response.cart || response.data);
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to remove from cart");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Clear entire cart
  const clearCart = async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete("/api/cart/clear");
      setCart(response.cart || response.data);
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to clear cart");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get cart total price
  const getCartTotal = (): number => {
    if (!cart || !cart.templates) return 0;
    return cart.templates.reduce(
      (total, template) => total + template.price,
      0
    );
  };

  // Get cart item count
  const getCartItemCount = (): number => {
    if (!cart || !cart.templates) return 0;
    return cart.templates.length;
  };

  // Check if template is in cart
  const isTemplateInCart = (templateId: string): boolean => {
    if (!cart || !cart.templates) return false;
    return cart.templates.some((template) => template.id === templateId);
  };

  // Auto-fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  return {
    // State
    cart,
    loading,
    error,

    // Cart operations
    fetchCart,
    addToCart,
    addTemplateToCart,
    removeFromCart,
    clearCart,

    // Utility functions
    getCartTotal,
    getCartItemCount,
    isTemplateInCart,
    clearError: () => setError(null),
  };
};
