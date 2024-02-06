import useSWR, { mutate } from "swr";
import { Money } from "@/utils/types.ts";
import { Product } from "@/utils/types.ts";

export function useCart() {
  return useSWR<Product[], Error>("cart", () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartData = JSON.parse(cart) as Product[];
      return cartData;
    }
    return [];
  }, {});
}

export function addToCart(product: Product) {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    const cart = JSON.parse(cartData);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    mutate("cart", cart);
  } else {
    localStorage.setItem("cart", JSON.stringify([product]));
    mutate("cart", [product]);
  }
}

export async function removeFromCart(products: Product[], itemId: string) {
  const newProducts = products.filter((product) => product.id !== itemId);
  console.log(newProducts);
  localStorage.setItem("cart", JSON.stringify(newProducts));
  await mutate(
    "cart",
    newProducts,
  );
}

export function formatCurrency(amount: Money) {
  if (!amount) return "";
  const intl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: amount.currencyCode,
  });
  return intl.format(amount.amount);
}
