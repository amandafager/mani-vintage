import { useRouter } from "next/router";
import useSWR from "swr";
import PrintObject from "@components/PrintObject";
import { fetchGetJSON } from "../utils/apiHelpers";
import { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";
import PageWrapper from "@components/PageWrapper";
import { sanityClient } from "@lib/sanity.server";
import { getNavigation } from "@lib/queries";

export default function ResultPage() {
  const { clearCart, cartDetails } = useShoppingCart();
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  console.log(data?.line_items.data[0].price.product.metadata.id);

  useEffect(() => clearCart(), [clearCart]);

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <PageWrapper>
      <div className='page-container'>
        Congrats
        <h1>Checkout Payment Result</h1>
        <h3>
          Thank you, {data?.payment_intent.charges.data[0].billing_details.name}
          .
        </h3>
        <p>
          Confirmation email sent to{" "}
          {data?.payment_intent.charges.data[0].billing_details.email}.
        </p>
        <hr />
        <h2>Status: {data?.payment_intent?.status ?? "loading..."}</h2>
        {/*  <h3>CheckoutSession response:</h3>
        <PrintObject content={data ?? "loading..."} /> */}
      </div>
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
