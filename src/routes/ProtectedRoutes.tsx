import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import AdminRoutes from "./AdminRoutes";
import DashboardLayout from "../components/layout/sidebar/DashboardLayout";
import InvalidRole from "../pages/InvalidRole";

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const { token, role } = useAuth();

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