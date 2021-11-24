import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

const Footer = ({ footerMeny }) => {
  const { navItems } = footerMeny;

  return (
    <footer className={styles.footer}>
      <div className={styles.lineDecoration}></div>
      <div className={styles.footerContent}>
        <div className={styles.navigation}>
          {navItems &&
            navItems.map((item, index) => (
              <ul key={index} className={styles.navBlock}>
                <li className={styles.navBlockAnchor}>
                  <Link href={`/${item.slug}`}>
                    <a>{item.title}</a>
                  </Link>
                </li>
                {item.pageSections &&
                  item.pageSections.map((section, index) => (
                    <li key={index} className={styles.navBlockSubAnchor}>
                      {section.heading}
                    </li>
                  ))}
              </ul>
            ))}

          <a href='mailto:info@manivintage.com'>info@manivintage.com</a>
        </div>

        <div className={styles.social}>
          <a
            href='https://www.facebook.com/pages/category/Vintage-Store/MANI-193061684078267/'
            target='_blank'
          >
            <Image src='/facebook.svg' height={18} width={10} />
          </a>
          <a href='https://www.instagram.com/mani_vintage/' target='_blank'>
            <Image src='/instagram.svg' height={18} width={18} />
          </a>
        </div>

        <p className={styles.description}>
          MANI is a Malmö, Sweden based vintage store. Each item is carefully
          selected for its unique presentation and history. MANI clothing has
          had a previous life, now waiting for the right individual to carry it
          into the future.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
