import Link from "next/link";
import CategoryLinks from "./CategoryLinks";

const Navbar = ({ allCategories }) => {
  return (
    <nav className='NavSidebar'>
      <CategoryLinks allCategories={allCategories} />
      <Link href='/about'>
        <a>About</a>
      </Link>
    </nav>
  );
};

export default Navbar;
