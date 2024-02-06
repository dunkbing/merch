import { Handlers, PageProps } from "$fresh/server.ts";
import { HeadElement } from "@/components/HeadElement.tsx";
import IconCart from "@/components/IconCart.tsx";
import { Product } from "@/utils/types.ts";
import { getProducts } from "@/utils/db/product.ts";

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

function ProductCard(props: { product: Product }) {
  const { product } = props;

  return (
    <a key={product.id} href={`/products/${product.id}`} class="group">
      <div
        class={`aspect-square w-full bg-white rounded-xl overflow-hidden border-2 border-gray-200 transition-all duration-500 relative`}
      >
        {product.thumb_url && (
          <img
            src={product.thumb_url}
            alt={product.name}
            width="400"
            height="400"
            class="w-full h-full object-center object-contain absolute block"
          />
        )}
        <div class="w-full h-full flex items-center justify-center bg-[rgba(255,255,255,0.6)] opacity-0 group-hover:opacity-100 transition-all duration-500">
          <IconCart size={30} />
        </div>
      </div>
      <div class="flex items-center justify-between mt-3">
        <h3 class="text-lg text-gray-800 font-medium relative">
          {product.name}
          <span class="bg-gray-800 h-[3px] w-0 group-hover:!w-full absolute bottom-[-2px] left-0 transition-all duration-400" />
        </h3>
        <strong class="text-lg font-bold text-gray-800">
          {product.price_formatted}
        </strong>
      </div>
    </a>
  );
}
