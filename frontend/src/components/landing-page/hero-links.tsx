import { CONFIG } from "@/config-global";
import Image from "next/image";

const HeroLinks = () => {
  return (
    <section className="flex gap-[24px] flex-wrap items-center justify-center">
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
        See my portfolio
      </a>
    </section>
  );
};

export default HeroLinks;
