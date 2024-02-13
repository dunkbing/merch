import IconBrandTwitter from "tabler_icons_tsx/brand-twitter.tsx";
import IconBrandTiktok from "tabler_icons_tsx/brand-tiktok.tsx";
import IconBrandFacebook from "tabler_icons_tsx/brand-facebook.tsx";

import GitHub from "./IconGithub.tsx";

export function Footer() {
  return (
    <footer class="w-11/12 max-w-5xl mx-auto mt-24 sm:!mt-28 mb-8 flex items-center justify-between">
      <span class="text-gray-600">
        Copyright © 2024 | Sheet Nhạc. All rights reserved.
      </span>
      <span class="flex items-center gap-4">
        <a
          class="hover:underline flex gap-2 items-center font-bold text-xl text-gray-600"
          href="https://www.tiktok.com/@sheetnhac.cc"
          target="_blank"
        >
          <IconBrandTiktok class="" size={30} />
          TikTok
        </a>
      </span>
    </footer>
  );
}
