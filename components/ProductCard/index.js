import Image from "next/image";
import styles from "./ProductCard.module.css";
import Link from "next/link";
import * as React from "react";
import ProductImage from "@components/ProductImage";

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
          <ProductImage
            url={image}
            name={name}
            sizes='20vw'
            /*  sizes='(max-width: 500px) 100vw, 500px' */
          />

          <div className={styles.contentWrapper}>
            <h3 className={styles.title}>{name}</h3>
            <p className={styles.price}>
              {formatCurrencyString({
                value: price,
                currency: "SEK",
              })}
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
