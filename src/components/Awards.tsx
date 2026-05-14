import React from "react";
import { Award, Star, Trophy, ShieldCheck } from "lucide-react";

const AWARDS = [
  {
    title: "Best Machine Learning Project",
    organization: "Zetech Innovation Fair",
    year: "2023",
    description: "Awarded for AgriAI Kenya, demonstrating early blight detection with offline capabilities.",
    icon: <Trophy className="w-5 h-5" />
  },
  {
    title: "Top 10 Innovator",
    organization: "Kenya National Tech Challenge",
    year: "2024",
    description: "Recognized for building the PesaLens transaction parser addressing local financial literacy.",
    icon: <Star className="w-5 h-5" />
  },
  {
    title: "Certified Cloud Architect",
    organization: "Google Cloud / AWS",
    year: "2023",
    description: "Professional certification validating expertise in designing highly available infrastructure.",
    icon: <ShieldCheck className="w-5 h-5" />
  }
];

export function Awards() {
  return (
    <section id="awards" className="py-24 bg-primary border-t border-light/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <div className="text-brand font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
            <Award className="w-4 h-4" /> Recognition & Certifications
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Validated Excellence.
          </h2>
          <p className="text-xl text-light/70 max-w-2xl">
            Building things that solve real problems gets noticed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {AWARDS.map((award, index) => (
            <div key={index} className="bg-surface/50 border border-light/10 p-8 rounded-xl flex flex-col relative overflow-hidden group hover:border-brand/30 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              
              <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-6 relative z-10">
                {award.icon}
              </div>
              
              <div className="text-xs font-mono text-[#A6CE39] mb-2">{award.year}</div>
              <h3 className="font-display text-xl font-bold mb-1 text-light">
                {award.title}
              </h3>
              <div className="text-sm font-medium text-brand/80 mb-4">{award.organization}</div>
              
              <p className="text-sm text-light/60 flex-grow">
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
