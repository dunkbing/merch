import { createClient } from "@libsql/client/web";

export function getDbPagination(pagination?: Pagination) {
  const { limit = 10, page = 0 } = pagination || {};

  return { limit, offset: page * limit };
}

export const dbClient = createClient({
  url: Deno.env.get("TURSO_URL")!,
  authToken: Deno.env.get("TURSO_AUTH_TOKEN"),
});
