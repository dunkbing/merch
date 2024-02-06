import { useRef } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import IconPlus from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/plus.tsx";
import IconMinus from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/minus.tsx";

import IconCart from "@/components/IconCart.tsx";
import {
  changeQuantity,
  formatCurrency,
  removeFromCart,
  useCart,
} from "@/utils/data.ts";

// Lazy load a <dialog> polyfill.
// @ts-expect-error HTMLDialogElement is not just a type!
if (IS_BROWSER && globalThis.HTMLDialogElement === "undefined") {
  await import(
    "https://raw.githubusercontent.com/GoogleChrome/dialog-polyfill/5033aac1b74c44f36cde47be3d11f4756f3f8fda/dist/dialog-polyfill.esm.js"
  );
}

const slideRight =
  "transition-transform duration-400 ease-in-out transform translate-x-full sm:translate-x-0";

const slideBottom =
  "transition-transform duration-400 ease-normal transform translate-y-full sm:translate-y-0";

const backdrop = "bg-black bg-opacity-50";

export default function Cart() {
  const { data, error } = useCart();
  const totalItems = data?.reduce((acc, item) => acc + item.quantity, 0);

  const ref = useRef<HTMLDialogElement | null>(null);

  const onDialogClick = (e: MouseEvent) => {
    if ((e.target as HTMLDialogElement).tagName === "DIALOG") {
      ref.current!.close();
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <button
        onClick={() => ref.current!.showModal()}
        class="flex items-center gap-2 border-2 border-gray-800 rounded-full px-5 py-1 font-semibold text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300"
      >
        <IconCart />
        {totalItems}
      </button>
      <dialog
        ref={ref}
        class={`bg-transparent p-0 m-0 pt-[50%] sm:pt-0 sm:ml-auto max-w-full sm:max-w-lg w-full max-h-full h-full ${slideBottom} sm:${slideRight} ${backdrop}`}
        onClick={onDialogClick}
      >
        <CartInner />
      </dialog>
    </div>
  );
}

function CartInner() {
  const corners = "rounded(tl-2xl tr-2xl sm:(tr-none bl-2xl))";
  const card =
    `py-8 px-6 h-full bg-white ${corners} flex flex-col justify-between`;
  const { data: cart, error } = useCart();

  const subTotal = cart?.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const checkout = (e: Event) => {
    e.preventDefault();
    if (cart?.length) {
      // location.href = products.checkoutUrl;
    }
  };

  const remove = (itemId: string) => {
    if (cart) {
      removeFromCart(cart, itemId);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div class={card}>
      <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">Giỏ hàng</h2>
        <button
          class="py-1"
          onClick={(e) => {
            (e.target as HTMLButtonElement).closest("dialog")!.close();
          }}
        >
          <svg
            class="w-6 h-6 fill-current text-gray-600"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
      {cart && (
        <div class="flex-grow-1 my-4">
          {cart.length === 0
            ? <p class="text-gray-700">There are no items in the cart.</p>
            : (
              <ul role="list" class="-my-6 divide-y divide-gray-200">
                {cart.map(({ product, quantity }) => (
                  <li class="flex py-6">
                    <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.thumb_url}
                        alt={product.name}
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div class="ml-4 flex flex-1 flex-col">
                      <div>
                        <div class="flex justify-between text-base font-medium text-gray-900">
                          <h3>{product.name}</h3>
                          <p class="ml-4">
                            {formatCurrency({
                              amount: product.price,
                              currencyCode: "VND",
                            })}
                          </p>
                        </div>
                        <p class="mt-1 text-sm text-gray-500">
                          {product.name}
                        </p>
                      </div>
                      <div class="flex flex-1 items-end justify-between text-sm">
                        <p class="text-gray-500 flex flex-row space-x-3 items-center">
                          <span>Số lượng</span>
                          <strong class="flex flex-row items-center justify-center space-x-2">
                            <button
                              class="border-gray-300 border-2 rounded-full"
                              onClick={() =>
                                changeQuantity(cart, product.id, -1)}
                            >
                              <IconMinus size={18} />
                            </button>
                            <span class="text-lg">{quantity}</span>
                            <button
                              class="border-gray-300 border-2 rounded-full"
                              onClick={() =>
                                changeQuantity(cart, product.id, 1)}
                            >
                              <IconPlus size={18} />
                            </button>
                          </strong>
                        </p>
                        <div class="flex">
                          <button
                            type="button"
                            class="font-medium"
                            onClick={() => remove(product.id)}
                          >
                            Xoá
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
        </div>
      )}
      {cart && (
        <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
          <div class="flex justify-between text-lg font-medium">
            <p>Tổng cộng</p>
            <p>
              {formatCurrency({
                amount: subTotal as number,
                currencyCode: "VND",
              })}
            </p>
          </div>
          <div class="mt-3">
            <button
              type="button"
              class="w-full bg-gray-700 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700"
              disabled={cart.length === 0}
              onClick={checkout}
            >
              Thanh toán
            </button>
          </div>
          <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              <button
                type="button"
                class="font-medium"
                onClick={(e) => {
                  (e.target as HTMLButtonElement).closest("dialog")!.close();
                }}
              >
                Tiếp tục mua sắm <span aria-hidden="true">&rarr;</span>
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
