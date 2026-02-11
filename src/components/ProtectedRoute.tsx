import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, hasCompany } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!hasCompany) return <Navigate to="/select-company" replace />;

  return <>{children}</>;
}
