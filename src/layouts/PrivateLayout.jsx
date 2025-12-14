import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BaseLayout from './BaseLayout';

const PrivateLayout = () => {
  const { admin } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem('apiKey');

  if (location.pathname === '/admin') {
    return (
      <BaseLayout topSpacing="lg:h-8 xs:h-0">
        <Outlet />
      </BaseLayout>
    );
  }

  if (!token || !admin) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return (
    <BaseLayout topSpacing="lg:h-8 xs:h-0">
      <Outlet />
    </BaseLayout>
  );
};

export default PrivateLayout;
