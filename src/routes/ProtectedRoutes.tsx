import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import AdminRoutes from "./AdminRoutes";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import InvalidRole from "../pages/InvalidRole";

const ProtectedRoute: React.FC = () => {
  const { token, user, loading } = useAuth();

  console.log("ProtectedRoute token:", token);
  console.log("ProtectedRoute - role:", user?.role);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  let RoutesComponent;
  switch (user?.role) {
    case "super-admin":
    case "admin":
      RoutesComponent = <AdminRoutes />;
      break;
    default:
      RoutesComponent = <InvalidRole />;
  }

  return <DashboardLayout>{RoutesComponent}</DashboardLayout>;
};

export default ProtectedRoute;