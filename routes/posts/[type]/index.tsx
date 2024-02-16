import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, PostType } from "@/utils/post.ts";
import { Post } from "@/utils/types.ts";
import { HeadElement } from "@/components/HeadElement.tsx";
import { PostCard } from "@/components/PostCard.tsx";

type Props = { posts: Post[]; type: PostType };
export const handler: Handlers<Props> = {
  async GET(_req, ctx) {
    const postType = ctx.params.type as PostType;
    const posts = await getPosts(postType);
    return ctx.render({ posts, type: postType });
  },
};

export default function ChordsIndexPage(props: PageProps<Props>) {
  const { posts, type } = props.data;

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
          {posts.map((post) => <PostCard post={post} type={type} />)}
        </div>
      </main>
    </>
  );
}
