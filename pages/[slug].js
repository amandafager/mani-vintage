import Head from "next/head";
import { sanityClient } from "../lib/sanity.server";
import styles from "@styles/Page.module.css";
import PageWrapper from "@components/PageWrapper";
import PageBlock from "@components/PageBlock";
import { pageSlug, pageContent, getNavigation } from "@lib/queries";

export default function About({ page }) {
  const content = (page.pageBuilder || [])
    .filter((blockContent) => !blockContent.disabled)
    .map((blockContent, i) => {
      let el = null;
      switch (blockContent._type) {
        case "pageBlock":
          el = (
            <PageBlock
              key={blockContent._key}
              content={blockContent}
              id={blockContent.heading.split(" ").join("-").toLowerCase()}
            />
          );
          break;
      }
      return el;
    });

  return (
    <PageWrapper addStyles={styles.center}>
      <Head>
        <title>{page.title} - MANI Vintage</title>
      </Head>
      <div className={styles.content}>{content}</div>
    </PageWrapper>
  );
}

export async function getStaticPaths() {
  const pages = await sanityClient.fetch(pageSlug);

  const paths = pages.map((page) => {
    return {
      params: { slug: page.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const page = await sanityClient.fetch(pageContent, {
    slug: slug,
  });
  const navigation = await sanityClient.fetch(getNavigation);

  return {
    props: { page, navigation },
    revalidate: 60,
  };
}
