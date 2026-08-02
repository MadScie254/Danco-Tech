import React, { useEffect, useRef } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { ClipboardCheck, Rocket, Shield, Repeat } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "audit",
    icon: <ClipboardCheck className="w-8 h-8" />,
    color: "#C5A059",
    bgClass: "hover:bg-[#C5A059]/5 shadow-[#C5A059]/10",
    title: "Audit",
    scope: "1-2 weeks",
    description:
      "A fixed-scope diagnostic of your data, product, and infrastructure with prioritized recommendations you can execute immediately.",
    deliverables: [
      "Current-state architecture review",
      "Data quality and pipeline health findings",
      "Risk and opportunity scorecard",
      "Prioritized implementation roadmap",
      "Executive readout and Q&A",
    ],
    chips: [
      "Discovery",
      "Systems Audit",
      "Data QA",
      "Roadmapping",
    ],
  },
  {
    id: "mvp-sprint",
    icon: <Rocket className="w-8 h-8" />,
    color: "#E8CA8B",
    bgClass: "hover:bg-[#E8CA8B]/5 shadow-[#E8CA8B]/10",
    title: "MVP Sprint",
    scope: "4-8 weeks",
    description:
      "A time-bound build to a working prototype that proves value with real users, core workflows, and measurable success criteria.",
    deliverables: [
      "Clickable UX + production-ready frontend",
      "Core backend/API implementation",
      "One automation or model integration",
      "Pilot environment and demo handoff",
      "MVP backlog for phase two",
    ],
    chips: [
      "React",
      "FastAPI",
      "Supabase",
      "M-Pesa API",
      "Recharts",
    ],
  },
  {
    id: "production-build",
    icon: <Shield className="w-8 h-8" />,
    color: "#D4AF6E",
    bgClass: "hover:bg-[#D4AF6E]/5 shadow-[#D4AF6E]/10",
    title: "Production Build",
    scope: "8-16 weeks",
    description:
      "Full delivery from architecture to launch for mission-critical systems that need reliability, observability, and operational readiness.",
    deliverables: [
      "Solution architecture and security baseline",
      "End-to-end implementation",
      "Monitoring, alerting, and backup strategy",
      "Performance and resilience hardening",
      "Launch runbook and team enablement",
    ],
    chips: [
      "Docker",
      "PostgreSQL",
      "CI/CD",
      "Cloud Ops",
      "SRE",
    ],
  },
  {
    id: "retainer",
    icon: <Repeat className="w-8 h-8" />,
    color: "#C5A059",
    bgClass: "hover:bg-[#C5A059]/5 shadow-[#C5A059]/10",
    title: "Retainer",
    scope: "Ongoing",
    description:
      "Ongoing strategic and engineering support for teams that need a dependable partner to iterate, maintain, and scale what has already shipped.",
    deliverables: [
      "Monthly planning and prioritization",
      "Continuous feature delivery",
      "Model and data pipeline tuning",
      "SLA-backed support and issue response",
      "Quarterly roadmap refresh",
    ],
    chips: [
      "Advisory",
      "Support",
      "Optimization",
      "PostgreSQL",
      "Analytics",
    ],
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

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

        <Tabs.Root defaultValue={SERVICES[0].id}>
          <Tabs.List className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8" aria-label="Service offers">
            {SERVICES.map((s) => (
              <Tabs.Trigger
                key={s.id}
                value={s.id}
                className="rounded-lg border border-light/10 bg-surface/30 px-4 py-3 text-left text-sm font-mono text-light/70 transition-colors data-[state=active]:border-brand/40 data-[state=active]:text-brand"
              >
                {s.title}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {SERVICES.map((s) => (
            <Tabs.Content key={s.id} value={s.id}>
              <div
                className={`service-card relative bg-surface/30 border border-light/5 p-8 rounded-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden group ${s.bgClass}`}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${s.color} 0%, transparent 70%)`,
                  }}
                ></div>

                <div className="grid lg:grid-cols-12 gap-8 relative z-10">
                  <div className="lg:col-span-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-8"
                      style={{ backgroundColor: `${s.color}15`, color: s.color }}
                    >
                      {s.icon}
                    </div>

                    <h3 className="font-display text-2xl font-bold mb-4">
                      {s.title}
                    </h3>
                    <div className="text-xs font-mono uppercase tracking-wider text-light/40 mb-3">
                      Typical Scope
                    </div>
                    <div className="inline-flex rounded-full border border-light/10 bg-primary/50 px-3 py-1 text-xs font-mono text-brand mb-6">
                      {s.scope}
                    </div>
                    <p className="text-light/70 text-sm leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <div className="lg:col-span-8">
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
                </div>
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}
