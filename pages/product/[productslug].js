import Link from "next/link";
import Head from "next/head";
/* import sanityClient from "../../sanity"; */
import ProductCard from "@components/ProductCard";
import Grid from "@components/Grid";
import Breadcrumbs from "@components/Breadcrumbs";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "../../lib/sanity";
import Image from "next/image";
import styles from "../../styles/Product.module.css";
import React, { useState, useEffect, useRef } from "react";

import { useNextSanityImage } from "next-sanity-image";

import { useRouter } from "next/router";

import { getClient, sanityClient } from "../../lib/sanity.server";

import { GetAllProductsSlugs, GetSingleProductImages } from "lib/queries";

import { usePreviewSubscription, urlFor, PortableText } from "../../lib/sanity";

export default function Product({ productdata, preview }) {
  const router = useRouter();
  /*   const imageProps = useNextSanityImage(sanityClient, image); */

  const { data: product = {} } = usePreviewSubscription(
    GetSingleProductImages,
    {
      params: { productslug: productdata.productslug },
      initialData: productdata,
      enabled: preview || router.query.preview !== null,
    }
  );

  const { image, imageUrl, title, price, condition, size, description } =
    product;

  return (
    <section className={styles.productPage}>
      <Head>
        <title>{title}</title>
      </Head>
      {/*     <Breadcrumbs /> */}
      <h1>{title}</h1>
      <p>Price: {price} SEK</p>
      {description && (
        <BlockContent blocks={description} serializers={serializers} />
      )}
      <p>Size: {size}</p>
      <p>Condition: {condition}</p>

      {/*  {product.imagesGallery &&
        product.imagesGallery.map((image) => (
          <Image
            key={image._key}
            {...useNextSanityImage(sanityClient, image)}
            loader={useNextSanityImage(sanityClient, image).loader}
            layout='intrinsic'
            alt={image.attribution ? image.attribution : product.title}
          />
        ))}
 */}
      {/* <Image
        src={product.imageUrl}
        width={412}
        height={557}
        alt={product.imageAlt}
      /> */}
    </section>
  );
}

export async function getStaticPaths() {
  const allProductsSlugs = await sanityClient.fetch(GetAllProductsSlugs);

  const paths = allProductsSlugs.map((product) => {
    return {
      params: { productslug: product.productslug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

/* export async function getStaticProps(context) {
  const productslug = context.params.productslug;

  let productToReturn;

  const getProduct = await sanityClient.fetch(GetSingleProductImages, {
    productslug: productslug,
  });

  productToReturn = getProduct[0];

  return {
    props: { product: productToReturn },
  };
}
 */
export async function getStaticProps(context, preview = false) {
  const productslug = context.params.productslug;

  const productdata = await getClient(preview).fetch(GetSingleProductImages, {
    productslug: productslug,
  });

  return {
    props: { productdata, preview },
  };
}
