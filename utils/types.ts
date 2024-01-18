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
  title: string;
  description: string;
  type: string;
  featuredImage: Image | null;
  images?: Image[];
  available?: boolean;
  variants: ProductVariant[];
  priceRange: ProductPriceRange;
}

export interface ProductVariant {
  id: string;
  priceV2: Money;
  title: string;
  availableForSale: boolean;
}
