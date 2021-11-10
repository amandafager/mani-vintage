import Link from "next/link";
import Head from "next/head";
import ProductCard from "@components/ProductCard";
import Grid from "@components/Grid";
import Breadcrumbs from "@components/Breadcrumbs";
import styles from "../../styles/Products.module.css";

import { getClient, sanityClient } from "../../lib/sanity.server";

import {
  getProductCategoriesQuery,
  getProductsByCategorySlugQuery,
} from "lib/queries";

export default function Products({ productsByCategory }) {
  const { products } = productsByCategory;

  return (
    <section className={styles.productsPage}>
      <Head>
        <title>{productsByCategory.title}</title>
      </Head>
      <h1 className={styles.h1}>{productsByCategory.title}</h1>

      {/* <div className={styles.filter}>
        <p>Filter + </p>
        <p>Sort by + </p>
      </div> */}

      <Grid styles={styles}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            /* pageCategorySlug={productsByCategory.slug.current} */
          />
        ))}
      </Grid>
    </section>
  );
}

export async function getStaticPaths() {
  const categories = await sanityClient.fetch(getProductCategoriesQuery);

  const paths = categories.map((category) => {
    return { params: { categoryslug: category.slug.current } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps(context, preview = false) {
  const categoryslug = context.params.categoryslug;
  let productsToReturn;

  const productsByCategorySlug = await getClient(preview).fetch(
    getProductsByCategorySlugQuery,
    {
      categoryslug: categoryslug,
    }
  );

  productsToReturn = productsByCategorySlug[0];

  return {
    props: { productsByCategory: productsToReturn, preview },
  };
}
/* export async function getStaticProps(context) {
  const categoryslug = context.params.categoryslug;
  let productsToReturn;

  const productsByCategorySlug = await sanityClient.fetch(
    getProductsByCategorySlugQuery,
    {
      categoryslug: categoryslug,
    }
  );

  productsToReturn = productsByCategorySlug[0];

  return {
    props: { productsByCategory: productsToReturn },
  };
} */
