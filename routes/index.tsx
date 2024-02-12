import { Handlers, PageProps } from "$fresh/server.ts";
import { HeadElement } from "@/components/HeadElement.tsx";
import { Product } from "@/utils/types.ts";
import { getProducts } from "@/utils/db/product.ts";
import { ProductCard } from "@/components/ProductCard.tsx";

interface Data {
  products: Product[];
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    try {
      const products = await getProducts({});
      return ctx.render({ products });
    } catch (error) {
      console.error(error);
      return ctx.render({
        products: [],
      });
    }
  },
};

export default function Home(ctx: PageProps<Data>) {
  const { data, url } = ctx;
  const products = data.products;

  return (
    <div>
      <HeadElement
        description="Shop for Deno Merch"
        image={url.href + "og-image.png"}
        title="Deno Merch"
        url={url}
      />
      <div
        class="w-11/12 max-w-5xl mx-auto mt-28"
        aria-labelledby="information-heading"
      >
        <h2 id="information-heading" class="sr-only">
          Product List
        </h2>
        <div class="grid grid-cols-1 gap-8 sm:!gap-x-10 sm:!grid-cols-2 lg:!grid-cols-3 lg:!gap-x-12 lg:!gap-y-10">
          {products.map((product) => <ProductCard product={product} />)}
        </div>
      </div>
    </div>
  );
}
