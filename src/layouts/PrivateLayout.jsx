import React from "react";
import BaseLayout from "./BaseLayout";
import { Outlet, Navigate } from "react-router-dom";

const PrivateLayout = () => {

  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};

export default PrivateLayout;