import Head from "next/head";
import PageWrapper from "@components/PageWrapper";
import ProductCard from "@components/ProductCard";
import Grid from "@components/Grid";
import styles from "@styles/Products.module.css";

import { getClient, sanityClient } from "@lib/sanity.server";

import {
  getAllCategories,
  getProductsByCategorySlugQuery,
  getNavigation,
} from "@lib/queries";

export default function Products({ productsByCategory }) {
  const { products } = productsByCategory;

  return (
    <PageWrapper>
      <Head>
        <title>{productsByCategory.title} - MANI Vintage</title>
      </Head>
      <h1 className={styles.h1}>{productsByCategory.title}</h1>

      <Grid>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
    </PageWrapper>
  );
}

export async function getStaticPaths() {
  const categories = await sanityClient.fetch(getAllCategories);

  const paths = categories.map((category) => {
    return { params: { categoryslug: category.slug.current } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps(context, preview = false) {
  const categoryslug = context.params.categoryslug;

  const productsByCategorySlug = await getClient(preview).fetch(
    getProductsByCategorySlugQuery,
    {
      categoryslug: categoryslug,
    }
  );

  const productsToReturn = productsByCategorySlug[0];

  const navigation = await sanityClient.fetch(getNavigation);

  if (!productsToReturn) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      productsByCategory: productsToReturn,
      preview,
      navigation,
    },
    revalidate: 1,
  };
}
