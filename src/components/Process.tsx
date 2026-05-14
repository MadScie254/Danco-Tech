import React from "react";
import { Search, BrainCircuit, Rocket, HardDrive } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Data Gathering & EDA",
    description: "We dive deep into your raw data. Finding patterns, addressing imbalances, and cleaning noise. If the data is bad, the model is bad. We fix the data first.",
    icon: <Search className="w-8 h-8" />
  },
  {
    number: "02",
    title: "Model Training",
    description: "Selecting the right architecture—from XGBoost for tabular data to CNNs for agriculture. We prioritize robust, performant models that run efficiently on constrained infrastructure.",
    icon: <BrainCircuit className="w-8 h-8" />
  },
  {
    number: "03",
    title: "Deployment & Integration",
    description: "A notebook is not a product. We wrap models in fast APIs (FastAPI/Django) and integrate them into production-ready web apps or M-Pesa capable USSD systems.",
    icon: <Rocket className="w-8 h-8" />
  },
  {
    number: "04",
    title: "Infrastructure Auditing",
    description: "Ensuring your environment is secure, scalable, and resilient against power outages. We set up CI/CD, backup strategies, and continuous monitoring.",
    icon: <HardDrive className="w-8 h-8" />
  }
];

export function Process() {
  return (
    <section className="py-24 bg-surface border-t border-light/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <div className="text-brand font-mono text-sm tracking-widest uppercase mb-4">
            Methodology
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold max-w-2xl">
            Strategic Systems Engineering
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line */}
              {index < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(100%-2rem)] w-[calc(100%+4rem)] h-[1px] bg-light/10 z-0 overflow-hidden">
                  <div className="w-full h-full bg-brand/50 -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out" />
                </div>
              )}
              
              <div className="relative z-10 bg-primary border border-light/10 p-8 rounded-xl h-full flex flex-col hover:-translate-y-2 transition-transform duration-300">
                <div className="text-brand/20 font-display text-6xl font-black absolute top-4 right-4 pointer-events-none transition-colors group-hover:text-brand/10">
                  {step.number}
                </div>
                
                <div className="w-16 h-16 rounded-full bg-surface border border-light/5 flex items-center justify-center text-brand mb-8 relative">
                  {step.icon}
                </div>
                
                <h3 className="font-display text-xl font-bold mb-4 text-light">
                  {step.title}
                </h3>
                <p className="text-light/70 text-sm leading-relaxed flex-grow">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
