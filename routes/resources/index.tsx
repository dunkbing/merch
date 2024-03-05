import { PageProps } from "$fresh/server.ts";

import { HeadElement } from "@/components/HeadElement.tsx";

export function Download(props: { url: string }) {
  return (
    <a
      href={props.url}
      download
      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    >
      Tải xuống
    </a>
  );
}

export default function ResourcesPage(ctx: PageProps) {
  const { url } = ctx;

  return (
    <div>
      <HeadElement
        image={url.href + "og-image.png"}
        title="Tài liệu"
        url={url}
      />
      <div
        class="w-8/12 max-w-5xl mx-auto mt-28"
        aria-labelledby="information-heading"
      >
        <h1 class="text-3xl font-bold text-gray-800">
          Tài liệu
        </h1>
        <ul class="list-disc">
          <li>
            Hanon{" "}
            <Download url="/resources/Le_Pianiste_virtuose_-_Premire_partie_1-20_-_C_L_Hanon.pdf" />
          </li>
          <li>
            Music Theory for Musicians and Normal People{" "}
            <Download url="/resources/the-whole-enchilada-set.pdf" />
          </li>
        </ul>
        <div class="my-8" />
      </div>
    </div>
  );
}
