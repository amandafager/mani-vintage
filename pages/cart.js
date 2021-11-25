import PageWrapper from "@components/PageWrapper";
import CartSummary from "@components/CartSummary";
import Head from "next/head";
import styles from "@styles/Cart.module.css";
import { getNavigation } from "@lib/queries";
import { sanityClient } from "@lib/sanity.server";

export default function CartPage() {
  return (
    <PageWrapper>
      <Head>
        <title>Your shopping bag - MANI Vintage</title>
      </Head>
      <CartSummary />
    </PageWrapper>
  );
}

export async function getStaticProps() {
  const navigation = await sanityClient.fetch(getNavigation);

  return {
    props: {
      navigation,
    },
  };
}
