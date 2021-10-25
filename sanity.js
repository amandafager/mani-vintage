import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // your project id can be found in your sanity.json or at manage.sanity.io
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // this is from those question during 'sanity init'
  useCdn: true, // tells Sanity to use the cached api
  apiVersion: "2021-10-25",
});
