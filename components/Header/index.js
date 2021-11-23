import Navbar from "@components/Navbar";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import React, { useState, useEffect, useRef } from "react";
import { useShoppingCart } from "use-shopping-cart";

const Header = ({ handleToggle, navbarOpen, mainMeny, collectionMeny }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { cartCount } = useShoppingCart();

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
    <header className={styles.header}>
      <div className={styles.siteLogoWrapper} ref={containerRef}>
        <Link href='/'>
          <a aria-label='Mani Vintage'>
            <img className={styles.siteLogo} src='/MANI-logotype.png' />
          </a>
        </Link>
      </div>
      <div className={styles.lineDecoration}></div>

      <div className={styles.stickyWrapper}>
        <div className={styles.sticky}>
          <div className={styles.group}>
            <button
              className={`${styles.buttonMenu} ${
                navbarOpen ? styles.open : ""
              }`}
              aria-label='Mobile Navigation Button'
              aria-haspopup='true'
              aria-expanded={`${navbarOpen ? "true" : "false"}`}
              onClick={handleToggle}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div
            className={`${styles.scrollLogo} ${
              isVisible ? styles.fadeOut : styles.fadeInLogo
            }`}
          >
            <Link href='/'>
              <a>
                <img
                  className={styles.scrollsiteLogo}
                  src='/MANI-logotype-scroll.png'
                />
              </a>
            </Link>
          </div>
          <div className={styles.group}>
            <Link href='/cart'>
              <a className={styles.cartIcon}>
                <Image src='/bag.svg' height={28} width={28} />
                <span>({cartCount})</span>
              </a>
            </Link>
          </div>
        </div>

        <div
          className={`${styles.navSidebarWrapper} ${
            navbarOpen ? styles.navBarOpen : ""
          }`}
          onClick={handleToggle}
        >
          <Navbar mainMeny={mainMeny} collectionMeny={collectionMeny} />
        </div>
      </div>
    </header>
  );
};

export default Header;
