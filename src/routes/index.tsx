import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import { useAuth } from "../contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoutes";
import Loader from "../components/Loader";

const PageRoutes = () => {
  const { token, user, loading } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();


  const systemUser = user?.role === "admin" || user?.role === "super-admin";

  useEffect(() => {
    if (loading) return;

    // Only run if token and role are truthy and on auth pages
    if (!token || !user?.role) return;
    if (!location.pathname.startsWith("/auth")) return;

    if (systemUser) {
      navigate("/dashboard", { replace: true });
    } else if (user?.role === "user") {
      navigate("/", { replace: true });
    }
  }, [token, user?.role, systemUser, navigate, location.pathname, loading]);

  // Show loading spinner while auth state is being determined
  if (loading) {
<Loader />
  }

  return (
    <Routes>
      {/* Always render the dashboard route if user exists, let ProtectedRoute handle auth */}
      <Route path="/dashboard/*" element={<ProtectedRoute />} />

      {/* All users can access public routes */}
      <Route path="/*" element={<PublicRoutes />} />
    </Routes>
  );
};

export default PageRoutes;