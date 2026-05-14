import React, { useEffect, useRef } from "react";
import { Brain, Rocket, Shield } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: <Brain className="w-8 h-8" />,
    color: "#C5A059",
    bgClass: "hover:bg-[#C5A059]/5 shadow-[#C5A059]/10",
    title: "AI & Machine Learning Solutions",
    description:
      "From predictive models to computer vision pipelines — we build ML systems that are trained on African data, tested in African contexts, and deployed for African outcomes. Whether it's crop disease classification, fraud detection, or economic forecasting, we bring research-grade rigor to production-grade systems.",
    deliverables: [
      "Custom ML Models",
      "Predictive Analytics",
      "Computer Vision",
      "NLP & Text Analysis",
      "Anomaly Detection",
      "Time Series Forecasting",
    ],
    chips: [
      "Python",
      "TensorFlow",
      "XGBoost",
      "Scikit-learn",
      "PyTorch",
      "OpenCV",
      "SMOTE",
      "FastAPI",
    ],
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    color: "#E8CA8B",
    bgClass: "hover:bg-[#E8CA8B]/5 shadow-[#E8CA8B]/10",
    title: "SaaS Product Development",
    description:
      "We don't just consult — we build. From zero to production SaaS, we design, develop, and launch full-stack web platforms with multi-role portals, M-Pesa payment integration, real-time dashboards, and AI-powered features baked in from day one. Products that work on 3G. Products built for Kenya.",
    deliverables: [
      "Full-Stack Web Apps",
      "M-Pesa API Integration",
      "Multi-tenant Platforms",
      "Admin/User Dashboards",
      "Real-time Analytics",
      "Mobile-first PWAs",
    ],
    chips: [
      "React",
      "Django",
      "Supabase",
      "PostgreSQL",
      "Safaricom Daraja API",
      "Anthropic API",
      "Tailwind",
    ],
  },
  {
    icon: <Shield className="w-8 h-8" />,
    color: "#D4AF6E",
    bgClass: "hover:bg-[#D4AF6E]/5 shadow-[#D4AF6E]/10",
    title: "IT Infrastructure & Consulting",
    description:
      "Enterprise-grade IT support, cybersecurity, and systems administration — built on real-world experience managing hospital-level infrastructure where downtime is never an option. We audit, design, implement, and monitor IT environments for organizations that need things to just work.",
    deliverables: [
      "Microsoft 365 Administration",
      "Cybersecurity Audits",
      "Network Architecture",
      "Database Management",
      "IT Asset Management",
      "Systems Integration",
    ],
    chips: [
      "Microsoft 365",
      "Google Cloud",
      "Linux",
      "PostgreSQL",
      "Active Directory",
      "OSINT",
      "Docker",
    ],
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
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
    <section id="services" className="py-24 relative z-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="text-brand font-mono text-sm tracking-widest uppercase mb-4">
            What We Build
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Three Pillars. Infinite Applications.
          </h2>
          <p className="text-xl text-light/70">
            Every engagement is shaped around your specific African market
            context.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className={`service-card relative bg-surface/30 border border-light/5 p-8 rounded-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden group ${s.bgClass}`}
            >
              {/* Subtle background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${s.color} 0%, transparent 70%)`,
                }}
              ></div>

              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-8 relative z-10"
                style={{ backgroundColor: `${s.color}15`, color: s.color }}
              >
                {s.icon}
              </div>

              <h3 className="font-display text-2xl font-bold mb-4">
                {s.title}
              </h3>
              <p className="text-light/70 text-sm leading-relaxed mb-8 min-h-[140px]">
                {s.description}
              </p>

              <div className="mb-8">
                <div className="text-xs font-mono uppercase tracking-wider text-light/40 mb-3">
                  Deliverables
                </div>
                <ul className="space-y-2">
                  {s.deliverables.map((d, di) => (
                    <li
                      key={di}
                      className="text-sm text-light/80 flex items-start gap-2"
                    >
                      <span style={{ color: s.color }}>•</span> {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-light/40 mb-3">
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.chips.map((chip, ci) => (
                    <span
                      key={ci}
                      className="text-[11px] font-mono px-2 py-1 rounded bg-black/40 border border-light/10 text-light/70"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
