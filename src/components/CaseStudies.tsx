import React from "react";
import { ArrowUpRight, TrendingUp, Clock, ShieldCheck } from "lucide-react";

const CASE_STUDIES = [
  {
    title: "Smart Grid Theft Detection",
    summary:
      "Reduced non-technical loss detection latency by deploying an ensemble model and automated triage pipeline for utility teams.",
    metric: "94.2%",
    metricLabel: "Model accuracy",
    impact: "3x faster investigation cycles",
    timeline: "12 weeks",
    stack: ["XGBoost", "SMOTE+ENN", "FastAPI", "PostgreSQL"],
    image: {
      avif: "/assets/case-studies/smart-grid.avif",
      webp: "/assets/case-studies/smart-grid.webp",
      jpg: "/assets/case-studies/smart-grid.jpg",
      alt: "Smart grid analytics dashboard",
    },
  },
  {
    title: "Real Estate Automation Suite",
    summary:
      "Built a multi-tenant SaaS platform for rent collection, tenant onboarding, and financial reporting with M-Pesa integration.",
    metric: "20%",
    metricLabel: "Collection lift",
    impact: "60% less manual reporting",
    timeline: "10 weeks",
    stack: ["React", "Supabase", "M-Pesa", "Recharts"],
    image: {
      avif: "/assets/case-studies/real-estate.avif",
      webp: "/assets/case-studies/real-estate.webp",
      jpg: "/assets/case-studies/real-estate.jpg",
      alt: "Real estate SaaS reporting screens",
    },
  },
  {
    title: "Hospital IT Automation",
    summary:
      "Delivered uptime-focused automation workflows for hospital reporting, inventory, and compliance across multiple facilities.",
    metric: "60%",
    metricLabel: "Process time saved",
    impact: "99.9% reporting availability",
    timeline: "8 weeks",
    stack: ["Python", "Power BI", "Linux", "CI/CD"],
    image: {
      avif: "/assets/case-studies/health-it.avif",
      webp: "/assets/case-studies/health-it.webp",
      jpg: "/assets/case-studies/health-it.jpg",
      alt: "Hospital operations dashboards",
    },
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 bg-surface/30 border-y border-light/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="text-brand font-mono text-sm tracking-widest uppercase mb-4">
              Case Studies
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Proof of Impact.
            </h2>
            <p className="text-xl text-light/70 max-w-2xl">
              Measurable outcomes across utilities, real estate, and healthcare.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-mono text-light/60 hover:text-brand transition-colors"
          >
            Start a similar build <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {CASE_STUDIES.map((study) => (
            <article
              key={study.title}
              className="flex flex-col bg-primary/70 border border-light/10 rounded-2xl overflow-hidden shadow-lg shadow-black/30"
            >
              <div className="relative">
                <picture>
                  <source srcSet={study.image.avif} type="image/avif" />
                  <source srcSet={study.image.webp} type="image/webp" />
                  <img
                    src={study.image.jpg}
                    alt={study.image.alt}
                    className="h-52 w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-6 gap-6">
                <div>
                  <h3 className="font-display text-2xl font-bold mb-3">
                    {study.title}
                  </h3>
                  <p className="text-sm text-light/70 leading-relaxed">
                    {study.summary}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono text-light/60">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-brand" />
                    <div>
                      <div className="text-light/40">{study.metricLabel}</div>
                      <div className="text-light font-semibold">
                        {study.metric}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand" />
                    <div>
                      <div className="text-light/40">Impact</div>
                      <div className="text-light font-semibold">
                        {study.impact}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand" />
                    <div>
                      <div className="text-light/40">Timeline</div>
                      <div className="text-light font-semibold">
                        {study.timeline}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {study.stack.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full bg-surface/60 border border-light/10 text-xs text-light/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
