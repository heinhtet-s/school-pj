import { createClient } from "next-sanity";

const sanityClient = createClient({
  projectId: "ga8lllhf",
  dataset: "production",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_STUDIO_TOKEN,
  apiVersion: "2021-10-21",
});

export default sanityClient;
