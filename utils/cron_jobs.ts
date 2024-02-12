import { fetchLSProducts } from "@/utils/http.ts";
import { importProducts } from "@/utils/db/product.ts";

export function triggerJobs() {
  const every1min = "*/1 * * * *";
  Deno.cron("Sample cron job", every1min, () => {
    console.log("This will run every 1 minutes");
  });
  const midNight = "0 0 * * *";
  Deno.cron("Fetch LS products", midNight, async () => {
    const products = await fetchLSProducts();
    importProducts(products.map((p) => {
      return {
        ls_id: p.id,
        name: p.attributes.name,
        slug: p.attributes.slug,
        description: p.attributes.description,
        price: p.attributes.price,
        price_formatted: p.attributes.price_formatted,
        thumb_url: p.attributes.large_thumb_url,
        buy_now_url: p.attributes.buy_now_url,
        category_ids: [],
        instruments: ["piano"],
        images: [],
      };
    }));
  });
}
