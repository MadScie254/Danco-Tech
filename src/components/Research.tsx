import React from "react";
import {
  BookOpen,
  ExternalLink,
  Microchip,
  Database,
  Zap,
  Binary,
} from "lucide-react";

const TAGS = [
  "Economic Forecasting",
  "Agricultural AI",
  "Healthcare Analytics",
  "Smart Grid Security",
  "Predictive Modeling",
  "Class Imbalance",
  "Computer Vision",
  "NLP for Swahili",
];

export function Research() {
  return (
    <section
      id="research"
      className="py-24 bg-surface/30 border-y border-light/5"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <div className="text-brand font-mono text-sm tracking-widest uppercase mb-4">
            Research
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Where Rigor Meets Real-World Impact.
          </h2>
          <p className="text-xl text-light/70">
            Academic research focused on problems that matter for Africa.
          </p>
        </div>

        {/* Featured Paper */}
        <div className="bg-primary border border-brand/30 rounded-xl p-8 md:p-10 mb-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-brand pointer-events-none group-hover:scale-110 group-hover:opacity-10 transition-all duration-700">
            <BookOpen className="w-64 h-64" />
          </div>

          <div className="relative z-10 flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 border border-brand/40 bg-brand/10 text-brand px-3 py-1 text-xs font-mono rounded">
              FEATURED PAPER
            </div>

            <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight max-w-2xl">
              "Electricity Theft Detection Under Severe Class Imbalance Using
              Hybrid Ensemble ML"
            </h3>

            <div className="flex flex-col gap-2 font-mono text-xs md:text-sm text-light/60 bg-surface/50 p-4 rounded border border-light/10 w-full">
              <div className="flex gap-4">
                <span className="text-light/40 w-24">INSTITUTION</span>
                <span className="text-light/90">
                  The Co-operative University of Kenya
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-light/40 w-24">SUPERVISOR</span>
                <span className="text-light/90">
                  Dr. Andrew Kipkebut & Dr. Shem Mbandu Angolo
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-light/40 w-24">REGISTRATION</span>
                <span className="text-brand">C004/600201/2024</span>
              </div>
              <div className="flex gap-4">
                <span className="text-light/40 w-24">STATUS</span>
                <span className="text-[#C5A059]">
                  MSc Research — In Progress (2024–2026)
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-mono text-brand mb-2">ABSTRACT:</h4>
                <p className="text-sm text-light/70 leading-relaxed md:text-base">
                  Electricity theft costs utilities billions globally and
                  disproportionately impacts developing economies. This research
                  develops a hybrid ensemble framework combining XGBoost with
                  SMOTE+ENN resampling to detect non-technical losses from smart
                  meter time-series data. Trained on the SGCC dataset (537 theft
                  / 2,655 normal consumers), the model directly addresses Kenya
                  Power's (KPLC) fraud detection challenge.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6 border-t border-light/10 pt-6 font-mono text-xs text-light/60">
                <div>
                  <span className="text-light/40 block mb-1">METHODS</span>
                  <span className="text-light/80">
                    XGBoost · SMOTE+ENN · Random Forest · Ensemble ML
                  </span>
                </div>
                <div>
                  <span className="text-light/40 block mb-1">DATASET</span>
                  <span className="text-light/80">
                    SGCC (State Grid Corporation of China)
                  </span>
                </div>
                <div className="md:col-span-2">
                  <span className="text-light/40 block mb-1">
                    APPLICABILITY
                  </span>
                  <span className="text-light/80">
                    KPLC, African utilities, smart grid security
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <a
            href="https://orcid.org/0009-0005-1979-8555"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ORCID profile"
            className="flex items-center gap-3 border border-light/20 hover:border-[#C5A059] hover:bg-[#C5A059]/5 px-4 py-2 rounded transition-colors group interactive"
          >
            <div className="w-6 h-6 rounded-full bg-[#C5A059] flex items-center justify-center text-primary font-bold text-[10px]">
              iD
            </div>
            <span className="font-mono text-sm text-light/80 group-hover:text-light">
              0009-0005-1979-8555
            </span>
            <ExternalLink className="w-4 h-4 text-light/40 group-hover:text-[#C5A059]" />
          </a>

          <div className="flex flex-wrap gap-2 justify-end">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono bg-surface border border-light/5 px-2 py-1 text-light/50 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
