import Cart from "@/islands/Cart.tsx";

export function Header() {
  return (
    <header
      class="h-[110px] sm:!h-[144px] w-full bg-cover bg-no-repeat relative"
      style={{
        backgroundImage: "url(/header_bg.svg)",
      }}
    >
      <div class="rainfall w-full h-full absolute" />
      <nav class="w-11/12 h-24 max-w-5xl mx-auto flex items-center justify-between relative">
        <a
          href="/"
          className="flex flex-row items-center space-x-2 mt-4 cursor-pointer"
        >
          <img
            src="/logo.svg"
            alt="SheetNhac Logo"
            class="h-16 w-16"
          />
          <img
            src="/text_logo.svg"
            alt="SheetNhac Logo"
            width="130"
            height="24"
          />
        </a>
        <div className="flex flex-row items-center space-x-4 mt-4 text-xl font-semibold font-serif text-gray-700 hover:text-gray-600">
          <a href="/">
            Trang chủ
          </a>
          <a href="/posts/scales">
            Âm giai
          </a>
          <a href="/posts/chords">
            Hợp âm
          </a>
        </div>
        {/* <Cart /> */}
      </nav>
    </header>
  );
}
