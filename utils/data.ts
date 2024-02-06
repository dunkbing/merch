import useSWR, { mutate } from "swr";
import { Money } from "@/utils/types.ts";
import { Product } from "@/utils/types.ts";
import { toast } from "@/utils/toast.ts";

interface CartItem {
  product: Product;
  quantity: number;
}

export function useCart() {
  return useSWR<CartItem[], Error>(
    "cart",
    () => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const cartData = JSON.parse(cart) as CartItem[];
        return cartData;
      }
      return [];
    },
    {},
  );
}

export function addToCart(product: Product) {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    const cart = JSON.parse(cartData) as CartItem[];
    const exists = cart.find((p) => p.product.id === product.id);
    if (exists) {
      exists.quantity++;
    } else {
      cart.push({ product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    mutate("cart", cart);
  } else {
    const cart = [{ product, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(cart));
    mutate("cart", cart);
  }

  toast.success("Đã thêm vào giỏ hàng");
}

export async function removeFromCart(cart: CartItem[], itemId: string) {
  const newProducts = cart.filter((p) => p.product.id !== itemId);
  localStorage.setItem("cart", JSON.stringify(newProducts));
  await mutate("cart", newProducts);
  toast.warn("Đã xoá sản phẩm");
}

export async function changeQuantity(
  cart: CartItem[],
  itemId: string,
  qty: number,
) {
  const product = cart.find((i) => i.product.id === itemId);
  if (product) {
    product.quantity += qty;
    if (product.quantity <= 0) {
      return removeFromCart(cart, itemId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    await mutate("cart", cart);
  }
}

export function formatCurrency(amount: Money) {
  if (!amount) return "";
  const intl = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: amount.currencyCode,
  });
  return intl.format(amount.amount);
}
