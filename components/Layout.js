import Footer from "./Footer";
import Header from "./Header";
import Links from "./CategoryLinks";

const Layout = ({ children, allCategories }) => {
  return (
    <div className='layoutContainer'>
      <Header allCategories={allCategories} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
