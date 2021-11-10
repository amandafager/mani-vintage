import Link from "next/link";
import { getApi } from "../utils/api";
import React, { useEffect, useState } from "react";
import { getProductCategoriesQuery } from "../lib/queries";

import { useRouter } from "next/router";

const Links = (/* { allCategories } */) => {
  const [allCategories, setAllCategories] = useState([]);

  const router = useRouter();

  useEffect(() => {
    (async function () {
      const categories = await getApi(getProductCategoriesQuery);
      setAllCategories(categories);
    })();
  }, []);

  return (
    <>
      {allCategories &&
        allCategories?.map((category) => {
          return (
            <Link
              key={category._id}
              href={`/category/${category.slug.current}`}
            >
              <a
                className={
                  router.asPath == `category/${category.slug.current}`
                    ? "activeLink"
                    : ""
                } /* aria-current='page' */
              >
                {category.title}
              </a>
            </Link>
          );
        })}
    </>
  );
};

export default Links;
