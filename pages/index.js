import Head from "next/head";
import PageWrapper from "@components/PageWrapper";
import React, { useState, useEffect, useRef } from "react";
import styles from "@styles/Home.module.css";
import { sanityClient } from "@lib/sanity.server";
import { getNavigation, getLandingPage } from "@lib/queries";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import ProductCard from "@components/ProductCard";
import Grid from "@components/Grid";

export default function Home({ landingPage, products }) {
  return (
    <PageWrapper addStyles={styles.landingPage}>
      <Head>
        <title>MANI Vintage</title>
        <meta
          name='description'
          content='MANI is a Malmö, Sweden based vintage store. Each item is carefully selected for its unique presentation and history. MANI clothing has had a previous life, now waiting for the right individual to carry it into the future.'
        />
      </Head>

      <div className={styles.imagesGallery}>
        {landingPage.imagesGallery &&
          landingPage.imagesGallery.map((image, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image
                className={styles.image}
                src={{ ...useNextSanityImage(sanityClient, image) }}
                layout='fill'
              />
            </div>
          ))}
      </div>

      <Grid>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
    </PageWrapper>
  );
}

export async function getStaticProps() {
  const navigation = await sanityClient.fetch(getNavigation);
  const landingPage = await sanityClient.fetch(getLandingPage);

  const products = landingPage.products.filter(
    (product) => product.available === true
  );

  delete landingPage.products;

  if (!products) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      navigation,
      landingPage,
      products,
    },
    revalidate: 1,
  };
}
