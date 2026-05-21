/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from "react";
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
          <Speaking />
          <Awards />
          <Research />
          <Articles />
          <Testimonials />
          <Contact />
          <Footer />
        </Suspense>
      </main>

      <CookieConsent />
    </div>
  );
}

