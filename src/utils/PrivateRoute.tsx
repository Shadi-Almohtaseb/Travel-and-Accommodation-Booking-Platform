// PrivateRoute.tsx
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { User } = useSelector((state: RootState) => state.authUser);

  if (!User) {
    return <Navigate to="/login" />;
  }

  return children;
};
