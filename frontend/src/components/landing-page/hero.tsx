import { ShinyButton } from "../ui/shiny-button";
import { CONFIG } from "@/config-global";
import HeroLinks from "./hero-links";
import { Testimonials } from "./testimonials";
import { Highlighter } from "@/components/ui/highlighter";
import { AnimatedShinyTextComponent } from "../animation-shiny-text";

const Hero = () => {
  return (
    <section className="relative w-full rounded-3xl flex flex-col gap-18">
      <div className="flex flex-col items-center justify-center gap-16">
        <AnimatedShinyTextComponent />
        <div className="flex flex-col items-center justify-center gap-12">
          <h1 className="text-9xl font-bold uppercase">{CONFIG.appName}</h1>
          <p className="text-lg text-gray-500 max-w-2xl text-center">
            A{" "}
            <Highlighter action="highlight" color="#FF9800">
              boilerplate/template
            </Highlighter>{" "}
            frontend with many ready to use features and pages like a{" "}
            <Highlighter action="underline" color="#87CEFA">
              dashboard,
            </Highlighter>{" "}
            a{" "}
            <Highlighter action="underline" color="#87CEFA">
              chat interface
            </Highlighter>{" "}
            and more!
          </p>
        </div>
        <div className="flex items-center justify-center gap-8">
          <HeroLinks />
          <ShinyButton>Get Started →</ShinyButton>
        </div>
      </div>
      <Testimonials />
    </section>
  );
};

export default Hero;
