import { extract } from "$std/front_matter/any.ts";
import { join } from "$std/path/mod.ts";

import { Post } from "@/utils/types.ts";

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const text = await Deno.readTextFile(join("./posts", `${slug}.md`));
    const { attrs, body: content } = extract(text);

    return {
      slug,
      title: attrs.title as string,
      publishedAt: new Date(attrs.published_at as string),
      content,
      snippet: attrs.snippet as string,
    };
  } catch (_error) {
    return null;
  }
}

export async function getPosts(limit?: number): Promise<Post[]> {
  const files = Deno.readDir("./posts");
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    if (limit && promises.length >= limit) {
      break;
    }
    promises.push(getPost(slug));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
}
