import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

const BaseLayout = ({ children, topSpacing = 'lg:h-8 xs:h-0', headerSpacing = '' }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className={topSpacing} />
      <Header />
      {headerSpacing && <div className={headerSpacing} />}
      <Main />
      <Footer />
    </div>
  );
};

export default BaseLayout;
