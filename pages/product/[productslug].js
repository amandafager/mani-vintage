import Link from "next/link";
import Head from "next/head";
import PageWrapper from "@components/PageWrapper";
import ProductCard from "@components/ProductCard";
import Grid from "@components/Grid";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "../../lib/sanity";
import Image from "next/image";
import styles from "../../styles/Product.module.css";
import React, { useState, useEffect, useRef } from "react";
import Button from "@components/Button";
import ProductImage from "@components/ProductImage";

import { useNextSanityImage } from "next-sanity-image";

import { useRouter } from "next/router";

import { fetchPostJSON } from "../../utils/apiHelpers";

import {
  getClient,
  sanityClient,
  sanityClientUpdate,
} from "@lib/sanity.server";

import {
  GetAllProductsSlugs,
  GetSingleProduct,
  GetAllProductsForCartById,
  getAllCategories,
  getNavigation,
} from "@lib/queries";

import { usePreviewSubscription, urlFor, PortableText } from "../../lib/sanity";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  setItemQuantity,
  useShoppingCart,
  formatCurrencyString,
} from "use-shopping-cart";
import CartSummary from "@components/CartSummary";

export default function Product({ productdata, preview, productCheckoutData }) {
  const { addItem, cartDetails } = useShoppingCart();

  const [addedToCart, setAddedToCart] = useState(false);
  const [notInStock, setNotInStock] = useState(false);

  /*   const imageProps = useNextSanityImage(sanityClient, image); */
  const router = useRouter();

  const { data: product = {} } = usePreviewSubscription(GetSingleProduct, {
    params: { productslug: productdata.productslug },
    initialData: productdata,
    enabled: preview || router.query.preview !== null,
  });

  console.log(product);

  useEffect(() => {
    for (const id in cartDetails) {
      const entry = cartDetails[id];

      if (entry.id === product.id) setAddedToCart(true);

      if (entry.id === product.id && product.quantity <= entry.quantity) {
        setNotInStock(true);
        return;
      }
    }
  });

  const { name, price, description, size, condition, mainImage } = product;

  const handleAddToCart = async (event) => {
    event.preventDefault();

    if (notInStock) return;

    if (product.available) {
      addItem(productCheckoutData, {
        product_metadata: { id: product.id },
      });
    }
  };

  return (
    <PageWrapper>
      <Head>
        <title>{name}</title>
      </Head>
      <article className={styles.productPage}>
        <section className={styles.productImage}>
          <ProductImage
            url={mainImage.url}
            alt={mainImage.alt}
            name={name}
            sizes={"(max-width: 500px) 100vw, 500px"}
          />
        </section>

        <section className={styles.productInfo}>
          <h1>{name}</h1>
          <p>
            <span>
              {formatCurrencyString({
                value: price,
                currency: "SEK",
                language: "se-SV",
              })}
            </span>
          </p>
          {description && (
            <BlockContent blocks={description} {...sanityClient.config()} />
          )}
          <p>Size: {size}</p>
          <p>Condition: {condition}</p>

          <Button
            text='Add to cart'
            onClick={(e) => handleAddToCart(e)}
            disabled={notInStock}
          />
          <p>{addedToCart && "Product added to cart"}</p>
        </section>
      </article>

      {/*  <div className={styles.swiperWrapper}>
        <Swiper
          className={styles.swiper}
          modules={[Navigation, Pagination, Scrollbar]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {product.imagesGallery &&
            product.imagesGallery.map((image, index) => (
              <SwiperSlide key={index} className={styles.slide}>
                <div className={styles.imageWrapper}>
                  <Image
                    className={styles.image}
                    src={image.url}
                    layout='fill'
                    alt={image.imageAlt}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div> */}

      {/*  <Image
        key={image._key}
        {...useNextSanityImage(sanityClient, image)}
        loader={useNextSanityImage(sanityClient, image).loader}
        layout='intrinsic'
        alt={image.attribution ? image.attribution : product.title}
      /> */}

      {/* <Image
        src={product.imageUrl}
        width={412}
        height={557}
        alt={product.imageAlt}
      /> */}
    </PageWrapper>
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

export async function getStaticProps(context, preview = false) {
  const productslug = context.params.productslug;

  const productdata = await getClient(preview).fetch(GetSingleProduct, {
    productslug: productslug,
  });

  const productCheckoutData = await getClient(preview).fetch(
    GetAllProductsForCartById,
    {
      id: productdata.id,
    }
  );

  const categories = await sanityClient.fetch(getAllCategories);
  const navigation = await sanityClient.fetch(getNavigation);

  return {
    props: {
      productdata,
      preview,
      productCheckoutData,
      categories,
      navigation,
    },
  };
}
