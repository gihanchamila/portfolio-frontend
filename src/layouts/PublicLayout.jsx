import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import CircleLoader from '../components/utils/CircleLoader';
import { Suspense } from 'react';

const PublicLayout = () => {
  return (
    <Suspense fallback={<CircleLoader />}>
      <div className="lg:h-6 xs:h-0" />
      <Header />
      <div className="lg:h-16 xs:h-16" />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Suspense>
  );
};

export default PublicLayout;
