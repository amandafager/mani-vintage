import "../styles/globals.css";
import Layout from "../components/Layout";
import Cart from "@components/Cart";

import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Cart>
      <Layout pageProps={pageProps}>
        <Head>
          <meta name='robots' content='noindex' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Cart>
  );
}

export default MyApp;
