import Navbar from "./Navbar";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const Header = ({ allCategories, handleToggle, navbarOpen }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  const options = {
    root: null,
    rootMargin: "300px",
    threshold: 1.0,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return (
    <header className='header'>
      <div className='siteLogoWrapper' ref={containerRef}>
        <Link href='/'>
          <a aria-label='Mani Vintage'>
            <img className='siteLogo' src='/MANI-logotype.png' />
          </a>
        </Link>
      </div>
      <div className={`sticky-wrapper`}>
        <div className='sticky'>
          <div className='group'>
            <button
              className={`button-menu ${navbarOpen ? "open" : ""}`}
              aria-label='Mobile Navigation Button'
              aria-haspopup='true'
              aria-expanded={`${navbarOpen ? "true" : "false"}`}
              onClick={handleToggle}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div>Search</div>
          </div>
          <div className={`scrollLogo ${isVisible ? "fadeOut" : "fadeInLogo"}`}>
            <Link href='/'>
              <a>
                <img
                  className='ScrollsiteLogo'
                  src='/MANI-logotype-scroll.png'
                />
              </a>
            </Link>
          </div>
          <div className='group'>
            <div>Love</div>
            <div>Cart</div>
          </div>
        </div>

        <div
          className={`NavSidebarWrapper ${navbarOpen ? "NavBarOpen" : ""}`}
          onClick={handleToggle}
        >
          <Navbar allCategories={allCategories} />
        </div>
      </div>
    </header>
  );
};

export default Header;
