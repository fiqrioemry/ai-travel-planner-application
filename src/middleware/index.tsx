import { Fragment, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Fragment>{children}</Fragment>;
};
