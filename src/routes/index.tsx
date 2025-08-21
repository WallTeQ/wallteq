import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import { useAuth } from "../contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoutes";

const PageRoutes = () => {
  const { token, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("PageRoutes - token:", token);
  console.log("PageRoutes - role:", role);
  // Fastest check: avoid unnecessary array includes and null checks
  const systemUser = role === "admin" || role === "super-admin";

  useEffect(() => {
    // Only run if token and role are truthy and on auth pages
    if (!token || !role) return;
    if (!location.pathname.startsWith("/auth")) return;

    if (systemUser) {
      navigate("/dashboard", { replace: true });
    } else if (role === "user") {
      navigate("/", { replace: true });
    }
  }, [token, role, systemUser, navigate, location.pathname]);

  return (
    <Routes>
      {/* Only authenticated users with proper roles can access dashboard */}
      {token && systemUser && (
        <Route path="/dashboard/*" element={<ProtectedRoute />} />
      )}
      {/* All users can access public routes */}
      <Route path="/*" element={<PublicRoutes />} />
    </Routes>
  );
};

export default PageRoutes;
