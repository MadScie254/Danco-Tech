import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { ArrowRight, ArrowUpRight, Activity, BarChart2, GraduationCap, Building2, Globe2, MapPin, Download } from "lucide-react";
import { ParticlesBackground } from "./ParticlesBackground";

const RESUME_PDF = "/assets/resume/Danco-Analytics-Resume.pdf";

export function Hero() {
  const typeTarget = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!typeTarget.current) return;
    const typed = new Typed(typeTarget.current, {
      strings: ["Intelligence.", "Systems.", "Products.", "Solutions."],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      loop: true,
      cursorChar: "▋",
    });
    return () => typed.destroy();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 overflow-hidden"
    >
      {/* Particle Background Container */}
      <ParticlesBackground />

      {/* Topographic Background Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='topo' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 50 Q 25 30 50 50 T 100 50' fill='none' stroke='%23C8A96E' stroke-width='1'/%3E%3Cpath d='M0 70 Q 25 50 50 70 T 100 70' fill='none' stroke='%231D9E75' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23topo)'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col items-start pt-10 lg:pt-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand/30 bg-brand/5 mb-8">
            <span className="text-brand font-mono text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              <MapPin className="w-3 h-3 text-brand" /> Nairobi, Kenya · Founded 2023 · Pan-African AI
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
            We Build <br />
            <span className="text-brand italic font-serif" ref={typeTarget}></span>
            <br />
            for Africa's Future.
          </h1>

          <p className="text-lg text-light/70 max-w-[520px] leading-relaxed mb-10">
            Danco Analytics helps African teams ship production ML and data
            products in weeks. We turn messy operational data into models,
            dashboards, and automated systems with measurable impact.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={() =>
                document
                  .getElementById("case-studies")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-brand hover:bg-brand/90 text-primary px-6 py-3 rounded font-medium flex items-center gap-2 transition-colors interactive"
            >
              See Case Studies <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border border-light/20 hover:bg-light/5 text-light px-6 py-3 rounded font-medium flex items-center gap-2 transition-colors interactive"
            >
              Start a Project <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href={RESUME_PDF}
              download
              className="border border-light/20 hover:bg-light/5 text-light px-6 py-3 rounded font-medium flex items-center gap-2 transition-colors interactive"
            >
              Download Resume <Download className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-mono text-light/60">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-brand" /> 8+ Projects Shipped
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-brand" /> MSc Research — ML & AI
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand" /> Hospital-Grade IT Systems
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-brand" /> ORCID Verified Researcher
            </div>
          </div>
        </div>

        {/* Right Column - Dashboard Widget */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="bg-surface/50 border border-brand/40 rounded-xl p-6 relative overflow-hidden backdrop-blur-md shadow-2xl shadow-brand/10 group">
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20 z-10"></div>

            <div className="flex justify-between items-center mb-6 pb-4 border-b border-light/10">
              <div className="flex items-center gap-2 text-xs font-mono text-light/50">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                LIVE
                <span className="px-2">·</span>
                Danco Analytics System Monitor
              </div>
              <Activity className="w-4 h-4 text-brand" />
            </div>

            <div className="space-y-6">
              {/* Fake Bar Chart */}
              <div>
                <div className="text-xs text-light/60 mb-3 font-mono">
                  Product Request load
                </div>
                <div className="flex items-end gap-2 h-24">
                  {[40, 70, 45, 90, 60, 85, 30].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-brand/20 group-hover:bg-brand/30 transition-colors rounded-t relative overflow-hidden"
                    >
                      <div
                        className="absolute bottom-0 left-0 w-full bg-brand transition-all duration-1000 ease-out"
                        style={{ height: `${h}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/50 border border-light/5 rounded p-4">
                  <div className="text-xs text-light/50 font-mono mb-1">
                    Model Accuracy
                  </div>
                  <div className="text-2xl font-display text-brand">94.2%</div>
                </div>
                <div className="bg-primary/50 border border-light/5 rounded p-4">
                  <div className="text-xs text-light/50 font-mono mb-1">
                    Active Products
                  </div>
                  <div className="text-2xl font-display text-gold">6</div>
                </div>
              </div>

              <div className="text-xs font-mono text-brand flex items-center gap-2 mt-4 pt-4 border-t border-light/10">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                Models running · Nairobi time 18:34
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data ticker */}
      <div className="absolute bottom-0 left-0 w-full bg-brand/5 border-t border-brand/20 py-2 overflow-hidden flex whitespace-nowrap">
        <div className="animate-[ticker_30s_linear_infinite] inline-flex font-mono text-xs text-brand/80">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="mx-4">
              Python · XGBoost · React · Django · TensorFlow · PostgreSQL ·
              M-Pesa API · Supabase · ROS2 · Computer Vision · SMOTE ·
              RandomForest · FastAPI · Docker ·
            </span>
          ))}
        </div>
      </div>

      {/* CMD+K Hint */}
      <div className="absolute top-24 right-6 md:right-12 hidden lg:flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-light/50 border border-light/10 bg-surface/50 backdrop-blur-md px-3 py-1.5 rounded-full z-20">
        <kbd className="px-1.5 py-0.5 bg-primary border border-light/20 rounded font-sans text-[10px]">⌘K</kbd>
        <span>Command Menu</span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs font-mono uppercase tracking-widest text-light/70">
          Scroll to explore
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-brand to-transparent animate-bounce"></div>
      </div>
    </section>
  );
}
