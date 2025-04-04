import React from "react";
import BaseLayout from "./BaseLayout";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};

export default PrivateLayout;