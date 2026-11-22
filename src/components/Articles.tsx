import React, { useEffect, useRef } from "react";
import { ArrowUpRight, BookText } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../lib/motion";
import { ARTICLE_INSIGHTS } from "../lib/insights-catalog";

gsap.registerPlugin(ScrollTrigger);

export function Articles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

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
              href="https://www.linkedin.com/in/daniel-wanjala-machimbo-msc-912b8b17b/recent-activity/articles/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono text-light/50 hover:text-light transition-colors"
            >
              LinkedIn Articles
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {ARTICLE_INSIGHTS.map((article) => (
            <div
              key={article.id}
              className="article-card flex flex-col bg-surface/30 border border-light/10 p-8 rounded-xl hover:bg-surface/50 hover:border-brand/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="px-2 py-1 text-[10px] font-bold tracking-wider rounded uppercase bg-mint text-primary">
                  {article.venue}
                </div>
                <div className="text-xs font-mono text-light/40">
                  {article.when}
                </div>
              </div>

              <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-brand transition-colors">
                {article.title}
              </h3>

              <p className="text-light/60 text-sm mb-6 flex-grow">
                {article.summary}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                <div className="flex gap-2">
                  {article.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono text-light/40"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
              href="https://www.linkedin.com/in/daniel-wanjala-machimbo-msc-912b8b17b"
              target="_blank"
              rel="noopener noreferrer"
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
