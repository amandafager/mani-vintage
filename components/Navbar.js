import Link from "next/link";
import CategoryLinks from "./CategoryLinks";

const Navbar = ({ allCategories }) => {
  return (
    <nav className='NavSidebar' role='navigation'>
      <CategoryLinks allCategories={allCategories} />

      <Link href='/looking-for'>
        <a>Looking for?</a>
      </Link>
      <Link href='/about-mani'>
        <a>About mani</a>
      </Link>
      <Link href='/mani-store'>
        <a>Mani store</a>
      </Link>
    </nav>
  );
};

export default Navbar;
