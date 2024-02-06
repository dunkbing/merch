import { useState } from "preact/hooks";
import { addToCart, useCart } from "@/utils/data.ts";
import { Product } from "@/utils/types.ts";

type AddToCartProps = Product;

export default function AddToCart(props: AddToCartProps) {
  const data = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const add = (e: MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(props);
    setIsAdding(false);
  };

  return (
    <div class="w-full flex flex-row space-x-1">
      <a
        class={`w-1/2 bg-gray-700 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-900 cursor-pointer`}
        href={props.buy_now_url}
        target="_blank"
      >
        {"Mua ngay"}
      </a>
      <button
        onClick={add}
        disabled={!data && !isAdding}
        class={`w-1/2 ${
          isAdding ? "!bg-gray-400" : "bg-gray-700"
        } border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-900 cursor-pointer`}
      >
        {isAdding ? "Đang thêm..." : "Thêm vào giỏ hàng"}
      </button>
    </div>
  );
}
