import Footer from "./Footer";
import Header from "./Header";
import React, { useState, useEffect } from "react";

const Layout = ({ children, pageProps: { navigation, ...pageProps } }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const closeMenu = () => {
    if (navbarOpen) setNavbarOpen(!navbarOpen);
  };

  useEffect(() => {
    if (navbarOpen) {
      //document.body.style.overflow = "hidden";
      document.body.classList.add("overflowHidden");
    } else {
      //document.body.style.overflow = "unset";
      document.body.classList.remove("overflowHidden");
    }
  }, [navbarOpen]);

  const collectionMeny = navigation.find(
    (item) => item.navId === "collection-menu"
  );
  const mainMeny = navigation.find((item) => item.navId === "main-menu");
  const footerMeny = navigation.find((item) => item.navId === "footer-menu");

  return (
    <div className={`layoutContainer`} onClick={closeMenu}>
      <Header
        collectionMeny={collectionMeny}
        mainMeny={mainMeny}
        navbarOpen={navbarOpen}
        handleToggle={handleToggle}
      />
      <main>{children}</main>
      <Footer footerMeny={footerMeny} />
    </div>
  );
};

export default Layout;
