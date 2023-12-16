// PrivateRoute.tsx
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateUserRoute = ({ children }: PrivateRouteProps) => {
  const { User } = useSelector((state: RootState) => state.authUser);

  if (!User || User.userType !== "User") {
    return <Navigate to="/login" />;
  }

  return children;
};

export const PrivateAdminRoute = ({ children }: PrivateRouteProps) => {
  const { User } = useSelector((state: RootState) => state.authUser);

  if (!User || User.userType !== "Admin") {
    return <Navigate to="/login" />;
  }

  return children;
};
