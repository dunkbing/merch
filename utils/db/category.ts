import { Category } from "@/utils/types.ts";
import { dbClient } from "@/utils/db/db.ts";
import categories from "@/utils/db/categories.json" with { type: "json" };

export const importCategories = async () => {
  for (const category of categories) {
    const exists = await getCategory(category.id);
    if (exists) {
      void updateCategory(category.id, category);
      continue;
    }
    await createCategory(category);
  }
};

export async function createCategory(category: Category) {
  await dbClient.execute({
    sql: `
      INSERT INTO categories (id, name, slug)
      VALUES ($id, $name, $slug)
    `,
    args: { ...category },
  });

  return getCategory(category.id);
}

export async function getCategory(
  id: string,
): Promise<Category | null> {
  const rs = await dbClient.execute({
    sql: `
      SELECT id, name, slug FROM categories
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
  } as unknown as Category;
}

export async function updateCategory(
  id: string,
  category: Category,
): Promise<Category | null> {
  await dbClient.execute({
    sql: `
      UPDATE categories
      SET name = $name, slug = $slug
      WHERE id = $id
    `,
    args: { ...category, id },
  });

  return getCategory(id);
}
