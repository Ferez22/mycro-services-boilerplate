import Hero from "@/components/landing-page/hero";
import Image from "next/image";
import { CONFIG } from "@/config-global";
import SlidesPresentation from "@/components/landing-page/slides-presentation";
import { dataSlider } from "./_data/slider-data";

export default function Home() {
  return (
    <main className="py-16">
      <Hero />
      <SlidesPresentation data={dataSlider} />

      <section className="flex gap-[24px] flex-wrap items-center justify-center my-16">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href={`https://${CONFIG.docsUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Docs
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://portfolio.ferez.cloud"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          See my portfolio →
        </a>
      </section>
      <footer className="pt-8">
        <p className="text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} {CONFIG.appName}. All rights
          reserved.
          <br />
          <a
            className="text-sm text-gray-500 text-center hover:underline hover:underline-offset-4"
            href="https://www.ferez.cloud"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to ferez.cloud →
          </a>
        </p>
        <p className="text-sm text-gray-500 text-center hover:underline hover:underline-offset-4">
          <a
            className="text-sm text-gray-500 text-center hover:underline hover:underline-offset-4"
            href="https://www.ferez.cloud"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to ferez.cloud →
          </a>
        </p>
      </footer>
    </main>
  );
}
