"use client";

import React, { useRef } from "react";

// Swiper components, modules and styles
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Icons
import { ChevronLeft, ChevronRight } from "lucide-react";

// Theme hook
import { useTheme } from "@/components/context/theme-provider";

// Our custom button component
import SliderButtons from "./slide-buttons";

interface Slide {
  id: number;
  image: string;
  title?: string;
  tagline?: string;
  buttons?: ButtonProps[];
}

interface ButtonProps {
  id: number;
  text: string;
  link: string;
  type: string;
}

interface DemoSliderProps {
  data: Slide[];
}

const DemoSlider: React.FC<DemoSliderProps> = ({ data }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { theme } = useTheme();

  // Theme-aware navigation button styles
  const getNavButtonStyles = () => {
    switch (theme) {
      case "dark":
        return {
          bg: "bg-white/10 hover:bg-white/20",
          border: "border-white/20",
          icon: "text-white group-hover:text-white/80",
        };
      case "purple":
        return {
          bg: "bg-white/10 hover:bg-white/20",
          border: "border-white/20",
          icon: "text-primary group-hover:text-chart-1",
        };
      case "light":
      default:
        return {
          bg: "bg-white/10 hover:bg-white/20",
          border: "border-white/20",
          icon: "text-primary group-hover:text-primary/80",
        };
    }
  };

  const navStyles = getNavButtonStyles();

  return (
    <section className="w-full relative overflow-hidden">
      <div className="h-screen w-full relative">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          navigation={false}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} material-pagination-bullet"></span>`;
            },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={800}
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          className="material-swiper h-full w-full"
        >
          {data.map(({ id, image, tagline, title, buttons }) => {
            const hasContent =
              title || tagline || (buttons && buttons.length > 0);

            return (
              <SwiperSlide key={id} className="h-full w-full">
                <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
                  {/* Centered Image Container */}
                  <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
                    <div
                      className={`relative w-full ${
                        hasContent ? "aspect-[16/10]" : "aspect-[4/3]"
                      } max-h-[85vh] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]`}
                    >
                      {/* Image with smooth transitions */}
                      <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-out scale-105 hover:scale-100"
                        style={{
                          backgroundImage: `url(${image})`,
                        }}
                      />

                      {/* Material You Overlay - only show if there's content */}
                      {hasContent && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
                        </>
                      )}

                      {/* Content Overlay - only render if there's content */}
                      {hasContent && (
                        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 sm:px-8 lg:px-12">
                          {tagline && (
                            <div className="mb-4 animate-fade-in">
                              <p className="text-sm sm:text-lg lg:text-xl font-medium text-white/90 backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full inline-block border border-white/20">
                                {tagline}
                              </p>
                            </div>
                          )}
                          {title && (
                            <div className="animate-fade-in-up">
                              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 lg:mb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                                {title}
                              </h1>
                            </div>
                          )}
                          {buttons && buttons.length > 0 && (
                            <div className="mt-6 lg:mt-8 animate-fade-in-delay">
                              <div className="inline-flex items-center gap-3 backdrop-blur-md bg-white/10 dark:bg-white/5 px-6 py-3 rounded-full border border-white/20 shadow-lg hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300">
                                <SliderButtons buttons={buttons} />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Custom Material You Navigation Buttons */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className={`absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full ${navStyles.bg} backdrop-blur-md border ${navStyles.border} transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 group`}
          aria-label="Previous slide"
        >
          <ChevronLeft
            className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors ${navStyles.icon}`}
          />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className={`absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full ${navStyles.bg} backdrop-blur-md border ${navStyles.border} transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 group`}
          aria-label="Next slide"
        >
          <ChevronRight
            className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors ${navStyles.icon}`}
          />
        </button>
      </div>
    </section>
  );
};

export default DemoSlider;
