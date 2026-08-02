import React from "react";
import { ArrowUpRight } from "lucide-react";

const BASE_URL = import.meta.env.BASE_URL ?? "/";
const CASE_STUDIES = [
  {
    title: "Smart Grid Theft Detection",
    problem:
      "Utility teams faced delayed non-technical loss detection and manual triage cycles that slowed response time.",
    approach:
      "Deployed an ensemble model with automated triage workflows to flag high-risk cases for investigation.",
    result:
      "Investigation cycles became faster and incident prioritization more consistent across teams.",
    // TODO: Replace with a verified KPI and citation from client delivery records.
    proof: "TODO: Add verified model accuracy and investigation cycle reduction.",
    stack: ["XGBoost", "SMOTE+ENN", "FastAPI", "PostgreSQL"],
    image: {
      avif: `${BASE_URL}assets/case-studies/smart-grid.avif`,
      webp: `${BASE_URL}assets/case-studies/smart-grid.webp`,
      jpg: `${BASE_URL}assets/case-studies/smart-grid.jpg`,
      alt: "Smart grid analytics dashboard",
    },
  },
  {
    title: "Real Estate Automation Suite",
    problem:
      "Property managers were operating fragmented workflows for collections, onboarding, and reporting.",
    approach:
      "Built a multi-tenant SaaS platform with M-Pesa integration and centralized operational dashboards.",
    result:
      "Teams reduced manual operational overhead and improved day-to-day visibility across portfolios.",
    // TODO: Replace with validated rent-collection and reporting efficiency metrics.
    proof: "TODO: Add verified collection lift and manual reporting reduction figures.",
    stack: ["React", "Supabase", "M-Pesa", "Recharts"],
    image: {
      avif: `${BASE_URL}assets/case-studies/real-estate.avif`,
      webp: `${BASE_URL}assets/case-studies/real-estate.webp`,
      jpg: `${BASE_URL}assets/case-studies/real-estate.jpg`,
      alt: "Real estate SaaS reporting screens",
    },
  },
  {
    title: "Hospital IT Automation",
    problem:
      "Hospital reporting, inventory, and compliance workflows were heavily manual and vulnerable to downtime.",
    approach:
      "Implemented automation workflows and reliability-first operations support across facility systems.",
    result:
      "Operations became more predictable, with reduced manual effort in critical reporting and compliance tasks.",
    // TODO: Add verified process-time savings and reporting availability evidence.
    proof: "TODO: Add validated uptime and time-saved metrics from operations logs.",
    stack: ["Python", "Power BI", "Linux", "CI/CD"],
    image: {
      avif: `${BASE_URL}assets/case-studies/health-it.avif`,
      webp: `${BASE_URL}assets/case-studies/health-it.webp`,
      jpg: `${BASE_URL}assets/case-studies/health-it.jpg`,
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
                    <div className="space-y-4">
                      <section>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-light/40 mb-2 border-b border-light/10 pb-2">
                          01. The Problem
                        </h4>
                        <p className="text-sm text-light/70 leading-relaxed">
                          {study.problem}
                        </p>
                      </section>
                      <section>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-brand mb-2 border-b border-light/10 pb-2">
                          02. Approach
                        </h4>
                        <p className="text-sm text-light/70 leading-relaxed">
                          {study.approach}
                        </p>
                      </section>
                      <section>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-[#A6CE39] mb-2 border-b border-light/10 pb-2">
                          03. Result
                        </h4>
                        <p className="text-sm text-light/70 leading-relaxed">
                          {study.result}
                        </p>
                      </section>
                      <section>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-light/40 mb-2 border-b border-light/10 pb-2">
                          04. Proof
                        </h4>
                        <p className="text-sm text-light/70 leading-relaxed">
                          {study.proof}
                        </p>
                      </section>
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
