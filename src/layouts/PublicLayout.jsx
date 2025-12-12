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
      <Header />
      <div className="lg:h-20 xs:h-0" />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Suspense>
  );
};

export default PublicLayout;
