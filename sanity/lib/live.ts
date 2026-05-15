import { client } from "./client";

export const sanityFetch = async ({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, unknown>;
}) => {
  const data = await client.fetch(query, params);
  return { data };
};
