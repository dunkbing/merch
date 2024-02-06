interface AddToCartProps {
  buy_now_url: string;
}

export default function BuyNow(props: AddToCartProps) {
  return (
    <a
      class={`w-full bg-gray-700 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-900 cursor-pointer`}
      href={props.buy_now_url}
      target="_blank"
    >
      {"Mua ngay"}
    </a>
  );
}
