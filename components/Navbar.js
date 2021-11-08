import Link from "next/link";
import CategoryLinks from "./CategoryLinks";

const Navbar = ({ allCategories }) => {
  return (
    <nav className='NavSidebar' role='navigation'>
      <CategoryLinks allCategories={allCategories} />
      <Link href='/about'>
        <a>About</a>
      </Link>
      <Link href='/looking-for'>
        <a>Looking for?</a>
      </Link>
    </nav>
  );
};

export default Navbar;
