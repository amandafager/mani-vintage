import Footer from "./Footer";
import Header from "./Header";
import Links from "./CategoryLinks";
import React, { useState, useEffect, useRef } from "react";

const Layout = ({ children, allCategories }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const closeMenu = () => {
    if (navbarOpen) setNavbarOpen(!navbarOpen);
  };

  useEffect(() => {
    if (navbarOpen) {
      document.body.classList.add("overflowHidden");
    } else {
      document.body.classList.remove("overflowHidden");
    }
  }, [navbarOpen]);

  return (
    <div className={`layoutContainer`} onClick={closeMenu}>
      <Header
        allCategories={allCategories}
        navbarOpen={navbarOpen}
        handleToggle={handleToggle}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
