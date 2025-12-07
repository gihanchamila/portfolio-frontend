import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

const PublicLayout = () => {
  return (
    <div className="min-h-screen">
      <div className="lg:h-8 xs:h-0" />
      <Header />
      <div className="lg:h-16 xs:h-0" />

      <Main>
        <Outlet />
      </Main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
