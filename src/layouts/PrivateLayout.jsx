import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

const PrivateLayout = () => {
  const { admin } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem('apiKey');

  if (location.pathname === '/admin') {
    return (
      <>
        <div className="lg:h-8 xs:h-0" />
        <Header />
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </>
    );
  }

  if (!token || !admin) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return (
    <>
      <div className="lg:h-8 xs:h-0" />
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};

export default PrivateLayout;
