import Image from "next/image";
import styles from "./ProductCard.module.css";
import Link from "next/link";
import * as React from "react";

import { useNextSanityImage } from "next-sanity-image";
import sanityClient from "../../sanity";

import { formatCurrencyString } from "use-shopping-cart";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl, imageAlt, productslug, image } = product;

  const imageProps = useNextSanityImage(sanityClient, product.image);

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
        <a>
          <div className={styles.imageWrapper}>
            <Image
              {...imageProps}
              /* layout='fill' */
              layout='responsive'
              width={400}
              height={500}
              sizes='50vw'
              /*     sizes='(max-width: 500px) 100vw, 500px' */
              /*   className={styles.image} */
            />
            {/*   <Image
              className={styles.image}
              src={imageUrl}
              layout='fill'
              sizes='50vw'
              alt={imageAlt ? imageAlt : name}
            /> */}
          </div>
          <div className={styles.contentWrapper}>
            <h3 className={styles.title}>{name}</h3>
            <p className={styles.price}>
              {formatCurrencyString({
                value: price,
                currency: "SEK",
                //language: "sv-SV",
              })}
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
