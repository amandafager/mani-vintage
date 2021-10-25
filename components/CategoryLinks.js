import Link from "next/link";
import { getApi } from "../utils/api";
import React, { useEffect, useState } from "react";
import { getProductCategoriesQuery } from "../lib/queries";

const Links = (/* { allCategories } */) => {
  const [allCategories, setAllCategories] = useState([]);

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
            <Link key={category._id} href={`/${category.slug.current}`}>
              <a>{category.title}</a>
            </Link>
          );
        })}
    </>
  );
};

export default Links;
