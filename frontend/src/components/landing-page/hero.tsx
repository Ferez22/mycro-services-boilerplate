import { ShinyButton } from "../ui/shiny-button";
import { CONFIG } from "@/config-global";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full rounded-3xl py-8 flex flex-col gap-16">
      <div className="flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-8xl font-bold uppercase">{CONFIG.appName}</h1>
          <p className="text-lg text-gray-500 max-w-2xl text-center">
            {CONFIG.appDescription}
          </p>
        </div>
        <ShinyButton>Get Started</ShinyButton>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/hero-image.png"
          alt="Hero Image"
          className="rounded-3xl shadow-lg border-4 border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-shadow ease-in-out"
          width={1000}
          height={1000}
        />
      </div>
    </section>
  );
};

export default Hero;
