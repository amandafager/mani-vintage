import { useRouter } from "next/router";
import Link from "next/link";

function NavLink({ href, anchorText }) {
  const router = useRouter();

  return (
    <Link href={href} passHref>
      <a className={router.asPath == href ? "activeLink" : ""}>{anchorText}</a>
    </Link>
  );
}

export default NavLink;
