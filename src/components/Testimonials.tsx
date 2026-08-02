import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import { Star } from "lucide-react";
import { REDUCED_MOTION_QUERY, prefersReducedMotion } from "../lib/motion";

const TESTIMONIALS = [
  {
    quote:
      "Daniel built our entire patient records management system from scratch. It went live in 6 weeks and has been running without failure for 8 months. He understood our constraints — limited bandwidth, frequent power outages. He built for Kenya, not for Silicon Valley.",
    author: "Wekesa Simiyu",
    org: "County Hospital, Western Kenya",
    photoUrl: undefined,
    linkedIn: undefined,
  },
  {
    quote:
      "The GDP forecasting model Daniel delivered gave our research team a 12-month lead on macroeconomic trend signals. Technically excellent, and he explained the methodology so we could trust the outputs.",
    author: "Amina Nafula",
    org: "East African Policy Institute",
    photoUrl: undefined,
    linkedIn: undefined,
  },
  {
    quote:
      "Finally, a tech partner who doesn't need me to explain why M-Pesa matters. NyumbaIQ has transformed how we manage our 40-unit portfolio.",
    author: "Kamau Njoroge",
    org: "Nairobi",
    photoUrl: undefined,
    linkedIn: undefined,
  },
  {
    quote:
      "His expertise in Machine Learning is exceptional. He was able to take our messy agricultural datasets and turn them into a clear, performant computer vision model.",
    author: "Lead Agronomist",
    org: "AgriTech NGO",
    photoUrl: undefined,
    linkedIn: undefined,
  },
];

export function Testimonials() {
  const [reduceMotion, setReduceMotion] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    setReduceMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <section
      id="testimonials"
      className="py-24 overflow-hidden border-t border-light/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="text-brand font-mono text-sm tracking-widest uppercase mb-4">
          What People Say
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold max-w-2xl">
          Trusted by organizations that can't afford to get it wrong.
        </h2>
      </div>

      <div className="pl-6 md:pl-12">
        <Swiper
          modules={[A11y, Autoplay, Keyboard]}
          spaceBetween={30}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
          }}
          autoplay={
            reduceMotion
              ? false
              : {
                  delay: 4000,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: true,
                }
          }
          keyboard={{ enabled: true }}
          loop={!reduceMotion}
          a11y={{ enabled: true }}
          className="!pb-12"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={`${t.author}-${t.org}`} className="h-auto">
              <div className="h-full bg-surface/40 border border-light/10 p-8 rounded-xl flex flex-col cursor-grab active:cursor-grabbing hover:bg-surface/60 transition-colors">
                <div className="flex gap-1 mb-6" aria-hidden="true">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-brand text-brand" />
                  ))}
                </div>

                <blockquote className="font-display text-xl leading-snug italic text-light/90 mb-8 flex-grow border-l-2 border-brand pl-4">
                  "{t.quote}"
                </blockquote>

                <div className="mt-auto">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {t.linkedIn && (
                        t.photoUrl ? (
                          <img
                            src={t.photoUrl}
                            alt={`${t.author} profile picture for Danco Analytics testimonial`}
                            className="w-8 h-8 rounded-full object-cover border border-light/20"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full border border-light/20 bg-light/5 flex items-center justify-center text-[10px] font-mono text-light/70">
                            {t.author
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                        )
                      )}
                      <div>
                        <div className="font-semibold text-light">{t.author}</div>
                        <div className="text-sm font-mono text-light/50">{t.org}</div>
                      </div>
                    </div>
                    {t.linkedIn && (
                      <a
                        href={t.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-brand hover:text-brand/80 transition-colors"
                      >
                        View on LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
