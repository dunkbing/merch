export interface Money {
  amount: number;
  currencyCode: string;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  altText: string;
}

export interface List<T> {
  nodes: T[];
}

export interface ProductPriceRange {
  minVariantPrice: Money;
  maxVariantPrice: Money;
}

export interface Product {
  id: string;
  ls_id: string; //lemon_squeezy id
  name: string;
  slug: string;
  description: string;
  instruments: string[];
  price: number;
  price_formatted: string;
  thumb_url: string;
  buy_now_url: string;
  images: string[];
  category_ids: string[];
}

export interface ProductVariant {
  id: string;
  priceV2: Money;
  title: string;
  availableForSale: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
