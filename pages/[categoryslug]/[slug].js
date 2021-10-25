import Link from "next/link";
import Head from "next/head";
import sanityClient from "../../sanity";
import ProductCard from "@components/ProductCard";
import Grid from "@components/Grid";
import Breadcrumbs from "@components/Breadcrumbs";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "../../lib/sanity";
import Image from "next/image";

import {
  getCategoriesAndAllRelatedProductsQuery,
  getSingleProductByCategorySlugAndProductSlugQuery,
} from "lib/queries";

export default function Product({ product }) {
  return (
    <section>
      <Head>
        <title>{product.title}</title>
      </Head>
      <Breadcrumbs />
      <h1>{product.title}</h1>
      <p>Price: {product.price} SEK</p>

      {product.description && (
        <BlockContent blocks={product.description} serializers={serializers} />
      )}
      <p>Size: {product.size}</p>
      <p>Condition: {product.condition}</p>

      {product.imagesGallery &&
        product.imagesGallery.map((image) => (
          <Image
            key={image.key}
            src={image.imageUrl}
            width={412}
            height={557}
            alt={image.alt}
          />
        ))}
    </section>
  );
}

export async function getStaticPaths() {
  const allCategoriesAndRelatedProducts = await sanityClient.fetch(
    getCategoriesAndAllRelatedProductsQuery
  );

  const createParamsForAllPaths = allCategoriesAndRelatedProducts.map(
    (category) => {
      const paths = category.products.map((product) => {
        return {
          params: {
            categoryslug: category.slug.current,
            slug: product.slug ? product.slug : "",
          },
        };
      });

      return {
        paths,
      };
    }
  );

  //removeOuterObjectThatWrapsAlLCategoryAndProductsParams
  const removedOuterObjectThatWrapsAlLCategoryAndProductsParams =
    createParamsForAllPaths.map((d) => {
      return Object.assign(d.paths);
    });

  //merageAllArraysToOneArrayWithObjectForEveryPaths
  const merge = [].concat.apply(
    [],
    removedOuterObjectThatWrapsAlLCategoryAndProductsParams
  );

  const paths = merge;

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const categoryslug = context.params.categoryslug;
  const slug = context.params.slug;

  let productToReturn;

  const getProductAndCategory = await sanityClient.fetch(
    getSingleProductByCategorySlugAndProductSlugQuery,
    {
      categoryslug: categoryslug,
      slug: slug,
    }
  );

  productToReturn = getProductAndCategory[0].products[0];

  return {
    props: { product: productToReturn },
  };
}
