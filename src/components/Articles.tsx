import React, { useEffect, useRef } from "react";
import { ArrowUpRight, BookText } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ARTICLES = [
  {
    title: "MCP Servers: What, Why, and How to Blow Up Your Stack",
    platform: "LinkedIn",
    topic: "MCP servers explained and why they matter for modern tooling.",
    url: "https://www.linkedin.com/pulse/mcp-servers-what-why-you-should-care-how-blow-up-your-daniel-wanjala-leisf/",
    published: "LinkedIn",
    tags: ["#mcp", "#ai", "#infrastructure"],
    isDevto: false,
  },
  {
    title: "Kenya's Future Might Be Written in Code Right Now",
    platform: "LinkedIn",
    topic: "Why software will shape Kenya's trajectory — for better or worse.",
    url: "https://www.linkedin.com/pulse/kenyas-future-might-written-code-right-now-were-our-downfall-wanjala-gzaef/",
    published: "LinkedIn",
    tags: ["#kenya", "#policy", "#technology"],
    isDevto: false,
  },
  {
    title: "Logarithms & Algorithms: Invisible Engines of AI",
    platform: "LinkedIn",
    topic: "Breaking down the math foundations powering modern AI.",
    url: "https://www.linkedin.com/pulse/logarithms-algorithms-invisible-engines-ai-data-science-wanjala-u9qgf/",
    published: "LinkedIn",
    tags: ["#ai", "#math", "#datascience"],
    isDevto: false,
  },
  {
    title: "From Excel to Neural Networks: My Data Science Journey",
    platform: "LinkedIn",
    topic: "A personal path from spreadsheets to machine learning.",
    url: "https://www.linkedin.com/pulse/from-excel-neural-networks-my-journey-data-science-daniel-wanjala-s6vjf/",
    published: "LinkedIn",
    tags: ["#career", "#datascience", "#learning"],
    isDevto: false,
  },
  {
    title: "Why AI Bots Leave Customers Frustrated",
    platform: "LinkedIn",
    topic: "Improving support chatbots without sacrificing empathy.",
    url: "https://www.linkedin.com/pulse/why-ai-bots-leave-customers-frustrated-improving-zuriand-wanjala-9kbhf/",
    published: "LinkedIn",
    tags: ["#ux", "#ai", "#customerexperience"],
    isDevto: false,
  },
  {
    title: "Frappe Framework Concepts for Beginners & Intermediate",
    platform: "LinkedIn",
    topic: "A practical guide to understanding the Frappe framework.",
    url: "https://www.linkedin.com/pulse/frappe-framework-concepts-beginners-intermediate-daniel-wanjala-wki5f/",
    published: "LinkedIn",
    tags: ["#frappe", "#erp", "#webdev"],
    isDevto: false,
  },
  {
    title: "Kenya Finance Bill 2024 + Machine Learning",
    platform: "LinkedIn",
    topic: "Exploring how ML could inform fiscal and policy decisions.",
    url: "https://www.linkedin.com/pulse/lets-talk-kenya-finance-bill-2024-how-machine-learning-daniel-wanjala-fapjf/",
    published: "LinkedIn",
    tags: ["#policy", "#ml", "#kenya"],
    isDevto: false,
  },
  {
    title: "How ML Transportation Can Transform Africa",
    platform: "LinkedIn",
    topic: "AI-driven mobility and logistics across the continent.",
    url: "https://www.linkedin.com/pulse/how-machine-learning-transportation-can-transform-africas-wanjala-163gf/",
    published: "LinkedIn",
    tags: ["#transport", "#ml", "#africa"],
    isDevto: false,
  },
  {
    title: "Machine Learning, Blockchain & Crypto Analysis",
    platform: "LinkedIn",
    topic: "Applying ML to crypto markets and financial signals.",
    url: "https://www.linkedin.com/pulse/machine-learning-blockchain-crypto-financial-analysis-daniel-wanjala-bf0mf/",
    published: "LinkedIn",
    tags: ["#blockchain", "#ml", "#finance"],
    isDevto: false,
  },
  {
    title: "Oracle Machine Learning Algorithms",
    platform: "LinkedIn",
    topic: "A quick tour of Oracle's built-in ML capabilities.",
    url: "https://www.linkedin.com/pulse/oracle-machine-learning-algorithms-daniel-wanjala-fqo5f/",
    published: "LinkedIn",
    tags: ["#oracle", "#ml", "#databases"],
    isDevto: false,
  },
  {
    title: "Diversity & Inclusion in Data Science",
    platform: "LinkedIn",
    topic: "Why diverse teams build better models and products.",
    url: "https://www.linkedin.com/pulse/importance-diversity-inclusion-data-science-ml-daniel-wanjala-lw3if/",
    published: "LinkedIn",
    tags: ["#dei", "#datascience", "#teams"],
    isDevto: false,
  },
  {
    title: "Doctors Don't Care About Your F1 Score",
    platform: "LinkedIn",
    topic: "Why clinical outcomes matter more than model metrics.",
    url: "https://www.linkedin.com/pulse/doctors-dont-care-your-f1-score-neither-do-patients-should-wanjala-m14kf/",
    published: "LinkedIn",
    tags: ["#healthcare", "#ml", "#evaluation"],
    isDevto: false,
  },
  {
    title: "What Is Frappe Framework in 7 Minutes",
    platform: "LinkedIn",
    topic: "A quick intro to Frappe for busy builders.",
    url: "https://www.linkedin.com/pulse/what-frappe-framework-7-minutes-daniel-wanjala-w6elf/",
    published: "LinkedIn",
    tags: ["#frappe", "#erp", "#productivity"],
    isDevto: false,
  },
  {
    title: "Data Science Dilemma: Joblessness in a Growing Field",
    platform: "LinkedIn",
    topic: "Reconciling talent growth with real job market needs.",
    url: "https://www.linkedin.com/pulse/data-science-dilemma-joblessness-growing-field-daniel-wanjala-qddwf/",
    published: "LinkedIn",
    tags: ["#careers", "#datascience", "#industry"],
    isDevto: false,
  },
  {
    title: "Transforming Traditional Banking With AI & Blockchain",
    platform: "LinkedIn",
    topic: "How banks can modernize with new AI-driven rails.",
    url: "https://www.linkedin.com/pulse/transforming-traditional-banking-ai-driven-blockchain-daniel-wanjala-mhgdf/",
    published: "LinkedIn",
    tags: ["#banking", "#ai", "#blockchain"],
    isDevto: false,
  },
  {
    title: "Ensemble Learning Power: Combining Algorithms",
    platform: "LinkedIn",
    topic: "Why ensembles are often the most reliable models.",
    url: "https://www.linkedin.com/pulse/ensemble-learning-power-combining-machine-algorithms-daniel-wanjala-13b0c/",
    published: "LinkedIn",
    tags: ["#ml", "#ensembles", "#modeling"],
    isDevto: false,
  },
  {
    title: "From Text to Reality: Generative + Predictive",
    platform: "LinkedIn",
    topic: "Blending generative and predictive systems for real impact.",
    url: "https://www.linkedin.com/pulse/from-text-reality-how-generative-predictive-shaping-our-wanjala-prbkf/",
    published: "LinkedIn",
    tags: ["#genai", "#predictive", "#innovation"],
    isDevto: false,
  },
  {
    title: "Personalized Health Avatar (PHA)",
    platform: "LinkedIn",
    topic: "Using AI to empower preventive wellness and care.",
    url: "https://www.linkedin.com/pulse/personalized-health-avatar-pha-empowering-wellness-dawn-wanjala-e9dbf/",
    published: "LinkedIn",
    tags: ["#healthtech", "#ai", "#wellness"],
    isDevto: false,
  },
  {
    title: "Navigating the Automation Paradox",
    platform: "LinkedIn",
    topic: "Balancing efficiency with customer trust in automation.",
    url: "https://www.linkedin.com/pulse/navigating-automation-paradox-balancing-efficiency-customer-wanjala/",
    published: "LinkedIn",
    tags: ["#automation", "#operations", "#trust"],
    isDevto: false,
  },
];

export function Articles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".article-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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

  return (
    <section id="articles" className="py-24" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
          <div>
            <div className="text-brand font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
              <BookText className="w-4 h-4" /> Thought Leadership
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Writing at the Intersection of Data and Africa.
            </h2>
          </div>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/daniel-wanjala-msc-912b8b17b/recent-activity/articles/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono text-light/50 hover:text-light transition-colors"
            >
              LinkedIn Articles
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {ARTICLES.map((article, i) => (
            <div
              key={i}
              className="article-card flex flex-col bg-surface/30 border border-light/10 p-8 rounded-xl hover:bg-surface/50 hover:border-brand/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`px-2 py-1 text-[10px] font-bold tracking-wider rounded uppercase ${article.isDevto ? "bg-black text-white" : "bg-mint text-primary"}`}
                >
                  {article.platform}
                </div>
                <div className="text-xs font-mono text-light/40">
                  {article.published}
                </div>
              </div>

              <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-brand transition-colors">
                {article.title}
              </h3>

              <p className="text-light/60 text-sm mb-6 flex-grow">
                {article.topic}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                <div className="flex gap-2">
                  {article.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono text-light/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-light transition-colors interactive"
                >
                  Read Article <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-light/50 font-mono text-sm">
            More articles coming soon — follow on{" "}
            <a
              href="https://www.linkedin.com/in/daniel-wanjala-msc-912b8b17b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
