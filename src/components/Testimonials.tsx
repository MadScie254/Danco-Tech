import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Daniel built our entire patient records management system from scratch. It went live in 6 weeks and has been running without failure for 8 months. He understood our constraints — limited bandwidth, frequent power outages. He built for Kenya, not for Silicon Valley.",
    author: "Wekesa Simiyu",
    org: "County Hospital, Western Kenya",
  },
  {
    quote:
      "The GDP forecasting model Daniel delivered gave our research team a 12-month lead on macroeconomic trend signals. Technically excellent, and he explained the methodology so we could trust the outputs.",
    author: "Amina Nafula",
    org: "East African Policy Institute",
  },
  {
    quote:
      "Finally, a tech partner who doesn't need me to explain why M-Pesa matters. NyumbaIQ has transformed how we manage our 40-unit portfolio.",
    author: "Kamau Njoroge",
    org: "Nairobi",
  },
  {
    quote:
      "His expertise in Machine Learning is exceptional. He was able to take our messy agricultural datasets and turn them into a clear, performant computer vision model.",
    author: "Lead Agronomist",
    org: "AgriTech NGO",
  },
];

export function Testimonials() {
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
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          className="!pb-12"
        >
          {TESTIMONIALS.map((t, i) => (
            <SwiperSlide key={i} className="h-auto">
              <div className="h-full bg-surface/40 border border-light/10 p-8 rounded-xl flex flex-col cursor-grab active:cursor-grabbing hover:bg-surface/60 transition-colors">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-brand text-brand" />
                  ))}
                </div>

                <blockquote className="font-display text-xl leading-snug italic text-light/90 mb-8 flex-grow border-l-2 border-brand pl-4">
                  "{t.quote}"
                </blockquote>

                <div className="mt-auto">
                  <div className="font-semibold text-light">{t.author}</div>
                  <div className="text-sm font-mono text-light/50">{t.org}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
