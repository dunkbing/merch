import { Product } from "@/utils/types.ts";
import { dbClient } from "@/utils/db/db.ts";
import { ulid } from "$std/ulid/mod.ts";

export const importProducts = async (products: Omit<Product, "id">[]) => {
  for (const p of products) {
    const exists = await getProductByLSId(p.ls_id as string);
    console.log(exists);
    if (exists) {
      void updateProduct(exists.id, p);
      continue;
    }
    await createProduct(p);
  }
};

export async function createProduct(product: Omit<Product, "id">) {
  console.log("createProduct", product);
  const id = ulid();
  await dbClient.execute({
    sql: `
      INSERT INTO products (id, ls_id, name, slug, description, instruments, price, price_formatted, thumb_url, buy_now_url, category_ids)
      VALUES ($id, $ls_id, $name, $slug, $description, $instruments, $price, $price_formatted, $thumb_url, $buy_now_url, $category_ids)
    `,
    args: {
      id,
      ls_id: product.ls_id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      instruments: product.instruments as any,
      price: product.price,
      price_formatted: product.price_formatted,
      thumb_url: product.thumb_url,
      buy_now_url: product.buy_now_url,
      category_ids: product.category_ids as any,
    },
  });

  return getProduct(id);
}

export async function getProduct(
  id: string,
): Promise<Product | null> {
  const rs = await dbClient.execute({
    sql: `
      SELECT * FROM products
      WHERE id = ?
      LIMIT 1
    `,
    args: [id],
  });

  const rows = rs.rows;
  if (!rows.length) return null;

  const rawProject = rows[0];
  rawProject.length;

  return {
    id,
    ...rawProject,
  } as unknown as Product;
}

export async function getProductByLSId(
  id: string,
): Promise<Product | null> {
  const rs = await dbClient.execute({
    sql: `
      SELECT * FROM products
      WHERE ls_id = ?
      LIMIT 1
    `,
    args: [id],
  });

  const rows = rs.rows;
  if (!rows.length) return null;

  const rawProject = rows[0];
  rawProject.length;

  return {
    id,
    ...rawProject,
  } as unknown as Product;
}

export async function updateProduct(
  id: string,
  product: Omit<Product, "id">,
): Promise<Product | null> {
  const currentProduct = await getProduct(id);
  if (!currentProduct) return null;

  const updateEntries = Object.entries(product).map(([key, value]) => {
    if (currentProduct[key as keyof Product] === value) return null;
    return `${key} = $${key}`;
  }).filter(Boolean).join(", ");
  const updateFields = Object.entries(product).map(([key, value]) => {
    if (currentProduct[key as keyof Product] === value) return null;
    return { [key]: value };
  }).filter(Boolean).reduce((acc, cur) => ({ ...acc, ...cur }), {});

  const updateQuery = updateEntries
    ? `
    UPDATE products
    SET ${updateEntries}
    WHERE id = $id
  `
    : null;

  console.log(updateQuery);

  if (!updateQuery) return getProduct(id);

  await dbClient.execute({
    sql: updateQuery,
    args: { ...updateFields, id },
  });

  return getProduct(id);
}
