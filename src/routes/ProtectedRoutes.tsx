import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import AdminRoutes from "./AdminRoutes";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import InvalidRole from "../pages/InvalidRole";

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const { token, role } = useAuth();
  console.log("ProtectedRoute token:", token);
  console.log("ProtectedRoute - token exists:", !!token);
  console.log("ProtectedRoute - role:", role);
  console.log("ProtectedRoute - rendering DashboardLayout");


  if (!token) {
    // If not authenticated, do not render protected routes. Public routes will be rendered by the main router.
    return null;
  }

  let RoutesComponent;
  switch (role) {
    case "super-admin":
      RoutesComponent = <AdminRoutes />;
      break;
    case "admin":
      RoutesComponent = <AdminRoutes />;
      break;
    default:
      RoutesComponent = <InvalidRole />;
  }

  return <DashboardLayout>{RoutesComponent}</DashboardLayout>;
};

export default ProtectedRoute;