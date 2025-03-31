import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

const BaseLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default BaseLayout;