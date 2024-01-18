import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Header } from "@/components/Header.tsx";
import { Footer } from "@/components/Footer.tsx";

export default function App({ Component }: PageProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/app.css" />
      </Head>
      <Header />
      <Component />
      <Footer />
    </>
  );
}
