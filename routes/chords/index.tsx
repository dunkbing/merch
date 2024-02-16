import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts } from "@/utils/post.ts";
import { Post } from "@/utils/types.ts";
import { HeadElement } from "@/components/HeadElement.tsx";
import { PostCard } from "@/components/PostCard.tsx";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

export default function ChordsIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;

  return (
    <>
      <HeadElement
        description={"Hợp âm cơ bản"}
        title={"Hợp âm"}
        url={props.url}
      />
      <main class="max-w-screen-md px-4 pt-16 mx-auto">
        <h2 class="text-3xl font-bold">
          Hợp âm
        </h2>
        <div class="">
          {posts.map((post) => <PostCard post={post} />)}
        </div>
      </main>
    </>
  );
}
