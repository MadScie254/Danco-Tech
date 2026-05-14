import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    name: "NyumbaIQ",
    tagline: "AI-powered real estate management for Kenyan landlords & agents",
    description:
      "A full-stack SaaS platform with multi-role portals for Admins, Landlords, Agents, and Tenants. Features M-Pesa rent collection via Safaricom Daraja API, AI-powered property insights through the Anthropic API, automated lease management, and Kenya-specific compliance features.",
    status: "Live",
    statusColor: "text-green-400 bg-green-400/10 border-green-400/20",
    stack: ["React", "Supabase", "M-Pesa API", "Anthropic API"],
    link: "https://github.com/MadScie254",
    bgLight: "#C5A059",
    details: {
      problem: "Landlords in Kenya face massive friction in rent collection, manual reconciliation via USSD menus, and poor visibility into tenant arrears.",
      solution: "An end-to-end management portal mapping physical properties to digital twins. It provides automated M-Pesa tracking (C2B Daraja integration), instantly marking payments as recognized without human intervention.",
      impact: "Reduced rent reconciliation time from 3 days to real-time. Allowed agents to handle 40% more units without increasing headcount."
    }
  },
  {
    name: "AgriAI Kenya",
    tagline: "Plant disease detection AI for Kenyan smallholder farmers",
    description:
      "A computer vision system that identifies crop diseases from smartphone photographs using deep learning. Built collaboratively as a capstone project at Moringa School, it uses CNNs trained on African agricultural disease datasets to give farmers actionable diagnostics in seconds — no agronomist required.",
    status: "Beta",
    statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    stack: ["Python", "TensorFlow", "OpenCV", "FastAPI"],
    link: "https://github.com/MadScie254/Capstone-Lazarus",
    bgLight: "#D4AF6E",
    details: {
      problem: "Smallholder farmers often lose 30-40% of yields to diseases because agricultural extension officers are too few (1 for every 1000 farmers).",
      solution: "A lightweight Convolutional Neural Network (CNN) exposed via a FastAPI endpoint. Evaluates pixel data to pinpoint early blight vs late blight with 94%+ accuracy.",
      impact: "Democratizes agronomic knowledge directly to a basic smartphone camera. Validated on open cassava and maize disease datasets with minimal inference latency."
    }
  },
  {
    name: "InvestWise Predictor",
    tagline: "ML-powered investment intelligence for the Kenyan market",
    description:
      "A cutting-edge investment advisory tool that analyzes CBK exchange rates, inflation data, NSE equity performance, and macroeconomic indicators to generate predictive investment signals for Kenyan investors. Trained on 10+ years of Kenyan financial data.",
    status: "Beta",
    statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    stack: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
    link: "https://github.com/MadScie254/Invest-wise",
    bgLight: "#E8CA8B",
    details: {
      problem: "Retail investors in Kenya rely heavily on hearsay because professional macroeconomic forecasting is siloed behind pricey institutional paywalls.",
      solution: "Aggregated unstructured and structured data (CBK reports, World Bank indicators). Trained Random Forest and HistGradientBoosting ensembles to predict GDP growth and equity sector performance.",
      impact: "Created an accessible, interactive Streamlit dashboard allowing retail investors to visualize how inflation and interest rates affect NSE historical performance."
    }
  },
  {
    name: "PesaLens",
    tagline: "Personal finance intelligence for the M-Pesa generation",
    description:
      "M-Pesa statement analysis, automatic expense categorization, spending pattern visualization, and AI-powered savings coaching — built specifically for how Kenyans actually manage money. Because Mint was never built for you.",
    status: "Beta",
    statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    stack: ["React", "Django", "PostgreSQL", "Anthropic API"],
    link: "https://github.com/MadScie254",
    bgLight: "#C5A059",
    details: {
      problem: "M-Pesa statements are long, dense PDF files. Kenyans had no way to visualize their money flow naturally without manual Excel entries.",
      solution: "A PDF parsing engine connected to a Django backend. It extracts text, uses NLP/LLM embeddings (Anthropic API) to classify transactions (e.g. 'Paybill 522522' -> 'Bank Transfer').",
      impact: "Provides instant monthly insights on 'Food', 'Transport', 'Black tax', giving users unparalleled visibility into hidden spending patterns."
    }
  },
  {
    name: "MediShift",
    tagline: "Healthcare workforce management for Kenyan hospitals",
    description:
      "Shift scheduling, workforce analytics, and staff management platform designed for the realities of Kenyan county hospitals and private facilities — including multi-department rostering, compliance reporting, and mobile-first staff self-service.",
    status: "In Dev",
    statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    stack: ["React", "Django", "PostgreSQL", "GCP"],
    link: "https://github.com/MadScie254",
    bgLight: "#D4AF6E",
    details: {
      problem: "Hospital shift rosters were managed using physical whiteboards and WhatsApp groups, causing overlapping shifts, extreme burnout, and payroll disputes.",
      solution: "A centralized real-time dashboard where nursing officers and hospital administrators manage rosters dynamically. Built to handle swap requests programmatically.",
      impact: "Eliminated double-booking. Reduced administrative scheduling time by 60%, ensuring critical compliance of nurse-to-patient ratios during night shifts."
    }
  },
  {
    name: "InvoiceKE",
    tagline: "KRA-compliant invoicing for Kenyan SMEs",
    description:
      "Automated ETR receipts, VAT computation, M-Pesa payment tracking, and KRA iTax integration — everything a Kenyan SME needs to invoice, get paid, and stay tax-compliant without an accountant on speed dial.",
    status: "In Dev",
    statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    stack: ["React", "Supabase", "M-Pesa API", "PostgreSQL"],
    link: "https://github.com/MadScie254",
    bgLight: "#E8CA8B",
    details: {
      problem: "Small businesses constantly face penalties from KRA compliance issues and rely on manual ETR machines.",
      solution: "An automated billing platform. Features real-time link generation for invoices, embedded M-Pesa express (STK push) for payment collection, and tax liability dashboards.",
      impact: "Drastically lowers the barrier for formal business compliance while speeding up accounts receivable via frictionless payment links."
    }
  },
];

export function Products() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof PRODUCTS[0] | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-card",
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
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

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  return (
    <>
      <section id="projects" className="py-24 bg-surface/20 relative" ref={containerRef}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <div className="text-brand font-mono text-sm tracking-widest uppercase mb-4">
              Projects Showcase
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Built for Africa. Ready to Scale.
            </h2>
            <p className="text-xl text-light/70 max-w-2xl">
              A selection of production-grade projects solving real-world challenges. Click any project to view its deep-dive case study.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {PRODUCTS.map((p, i) => (
              <div
                key={i}
                onClick={() => setSelectedProject(p)}
                className="product-card cursor-pointer group relative bg-primary border border-light/10 rounded-xl overflow-hidden flex flex-col h-full transform-gpu transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-2xl hover:shadow-brand/5"
              >
                {/* Image Placeholder area */}
                <div className="h-48 relative overflow-hidden bg-surface/50 border-b border-light/5 flex items-center justify-center p-6">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none mix-blend-screen"
                    style={{
                      background: `linear-gradient(to top, ${p.bgLight}, transparent)`,
                    }}
                  />
                  <div className="text-center transform transition-transform duration-500 group-hover:scale-105">
                    <div
                      className="font-display text-3xl font-bold opacity-20 tracking-tight"
                      style={{ color: p.bgLight }}
                    >
                      {p.name}
                    </div>
                    <div className="text-xs uppercase tracking-widest opacity-20 mt-2">
                      View full case study
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow relative z-10 bg-primary">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-display text-2xl font-bold group-hover:text-brand transition-colors">
                      {p.name}
                    </h3>
                    <span
                      className={`text-[10px] font-mono px-2 py-1 rounded border uppercase tracking-wider ${p.statusColor}`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-light/90 mb-3">
                    {p.tagline}
                  </p>
                  <p className="text-sm text-light/60 mb-6 leading-relaxed flex-grow line-clamp-3">
                    {p.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-center gap-2 text-sm font-medium text-brand">
                      Analyze Case Study <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal / Slide-over */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ perspective: "1000px" }}>
          <div 
            className="absolute inset-0 bg-primary/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          />
          <div className="relative w-full max-w-4xl bg-surface border border-light/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-6 md:p-8 border-b border-light/10 flex justify-between items-start bg-primary/50">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-light">
                    {selectedProject.name}
                  </h3>
                  <span className={`text-[10px] font-mono px-2 py-1 rounded border uppercase tracking-wider ${selectedProject.statusColor}`}>
                    {selectedProject.status}
                  </span>
                </div>
                <p className="text-brand font-medium text-lg max-w-2xl">
                  {selectedProject.tagline}
                </p>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-light/10 rounded-full transition-colors text-light/50 hover:text-light"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto">
              <div className="grid md:grid-cols-3 gap-8">
                
                <div className="md:col-span-2 space-y-8">
                  <section>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-light/40 mb-3 border-b border-light/10 pb-2">01. The Problem</h4>
                    <p className="text-light/80 leading-relaxed text-lg">
                      {selectedProject.details.problem}
                    </p>
                  </section>
                  
                  <section>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-brand mb-3 border-b border-light/10 pb-2">02. Engineering Solution</h4>
                    <p className="text-light/80 leading-relaxed text-lg">
                      {selectedProject.details.solution}
                    </p>
                  </section>
                  
                  <section>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#A6CE39] mb-3 border-b border-light/10 pb-2">03. Business Impact</h4>
                    <p className="text-light/80 leading-relaxed text-lg">
                      {selectedProject.details.impact}
                    </p>
                  </section>
                </div>

                <div className="space-y-6 bg-primary/30 p-6 rounded-xl border border-light/5 h-fit">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-light/40 mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map(s => (
                        <span key={s} className="px-2 py-1 bg-light/5 border border-light/10 rounded text-xs font-mono text-light/80">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-light/40 mb-3">Repository</h4>
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-light text-primary px-4 py-2 rounded text-sm font-semibold hover:bg-light/90 transition-colors w-full justify-center"
                    >
                      View Source Code <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

