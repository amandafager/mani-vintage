import PageWrapper from "@components/PageWrapper";
import CartSummary from "@components/CartSummary";
import Head from "next/head";
import styles from "@styles/Cart.module.css";
import { getAllCategories, getNavigation } from "@lib/queries";
import { sanityClient } from "@lib/sanity.server";

export default function CartPage() {
  return (
    <PageWrapper>
      <Head>
        <title>Mani Vintage</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <CartSummary />
    </PageWrapper>
  );
}

export async function getStaticProps() {
  const categories = await sanityClient.fetch(getAllCategories);
  const navigation = await sanityClient.fetch(getNavigation);

  return {
    props: {
      categories,
      navigation,
    },
  };
}