import { createClient } from "next-sanity";
import { sanityConfig } from "./config";

export const sanityClient = createClient({ ...sanityConfig, useCdn: true });

export const sanityClientUpdate = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN_PREVIEW,
});

export const getClient = (usePreview) =>
  usePreview ? previewClient : sanityClient;
