import { Post } from "@/utils/types.ts";

export function PostCard(props: { post: Post }) {
  const { post } = props;

  return (
    <div class="py-5 border(t gray-200)">
      <a class="sm:col-span-2" href={`/chords/${post.slug}`}>
        <h3 class="text-2xl text-gray-700 font-bold underline">
          {post.title}
        </h3>
        <time class="text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div class="mt-3 text-gray-900">
          {post.snippet}
        </div>
      </a>
    </div>
  );
}
