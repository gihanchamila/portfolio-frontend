import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

const BaseLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="lg:h-8 xs:h-0"></div>
      <Header />
      <div className="lg:h-16 xs:h-0"></div>
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
