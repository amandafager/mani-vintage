import NavLink from "@components/NavLink";
import styles from "./Navbar.module.css";

const Navbar = ({ mainMeny, collectionMeny }) => {
  const categories = collectionMeny.navItems;
  const { navItems } = mainMeny;

  return (
    <nav className={styles.navSidebar} role='navigation'>
      <div className={styles.navGroup}>
        {categories &&
          categories.map((category, index) => (
            <NavLink
              key={index}
              href={`/collections/${category.slug}`}
              anchorText={category.title}
            />
          ))}
      </div>

      <div className={styles.navGroup}>
        <NavLink href='/looking-for' anchorText='Looking for?' />
      </div>

      <div className={styles.navGroup}>
        {navItems &&
          navItems.map((item, index) => (
            <NavLink
              key={index}
              href={`/${item.slug}`}
              anchorText={item.title}
            />
          ))}
      </div>
    </nav>
  );
};

export default Navbar;
