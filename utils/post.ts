import { extract } from "$std/front_matter/any.ts";
import { join } from "$std/path/mod.ts";

import { Post } from "@/utils/types.ts";

export type PostType = "chords" | "scales";

export async function getPost(
  slug: string,
  postType: PostType,
): Promise<Post | null> {
  try {
    const postFile = join("./posts", postType, `${slug}.md`);
    const text = await Deno.readTextFile(postFile);
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

export async function getPosts(
  postType: PostType,
  limit?: number,
): Promise<Post[]> {
  const path = join("./posts", postType);
  const files = Deno.readDir(path);
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    if (limit && promises.length >= limit) {
      break;
    }
    promises.push(getPost(slug, postType));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
}
