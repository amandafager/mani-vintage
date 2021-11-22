/* import sanityClient from "@sanity/client"; */

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
  token: process.env.SANITY_API_TOKEN,
});

export const getClient = (usePreview) =>
  usePreview ? previewClient : sanityClient;

/* export const clientForPreview = sanityClient({
  ...sanityConfig,
  useCdn: false,
  withCredentials: true,
  token: process.env.SANITY_API_TOKEN,
});

export const client = sanityClient({
  ...sanityConfig,
}); */

/* export const getClient = (preview) => (preview ? previewClient : client);
 */

export function overlayDrafts(docs) {
  const documents = docs || [];
  const overlayed = documents.reduce((map, doc) => {
    if (!doc._id) {
      throw new Error("Ensure that `_id` is included in query projection");
    }

    const isDraft = doc._id.startsWith("drafts.");
    const id = isDraft ? doc._id.slice(7) : doc._id;
    return isDraft || !map.has(id) ? map.set(id, doc) : map;
  }, new Map());

  return Array.from(overlayed.values());
}