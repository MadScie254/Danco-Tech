import React, { useEffect, useRef } from "react";
import { ArrowUpRight, BookText } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ARTICLES = [
  {
    title: "Unpacking the Byte: The Tiny Titan of Data!",
    platform: "DEV Community",
    topic: "Computer Science fundamentals — byte explained",
    url: "https://dev.to/wanjala/byte-the-data-building-block-16ni",
    published: "June 2024",
    tags: ["#computerscience", "#beginners", "#devchallenge"],
    isDevto: true,
  },
  {
    title: "Analyzing the Growth of Netflix Over the Last 20 Years",
    platform: "LinkedIn",
    topic: "Data science project — 20-year streaming growth analysis",
    url: "https://linkedin.com/in/daniel-wanjala-msc-912b8b17b/",
    published: "Project Analysis",
    tags: ["#datascience", "#analytics", "#python"],
    isDevto: false,
  },
];

export function Articles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".article-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="articles" className="py-24" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
          <div>
            <div className="text-brand font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
              <BookText className="w-4 h-4" /> Thought Leadership
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Writing at the Intersection of Data and Africa.
            </h2>
          </div>
          <div className="flex gap-4">
            <a
              href="https://dev.to/wanjala"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-mono text-light/50 hover:text-light transition-colors"
            >
              DEV.to/wanjala
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {ARTICLES.map((article, i) => (
            <div
              key={i}
              className="article-card flex flex-col bg-surface/30 border border-light/10 p-8 rounded-xl hover:bg-surface/50 hover:border-brand/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`px-2 py-1 text-[10px] font-bold tracking-wider rounded uppercase ${article.isDevto ? "bg-black text-white" : "bg-mint text-primary"}`}
                >
                  {article.platform}
                </div>
                <div className="text-xs font-mono text-light/40">
                  {article.published}
                </div>
              </div>

              <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-brand transition-colors">
                {article.title}
              </h3>

              <p className="text-light/60 text-sm mb-6 flex-grow">
                {article.topic}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                <div className="flex gap-2">
                  {article.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono text-light/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-light transition-colors interactive"
                >
                  Read Article <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-light/50 font-mono text-sm">
            More articles coming soon — follow on{" "}
            <a
              href="https://dev.to/wanjala"
              target="_blank"
              rel="noreferrer"
              className="text-brand hover:underline"
            >
              DEV.to
            </a>{" "}
            and{" "}
            <a
              href="https://linkedin.com/in/daniel-wanjala-msc-912b8b17b/"
              target="_blank"
              rel="noreferrer"
              className="text-brand hover:underline"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
