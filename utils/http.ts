import config from "@/utils/config.ts";

export interface LemonSqueeze<T> {
  jsonapi: { version: string };
  data: T;
}

export interface LSProduct {
  type: string;
  id: string;
  attributes: {
    store_id: number;
    name: string;
    slug: string;
    description: string;
    status: string;
    status_formatted: string;
    thumb_url: string;
    large_thumb_url: string;
    price: number;
    price_formatted: string;
    from_price: any;
    to_price: any;
    pay_what_you_want: boolean;
    buy_now_url: string;
    created_at: string;
    updated_at: string;
    test_mode: boolean;
  };
}

export const httpClient = {
  get: async function <T>(url: string, headers?: Headers): Promise<T> {
    const res = await fetch(url, {
      method: "GET",
      headers: headers,
      redirect: "follow",
    });
    return await res.json();
  },
};

const LSRoutes = {
  products: "https://api.lemonsqueezy.com/v1/products",
};

export const fetchLSProducts = async () => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${config.lemonSqueezyApi}`);
  headers.append("Accept", "application/vnd.api+json");
  headers.append("Content-Type", "application/vnd.api+json");
  const res = await httpClient.get<LemonSqueeze<LSProduct[]>>(
    LSRoutes.products,
    headers,
  );
  return res.data;
};
