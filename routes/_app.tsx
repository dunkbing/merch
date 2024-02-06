import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Header } from "@/components/Header.tsx";
import { Footer } from "@/components/Footer.tsx";

export default function App({ Component }: PageProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/app.css" />
        <link rel="stylesheet" href="/styles.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
        />
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/toastify-js"
        />
      </Head>
      <Header />
      <Component />
      <Footer />
    </>
  );
}
