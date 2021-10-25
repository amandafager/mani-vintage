import sanityClient from "../sanity";

export function getApi(path) {
  const api = sanityClient
    .fetch(`${path}`)
    .then((data) => {
      return data;
    })
    .catch(console.error);
  return api;
}
