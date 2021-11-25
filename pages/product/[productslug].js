import Head from "next/head";
import PageWrapper from "@components/PageWrapper";
import BlockContent from "@sanity/block-content-to-react";
import styles from "../../styles/Product.module.css";
import React, { useState, useEffect, useRef } from "react";
import Button from "@components/Button";
import ProductImage from "@components/ProductImage";
import { useRouter } from "next/router";
import { getClient, sanityClient } from "@lib/sanity.server";
import {
  GetAllProductsSlugs,
  GetSingleProduct,
  GetAllProductsForCartById,
  getNavigation,
} from "@lib/queries";
import { usePreviewSubscription } from "../../lib/sanity";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";

export default function Product({ productdata, preview, productCheckoutData }) {
  const { addItem, cartDetails } = useShoppingCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [notInStock, setNotInStock] = useState(false);
  const router = useRouter();

  const { data: product = {} } = usePreviewSubscription(GetSingleProduct, {
    params: { productslug: productdata.productslug },
    initialData: productdata,
    enabled: preview || router.query.preview !== null,
  });

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

  const {
    name,
    price,
    description,
    size,
    condition,
    mainImage,
    material,
    color,
  } = product;

  const handleAddToCart = async (event) => {
    event.preventDefault();
    if (notInStock) return;
    if (product.available) {
      addItem(productCheckoutData, {
        product_metadata: { id: product.id },
      });
    }
  };

  console.log(size);

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
          <p className={styles.price}>
            {formatCurrencyString({
              value: price,
              currency: "SEK",
            })}
          </p>
          {description && (
            <BlockContent
              blocks={description}
              {...sanityClient.config()}
              className={styles.description}
            />
          )}
          {size && (
            <BlockContent
              blocks={size}
              {...sanityClient.config()}
              className={styles.size}
            />
          )}
          {material && (
            <p className={styles.detail}>
              Material:
              {material.map((item, index) => (
                <span key={index}>{item.material}</span>
              ))}
            </p>
          )}
          {color && (
            <p className={styles.detail}>
              Color:
              {color.map((item, index) => (
                <span key={index}>{item.color}</span>
              ))}
            </p>
          )}
          {condition && <p>Condition: {condition}</p>}
          <Button
            text='Add to cart'
            onClick={(e) => handleAddToCart(e)}
            disabled={notInStock}
          />
          <p>{addedToCart && "Product is added to cart"}</p>
        </section>
      </article>
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

  const navigation = await sanityClient.fetch(getNavigation);

  if (!productdata || !productCheckoutData) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      productdata,
      preview,
      productCheckoutData,
      navigation,
    },
    revalidate: 1,
  };
}
