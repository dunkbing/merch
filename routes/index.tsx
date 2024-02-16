import { Handlers, PageProps } from "$fresh/server.ts";
import { HeadElement } from "@/components/HeadElement.tsx";
import { Post, Product } from "@/utils/types.ts";
import { getProducts } from "@/utils/db/product.ts";
import { ProductCard } from "@/components/ProductCard.tsx";
import { getPosts } from "@/utils/post.ts";
import { PostCard } from "@/components/PostCard.tsx";

interface Data {
  products: Product[];
  posts: Post[];
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    try {
      const [products, posts] = await Promise.all([
        getProducts({}),
        getPosts("chords", 3),
      ]);
      return ctx.render({ products, posts });
    } catch (error) {
      console.error(error);
      return ctx.render({
        products: [],
        posts: [],
      });
    }
  },
};

export default function Home(ctx: PageProps<Data>) {
  const { data, url } = ctx;
  const { products, posts } = data;

  return (
    <div>
      <HeadElement
        image={url.href + "og-image.png"}
        title="Trang chủ"
        url={url}
      />
      <div
        class="w-8/12 max-w-5xl mx-auto mt-28"
        aria-labelledby="information-heading"
      >
        <h2 class="text-3xl font-bold text-gray-800">
          Hợp âm <a href="/chords" class="text-blue-500">(Xem tất cả)</a>
        </h2>
        <div class="">
          {posts.map((post) => <PostCard post={post} type="chords" />)}
        </div>
        <div class="my-8" />
        <h2 class="text-3xl font-bold text-gray-800 mb-8">
          Sheet nhạc
        </h2>
        <div class="grid grid-cols-1 gap-8 sm:!gap-x-10 sm:!grid-cols-2 lg:!grid-cols-3 lg:!gap-x-12 lg:!gap-y-10">
          {products.map((product) => <ProductCard product={product} />)}
        </div>
      </div>
    </div>
  );
}
