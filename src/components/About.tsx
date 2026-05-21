import React, { useEffect, useRef, useState } from "react";
import {
  Download,
  CheckCircle2,
  Github,
  Linkedin,
  Briefcase,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BASE_URL = import.meta.env.BASE_URL ?? "/";
const PROFILE_PHOTO_JPG = `${BASE_URL}assets/photo/profile.jpg`;
const PROFILE_PHOTO_WEBP = `${BASE_URL}assets/photo/profile.webp`;
const PROFILE_PHOTO_AVIF = `${BASE_URL}assets/photo/profile.avif`;
const PROFILE_PHOTO_FALLBACK = "assets/photo/profile.jpg";
const RESUME_PDF = `${BASE_URL}assets/resume/Danco-Analytics-Resume.pdf`;

const SKILLS = {
  LANGUAGES: ["Python", "SQL", "R", "JavaScript", "TypeScript", "HTML/CSS"],
  "ML/AI": [
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "XGBoost",
    "Keras",
    "OpenCV",
  ],
  DATA: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Tableau"],
  WEB: ["React", "Django", "FastAPI", "Supabase", "PostgreSQL", "REST APIs"],
  CLOUD: ["Google Cloud", "AWS", "Docker", "Linux", "Git", "CI/CD"],
  "KENYAN STACK": [
    "Safaricom Daraja API",
    "M-Pesa Integration",
    "KRA iTax",
    "KPLC data",
  ],
  TOOLS: ["VS Code", "Jupyter", "GSAP", "Figma", "Microsoft 365", "OSINT"],
};

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [photoLoadError, setPhotoLoadError] = useState(false);
  const [photoSrcIndex, setPhotoSrcIndex] = useState(0);
  const photoCandidates = [PROFILE_PHOTO_JPG, PROFILE_PHOTO_FALLBACK];

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-row",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top 85%",
          },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about-founder"
      className="py-24 bg-surface/20 border-t border-light/5"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <div className="text-brand font-mono text-sm tracking-widest uppercase mb-4">
            The Founder
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-2">
            Daniel Wanjala Machimbo
          </h2>
          <p className="text-xl text-light/70 font-mono text-sm mt-4">
            Data Scientist · ML Researcher · Full-Stack Engineer · IT Consultant
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left Column - Founder Card */}
          <div className="lg:col-span-4">
            <div className="bg-primary border border-light/10 rounded-xl p-6 sticky top-24">
              <div className="relative w-full aspect-square bg-surface border border-light/5 rounded-lg mb-6 flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-brand/5 group-hover:bg-brand/10 transition-colors z-10" />
                {!photoLoadError ? (
                  <picture className="absolute inset-0 h-full w-full">
                    <source srcSet={PROFILE_PHOTO_AVIF} type="image/avif" />
                    <source srcSet={PROFILE_PHOTO_WEBP} type="image/webp" />
                    <img
                      src={photoCandidates[photoSrcIndex]}
                      alt="Daniel Wanjala Machimbo"
                      className="h-full w-full object-cover"
                      onError={() => {
                        if (photoSrcIndex < photoCandidates.length - 1) {
                          setPhotoSrcIndex(photoSrcIndex + 1);
                          return;
                        }
                        setPhotoLoadError(true);
                      }}
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      sizes="(max-width: 1024px) 100vw, 380px"
                    />
                  </picture>
                ) : (
                  <div className="text-6xl font-display font-bold text-brand opacity-60">
                    DW
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-primary to-transparent z-20">
                  <div className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur px-2 py-1 rounded-full text-[10px] font-mono text-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Available for Projects
                  </div>
                </div>
              </div>

              <div className="text-sm font-mono text-light/60 mb-6 flex items-center gap-2">
                📍 Webuye, Bungoma · Nairobi, Kenya
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                  <span className="text-sm text-light/80">
                    MSc Data Science & ML — The Co-operative University of Kenya
                    (2024–2026)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                  <span className="text-sm text-light/80">
                    BSc Information Technology — Zetech University, Ruiru (2018–2022)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                  <span className="text-sm text-light/80">
                    Data Science Bootcamp — Moringa School, Nairobi (2023)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                  <span className="text-sm text-light/80">
                    Senior IT Consultant / Manager — Hospital Sector
                  </span>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <a
                  href="https://github.com/MadScie254"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  title="GitHub profile"
                  className="w-10 h-10 rounded-full bg-light/5 flex items-center justify-center hover:bg-brand hover:text-primary transition-colors interactive"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/daniel-wanjala-msc-912b8b17b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  title="LinkedIn profile"
                  className="w-10 h-10 rounded-full bg-light/5 flex items-center justify-center hover:bg-brand hover:text-primary transition-colors interactive"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://danco-analytics.github.io/Portifolio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Portfolio"
                  title="Portfolio"
                  className="w-10 h-10 rounded-full bg-light/5 flex items-center justify-center hover:bg-brand hover:text-primary transition-colors interactive text-xs font-bold"
                >
                  Portfolio
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={RESUME_PDF}
                  download
                  className="w-full bg-light/5 hover:bg-light/10 border border-light/10 border-dashed text-light py-3 rounded font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" /> Download CV (PDF)
                </a>
                <a
                  href={PROFILE_PHOTO_JPG}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-light/5 hover:bg-light/10 border border-light/10 text-light py-3 rounded font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  View Photo Asset
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Bio & Skills */}
          <div className="lg:col-span-8">
            <div className="prose prose-invert prose-lg max-w-none text-light/80 mb-16">
              <p>
                I'm a data scientist and engineer who grew up in Webuye, Bungoma. I founded
                Danco Analytics in 2023 because I was tired of watching African
                markets settle for SaaS products designed for San Francisco
                problems. I've managed IT systems for hospitals where
                electricity blackouts were life-threatening. I've trained ML
                models on datasets that barely had 500 rows. I know how to make
                things work with what you have.
              </p>
              <p>
                In my recent engagements, I have focused on solving complex challenges through data and engineering:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2"><strong>Architected a real estate SaaS platform,</strong> streamlining property management and increasing automated rent collection efficiency by 20%.</li>
                <li className="mb-2"><strong>Engineered hospital IT automation systems,</strong> reducing manual reporting and data processing time by 60% while maintaining critical uptime.</li>
                <li className="mb-2"><strong>Led a data science team</strong> to build an agricultural computer vision model, successfully classifying plant diseases from mobile photos with an accuracy exceeding 94%.</li>
              </ul>
              <p>
                Today I research electricity theft detection at postgraduate
                level, ship full-stack SaaS products, and take on consulting
                engagements for organizations that want to turn their data into
                something real. I believe Africa doesn't need to wait for
                Silicon Valley to solve African problems.
              </p>
            </div>

            <div className="skills-container bg-surface/30 border border-light/5 rounded-xl p-6 md:p-10">
              <div className="flex items-center gap-2 mb-8 text-brand font-mono text-sm uppercase tracking-widest">
                <Briefcase className="w-4 h-4" /> Skill Matrix
              </div>

              <div className="space-y-6 text-sm md:text-base">
                {Object.entries(SKILLS).map(([category, items]) => (
                  <div
                    key={category}
                    className="skill-row flex flex-col md:flex-row md:items-start gap-4 md:gap-8 border-b border-light/5 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="font-mono text-light/40 w-32 shrink-0 pt-1">
                      {category}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 bg-primary border border-light/10 rounded-md text-light/80 whitespace-nowrap"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
