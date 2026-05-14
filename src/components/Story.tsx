import React, { useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Monitor,
  GraduationCap,
  Stethoscope,
  Rocket,
  TrendingUp,
  Microchip,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_DATA = [
  {
    year: "2005",
    title: "WEBUYE ACK & ST. ANTHONY",
    description:
      "Began early education at Webuye ACK Primary, later advancing to St. Anthony High School Kitale. The foundation of discipline and academic rigor took root here.",
    quote: "Education wasn't just a path; it was a promise.",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    year: "2018",
    title: "ZETECH UNIVERSITY, RUIRU",
    description:
      "BSc Information Technology begins in Ruiru. Daniel discovers Python. Writes his first ML model. Realizes data science is not just a career — it's a lens.",
    quote:
      "I saw a dataset of Kenyan crop failures and thought: someone should have predicted this. I decided that someone would be me.",
    icon: <Monitor className="w-6 h-6" />,
  },
  {
    year: "2021",
    title: "MORINGA SCHOOL, NAIROBI",
    description:
      "Data Science & Software Engineering Bootcamp. 12 weeks. 80-hour weeks. Production-grade projects. Capstone project: InvestWise Predictor — an ML-powered investment advisory tool for the Kenyan market.",
    quote: "Moringa didn't just teach me to code. It taught me to ship.",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    year: "2022",
    title: "HOSPITAL SYSTEMS & THE REAL WORLD",
    description:
      'Joins Webuye County Hospital as Senior IT Consultant. Later, Kingdom Faith-Based Hospital. Manages mission-critical systems. Discovers what "uptime means life" feels like. Builds automation tools that cut manual reporting time by 60%.',
    quote:
      "Healthcare data taught me that bad data systems don't just cost money. They cost lives.",
    icon: <Stethoscope className="w-6 h-6" />,
  },
  {
    year: "2023",
    title: "DANCO ANALYTICS IS BORN",
    description:
      "From a small desk in Ruiru, Daniel registers Danco Analytics. Vision: build AI-powered products for African markets that global SaaS ignores. First project: Plant Disease Detection AI (Capstone Lazarus).",
    quote:
      "I named the company after myself — Wanjala → Wan → Dan. Danco. It was personal. It still is.",
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    year: "2024",
    title: "THE PORTFOLIO EXPANDS",
    description:
      "NyumbaIQ launches. PesaLens: personal finance intelligence for the M-Pesa generation. InvoiceKE, CViQ, MediShift, AgriAI Kenya — all shipping. GDP Forecast Model for Kenya published on GitHub.",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    year: "2025–2026",
    title: "MSc RESEARCH & SCALE",
    description:
      'Enrolls in MSc Data Science & Machine Learning at The Co-operative University of Kenya. Research: "ML-Based Electricity Theft Detection Under Severe Class Imbalance" — directly applicable to Kenya Power (KPLC). Danco Analytics now serves clients across healthcare, agri, real estate, and finance.',
    quote: "The mission has never been clearer.",
    icon: <Microchip className="w-6 h-6" />,
  },
];

export function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Line drawing animation
      gsap.fromTo(
        lineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        },
      );

      // Card animations
      gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          },
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-24 relative z-10" ref={containerRef}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="mb-20">
          <div className="text-brand font-mono text-sm tracking-widest uppercase mb-4">
            The Origin Story
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            From Webuye to the Frontier of African AI.
          </h2>
          <p className="text-xl text-light/70 max-w-2xl">
            Every great company begins with a single, stubborn decision to
            build.
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none text-light/80 mb-24">
          <p className="italic text-2xl leading-relaxed text-light/90 border-l-4 border-brand pl-6 my-10">
            "It started not with venture capital or a polished pitch deck — but
            with a second-hand laptop, a Safaricom data bundle, and a burning
            question: 'Why do African markets have to accept solutions built for
            someone else's problems?'"
          </p>
          <p>
            Daniel Wanjala Machimbo grew up in Webuye, Bungoma — a vibrant town in Western Kenya
            where ambition and hustle are survival skills. He didn't come from a tech family.
            But he had something more valuable: an obsession with understanding how systems work,
            and an unshakeable belief that data could fix things.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Subtle background line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-brand/10 -translate-x-1/2"></div>
          {/* Animated active line */}
          <div
            ref={lineRef}
            className="absolute left-6 md:left-1/2 top-0 w-px bg-brand -translate-x-1/2 origin-top"
            style={{ boxShadow: "0 0 10px rgba(29,158,117,0.5)" }}
          ></div>

          <div className="space-y-16">
            {TIMELINE_DATA.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.year}
                  className={cn(
                    "timeline-card relative flex items-center md:justify-between w-full flex-col md:flex-row gap-8 md:gap-0",
                    isEven ? "md:flex-row-reverse" : "",
                  )}
                >
                  {/* Icon Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-surface border-2 border-brand flex items-center justify-center text-brand z-10">
                    {item.icon}
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-[45%]" />

                  {/* Card Content */}
                  <div className="w-full md:w-[45%] pl-20 md:pl-0">
                    <div
                      className={cn(
                        "relative p-8 rounded-xl bg-surface/50 border border-light/10 backdrop-blur-sm group hover:border-brand/50 transition-colors",
                        isEven ? "md:text-left" : "md:text-left",
                      )}
                    >
                      {/* Watermark Year */}
                      <div
                        className={cn(
                          "absolute font-display font-bold text-8xl text-light/5 select-none pointer-events-none -translate-y-8 tracking-tighter",
                          isEven ? "right-4" : "right-4 md:left-4",
                        )}
                      >
                        {item.year.slice(0, 4)}
                      </div>

                      <div className="relative z-10">
                        <div className="text-brand font-mono text-sm tracking-widest mb-2">
                          [{item.year}]
                        </div>
                        <h3 className="font-display text-xl font-bold mb-4 tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-light/70 leading-relaxed mb-4 text-sm md:text-base">
                          {item.description}
                        </p>
                        {item.quote && (
                          <blockquote className="border-l-2 border-brand pl-4 py-1 italic text-light/90 text-[15px]">
                            "{item.quote}"
                          </blockquote>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
