import "../styles/globals.css";
import Layout from "../components/Layout";
import { sanityClient } from "../lib/sanity.server";
import App from "next/app";

function MyApp({ Component, pageProps, allCategories }) {
  return (
    <Layout allCategories={allCategories}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const allCategories = await sanityClient.fetch(
    `*[_type == "category"] { _id, title, slug }`
  );

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps, allCategories };
};

export default MyApp;
