/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { SmoothScroll } from "./components/SmoothScroll";
import { CommandMenu } from "./components/CommandMenu";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { LogosBanner } from "./components/LogosBanner";
import { Story } from "./components/Story";
import { About } from "./components/About";
import { Process } from "./components/Process";
import { Services } from "./components/Services";
import { AnalyticsShowcase } from "./components/AnalyticsShowcase";
import { Products } from "./components/Products";
import { GithubProjects } from "./components/GithubProjects";
import { Research } from "./components/Research";
import { Speaking } from "./components/Speaking";
import { Awards } from "./components/Awards";
import { Articles } from "./components/Articles";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { MagneticCursor } from "./components/MagneticCursor";
import { LoadingScreen } from "./components/LoadingScreen";

export default function App() {
  return (
    <div className="relative">
      <SmoothScroll />
      <CommandMenu />
      <LoadingScreen />
      <div className="fixed top-[-10%] right-[-5%] text-surface/50 text-[min(60vw,600px)] font-black leading-none pointer-events-none select-none italic z-0">
        DW
      </div>
      <div className="noise-overlay" />
      <MagneticCursor />
      <Nav />

      <main>
        <Hero />
        <LogosBanner />
        <Story />
        <About />
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
      </main>

      <Footer />
    </div>
  );
}

