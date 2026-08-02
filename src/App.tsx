/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { SmoothScroll } from "./components/SmoothScroll";
import { CommandMenu } from "./components/CommandMenu";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { MagneticCursor } from "./components/MagneticCursor";
import { LoadingScreen } from "./components/LoadingScreen";
import { CookieConsent } from "./components/CookieConsent";

const LogosBanner = React.lazy(() =>
  import("./components/LogosBanner").then((m) => ({
    default: m.LogosBanner,
  })),
);
const Story = React.lazy(() =>
  import("./components/Story").then((m) => ({ default: m.Story })),
);
const About = React.lazy(() =>
  import("./components/About").then((m) => ({ default: m.About })),
);
const CaseStudies = React.lazy(() =>
  import("./components/CaseStudies").then((m) => ({
    default: m.CaseStudies,
  })),
);
const Process = React.lazy(() =>
  import("./components/Process").then((m) => ({ default: m.Process })),
);
const Services = React.lazy(() =>
  import("./components/Services").then((m) => ({ default: m.Services })),
);
const AnalyticsShowcase = React.lazy(() =>
  import("./components/AnalyticsShowcase").then((m) => ({
    default: m.AnalyticsShowcase,
  })),
);
const Products = React.lazy(() =>
  import("./components/Products").then((m) => ({ default: m.Products })),
);
const GithubProjects = React.lazy(() =>
  import("./components/GithubProjects").then((m) => ({
    default: m.GithubProjects,
  })),
);
const Research = React.lazy(() =>
  import("./components/Research").then((m) => ({ default: m.Research })),
);
const Speaking = React.lazy(() =>
  import("./components/Speaking").then((m) => ({ default: m.Speaking })),
);
const Awards = React.lazy(() =>
  import("./components/Awards").then((m) => ({ default: m.Awards })),
);
const Articles = React.lazy(() =>
  import("./components/Articles").then((m) => ({ default: m.Articles })),
);
const Testimonials = React.lazy(() =>
  import("./components/Testimonials").then((m) => ({
    default: m.Testimonials,
  })),
);
const Contact = React.lazy(() =>
  import("./components/Contact").then((m) => ({ default: m.Contact })),
);
const Footer = React.lazy(() =>
  import("./components/Footer").then((m) => ({ default: m.Footer })),
);

export default function App() {
  const [isInsightsPage, setIsInsightsPage] = useState(
    () => window.location.hash === "#insights",
  );

  useEffect(() => {
    const onHashChange = () => {
      setIsInsightsPage(window.location.hash === "#insights");
      if (window.location.hash === "#insights") {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const openInsights = () => {
    window.location.hash = "#insights";
  };

  const openHome = () => {
    if (window.location.hash) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
      setIsInsightsPage(false);
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  return (
    <div className="relative">
      <SmoothScroll />
      <CommandMenu />
      <LoadingScreen />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="fixed top-[-10%] right-[-5%] text-surface/50 text-[min(60vw,600px)] font-black leading-none pointer-events-none select-none italic z-0">
        DW
      </div>
      <div className="noise-overlay" />
      <MagneticCursor />
      <Nav />

      <main id="main-content">
        {isInsightsPage ? (
          <Suspense fallback={<div className="min-h-[20vh]" />}>
            <section className="pt-32 pb-10 border-b border-light/5 bg-surface/20">
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-brand font-mono text-sm tracking-widest uppercase mb-4">
                  Insights Hub
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                  Writing & Speaking
                </h1>
                <p className="text-light/70 max-w-2xl mb-6">
                  Research notes, long-form writing, and talks from Danco Analytics.
                </p>
                <button
                  type="button"
                  onClick={openHome}
                  className="inline-flex items-center gap-2 rounded border border-light/20 bg-primary/50 px-4 py-2 text-sm font-mono text-light/80 hover:border-brand/40 hover:text-brand transition-colors"
                >
                  Back to Homepage
                </button>
              </div>
            </section>
            <Speaking />
            <Research />
            <Articles />
            <Footer />
          </Suspense>
        ) : (
          <>
            <Hero />
            <Suspense fallback={<div className="min-h-[20vh]" />}>
              <LogosBanner />
              <Story />
              <About />
              <CaseStudies />
              <Process />
              <Services />
              <AnalyticsShowcase />
              <Products />
              <GithubProjects />
              <section className="py-10 border-t border-b border-light/5 bg-surface/20">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <div className="text-brand font-mono text-xs tracking-widest uppercase mb-2">
                      Writing & Speaking
                    </div>
                    <p className="text-light/70">
                      Explore research, articles, and talks in one place.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={openInsights}
                    className="inline-flex items-center gap-2 rounded border border-light/20 bg-primary/50 px-5 py-2.5 text-sm font-mono text-light/80 hover:border-brand/40 hover:text-brand transition-colors"
                  >
                    Open Insights Hub
                  </button>
                </div>
              </section>
              <Awards />
              <Testimonials />
              <Contact />
              <Footer />
            </Suspense>
          </>
        )}
      </main>

      <CookieConsent />
      <Toaster richColors position="top-right" />
    </div>
  );
}

