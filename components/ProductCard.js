import Image from "next/image";
import styles from "../styles/ProductCard.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

import { useNextSanityImage } from "next-sanity-image";
import sanityClient from "../sanity";

const ProductCard = ({ product /* pageCategorySlug */ }) => {
  const { title, price, imageUrl, imageAlt, productslug, categories, image } =
    product;

  const imageProps = useNextSanityImage(sanityClient, image);

  /* const router = useRouter();
  const { categoryslug } = router.query;

  let categorySlugToReturn;

  const foundCatgeorySlug = categories.find(
    (category) => category.slug !== "all" && category.slug !== "new-arrivals"
  );

  if (categoryslug === "all" || categoryslug === "new-arrivals") {
    categorySlugToReturn = foundCatgeorySlug && foundCatgeorySlug.slug;
  } else {
    categorySlugToReturn = pageCategorySlug;
  } */

  /*   categorySlugToReturn = pageCategorySlug;
   */
  return (
    <div className={styles.card}>
      <Link
        href={{
          pathname: "/product/[productslug]",
          query: {
            productslug: productslug,
          },
        }}
        passHref
      >
        {/*  <Link
        href={{
          pathname: "/[categoryslug]/[slug]",
          query: {
            categoryslug: categorySlugToReturn,
            slug: slug,
          },
        }}
      > */}
        <a>
          <div className={styles.imageWrapper}>
            {/* <Image
              className={styles.image}
              {...imageProps}
              loader={imageProps.loader}
              layout='fill'
              sizes='20vw'
              alt={imageAlt ? imageAlt : title}
            /> */}
            <Image
              className={styles.image}
              src={imageUrl}
              layout='fill'
              sizes='20vw'
              alt={imageAlt ? imageAlt : title}
            />
          </div>
          <div className={styles.contentWrapper}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.price}>{price} SEK</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
