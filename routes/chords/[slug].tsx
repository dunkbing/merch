import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { CSS, render } from "$gfm";

import { Post } from "@/utils/types.ts";
import { getPost } from "@/utils/post.ts";
import { HeadElement } from "@/components/HeadElement.tsx";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    if (post === null) return ctx.renderNotFound();
    return ctx.render(post);
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;

  return (
    <>
      <HeadElement
        description={post.snippet}
        title={post.title}
        url={props.url}
      />
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <h1 class="text-4xl text-center font-bold my-8">{post.title}</h1>
      <main class="max-w-screen-md px-4 py-8 mx-auto bg-white">
        <time class="text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div
          class="mt-8 markdown-body"
          dangerouslySetInnerHTML={{ __html: render(post.content) }}
        />
      </main>
    </>
  );
}
