import { ulid } from "$std/ulid/mod.ts";
import { createClient } from "@libsql/client/web";
import { Product } from "@/utils/types.ts";

function getDbPagination(pagination?: Pagination) {
  const { limit = 10, page = 0 } = pagination || {};

  return { limit, offset: page * limit };
}

export const dbClient = createClient({
  url: Deno.env.get("TURSO_URL")!,
  authToken: Deno.env.get("TURSO_AUTH_TOKEN"),
});

//   dbClient.executeMultiple(`
//     CREATE TABLE IF NOT EXISTS products (
//       id TEXT PRIMARY KEY,
//       username TEXT NOT NULL,
//       name TEXT NOT NULL,
//       api_key TEXT NOT NULL,
//       created_at TEXT,
//       updated TEXT
//     );

//     CREATE TABLE IF NOT EXISTS events (
//       id TEXT PRIMARY KEY,
//       project_id TEXT REFERENCES projects(id) NOT NULL,
//       user_id TEXT,
//       name TEXT NOT NULL,
//       data JSON,
//       created_at TEXT
//     );
//   `);

export async function createProduct(eventModify: Product) {
  const id = ulid();
  await dbClient.execute({
    sql: `
        INSERT INTO projects (id, username, name, api_key, created_at, updated_at)
        VALUES ($id, $userLogin, $name, $apiKey, DATETIME('now'), DATETIME('now'))
      `,
    args: { ...eventModify, id } as any,
  });

  return getProductDetail(id);
}

export async function getProductDetail(
  id: string,
): Promise<Product | null> {
  const rs = await dbClient.execute({
    sql: `
        SELECT id, username, name, api_key, created_at FROM projects
        WHERE id = ?
        LIMIT 1
      `,
    args: [id],
  });

  const rows = rs.rows;
  if (!rows.length) return null;

  const rawProject = rows[0];

  return {
    id,
    ...rawProject,
  } as any;
}
