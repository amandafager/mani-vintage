import Navbar from "./Navbar";
import Link from "next/link";

const Header = ({ allCategories }) => {
  return (
    <header className='header'>
      <Navbar allCategories={allCategories} />
      <div>
        <Link href='/'>
          <a>
            <h1 className='siteLogo'>Mani Vintage</h1>
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
