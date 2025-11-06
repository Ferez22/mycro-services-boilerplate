import Hero from "@/components/landing-page/hero";

import Footer from "@/components/landing-page/footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { dataSlider } from "@/app/_data/slider-data";
import SlidesPresentation from "@/components/landing-page/slides-presentation";
import Accordions from "@/components/accordions";
import { PicturesScroll } from "@/components/landing-page/pictures-scroll";

const LandingPage = () => {
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
        <PicturesScroll />
      </BlurFade>

      <Footer />
    </main>
  );
};

export default LandingPage;
