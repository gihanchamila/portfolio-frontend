import React from "react";
import BaseLayout from "./BaseLayout";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};

export default PublicLayout;