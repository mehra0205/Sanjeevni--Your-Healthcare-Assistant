import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  admin = false,
  doctor = false,
}) {
  const token = localStorage.getItem("sanjeevni_token");
  const user = JSON.parse(localStorage.getItem("sanjeevni_user") || "null");

  // User is not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Admin-only route
  if (admin && user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // Doctor-only route
  if (doctor && user?.role !== "doctor") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}