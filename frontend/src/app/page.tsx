import Hero from "@/components/landing-page/hero";
import Image from "next/image";
import Footer from "@/components/landing-page/footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { dataSlider } from "@/app/_data/slider-data";
import SlidesPresentation from "@/components/landing-page/slides-presentation";
import Accordions from "@/components/accordions";

export default function Home() {
  return (
    <main className="py-12">
      <BlurFade delay={0.25} inView>
        <Hero />
      </BlurFade>

      <BlurFade delay={0.25} inView>
        <SlidesPresentation data={dataSlider} />
      </BlurFade>

      <BlurFade delay={0.25} inView>
        <div className="flex items-center justify-start gap-16 min-h-[300px] p-16">
          <div className="flex gap-4 justify-center flex-1">
            <h1 className="text-4xl font-bold">FAQ</h1>
          </div>
          <div className="flex flex-col gap-4 justify-end flex-1">
            <Accordions />
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.25} inView className="my-18">
        <div className="flex items-center justify-start gap-4">
          <div className="flex gap-4  flex-1">
            <Image
              src="/interior-image.jpg"
              alt="Hero Image"
              className="rounded-3xl shadow-lg border-4 border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-shadow ease-in-out"
              width={300}
              height={500}
            />
          </div>
          <BlurFade delay={0.25} inView className="my-18">
            <div className="flex gap-4  flex-1">
              <Image
                src="/interior-image.jpg"
                alt="Hero Image"
                className="rounded-3xl shadow-lg border-4 border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-shadow ease-in-out"
                width={300}
                height={500}
              />
            </div>
          </BlurFade>
          <BlurFade delay={0.25} inView className="my-18">
            <div className="flex gap-4  flex-1">
              <Image
                src="/interior-image.jpg"
                alt="Hero Image"
                className="rounded-3xl shadow-lg border-4 border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-shadow ease-in-out"
                width={300}
                height={500}
              />
            </div>
          </BlurFade>
          <BlurFade delay={0.25} inView className="my-18">
            <div className="flex gap-4  flex-1">
              <Image
                src="/interior-image.jpg"
                alt="Hero Image"
                className="rounded-3xl shadow-lg border-4 border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-shadow ease-in-out"
                width={300}
                height={500}
              />
            </div>
          </BlurFade>
        </div>
      </BlurFade>

      <Footer />
    </main>
  );
}
