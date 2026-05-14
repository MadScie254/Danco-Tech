import React, { useEffect, useRef } from "react";
import { Github, Star, GitFork, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REPOS = [
  {
    name: "Capstone-Lazarus",
    description:
      "Plant disease detection system using CNNs and image processing.",
    lang: "Jupyter Notebook",
    langColor: "#D4AF6E",
    stars: 8,
    forks: 3,
    url: "https://github.com/MadScie254/Capstone-Lazarus",
  },
  {
    name: "Invest-wise",
    description:
      "ML investment advisory for the Kenyan market. CBK data + NSE analysis.",
    lang: "Python",
    langColor: "#D4AF6E",
    stars: 10,
    forks: 1,
    url: "https://github.com/MadScie254/Invest-wise",
  },
  {
    name: "Phase-3-project-modelling",
    description:
      "Kenya GDP growth prediction using Random Forest + HistGradientBoosting. Features: CBK exchange rates, inflation data, historical GDP.",
    lang: "Jupyter Notebook",
    langColor: "#D4AF6E",
    stars: 5,
    forks: 5,
    url: "https://github.com/MadScie254/Phase-3-project-modelling",
  },
  {
    name: "ad-click-predictor",
    description: '"Life-changing project" — ad click prediction ML pipeline.',
    lang: "Jupyter Notebook",
    langColor: "#D4AF6E",
    stars: 3,
    forks: 0,
    url: "https://github.com/MadScie254/ad-click-predictor",
  },
  {
    name: "gdp_forcast_sample",
    description: "Kenya GDP forecast over time — economic modelling template.",
    lang: "Jupyter Notebook",
    langColor: "#D4AF6E",
    stars: 6,
    forks: 2,
    url: "https://github.com/MadScie254/gdp_forcast_sample",
  },
  {
    name: "Danco-Analytics/R_Presentation",
    description:
      "MSc coursework R statistical analysis & presentation. Academic research output.",
    lang: "HTML",
    langColor: "#D4AF6E",
    stars: 2,
    forks: 0,
    url: "https://github.com/Danco-Analytics/R_Presentation",
  },
];

export function GithubProjects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".github-card",
        { opacity: 0, rotateY: 30, x: -30 },
        {
          opacity: 1,
          rotateY: 0,
          x: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="github" className="py-24 relative z-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
          <div>
            <div className="text-brand font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
              <Github className="w-4 h-4" /> Open Source
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              The Work Speaks for Itself.
            </h2>
            <p className="text-xl text-light/70 max-w-2xl">
              Production ML pipelines, economic models, and AI systems — all on
              GitHub.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/MadScie254"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-mono text-light/50 hover:text-brand transition-colors"
            >
              @MadScie254
            </a>
            <a
              href="https://github.com/Danco-Analytics"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-mono text-light/50 hover:text-brand transition-colors"
            >
              @Danco-Analytics
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 perspective-1000">
          {REPOS.map((repo, i) => (
            <div
              key={i}
              className="github-card flex flex-col bg-surface/40 border-l-[3px] border-l-brand border-y border-r border-y-light/10 border-r-light/10 p-6 rounded-r-lg hover:bg-surface/80 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-brand hover:underline font-bold text-[15px] truncate pr-4"
                >
                  {repo.name}
                </a>
              </div>
              <p className="text-sm text-light/70 mb-6 flex-grow">
                {repo.description}
              </p>

              <div className="flex items-center gap-4 text-xs font-mono text-light/50">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: repo.langColor }}
                  />
                  {repo.lang}
                </div>
                {repo.stars > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" /> {repo.stars}
                  </div>
                )}
                {repo.forks > 0 && (
                  <div className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" /> {repo.forks}
                  </div>
                )}
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto flex items-center gap-1 text-light/30 hover:text-light transition-colors"
                >
                  View <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://github.com/MadScie254"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-light/5 hover:bg-light/10 px-8 py-4 rounded text-sm font-medium transition-colors border border-light/10"
          >
            <Github className="w-5 h-5" /> Browse All Repositories on GitHub{" "}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
