import React from "react";
import { BarChart3 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary pt-24 pb-8 border-t border-light/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded bg-brand/10 border border-brand/50 flex items-center justify-center text-brand">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="font-display font-semibold text-xl tracking-tight text-light flex items-baseline gap-1">
                Danco{" "}
                <span className="font-sans font-normal text-sm text-light/70">
                  Analytics
                </span>
              </span>
            </div>
            <p className="text-light/60 max-w-sm mb-6">
              Building Africa's intelligent future, one dataset at a time.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-light/40 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                "Home",
                "About",
                "Case Studies",
                "Services",
                "Projects",
                "Research",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      const el = document.getElementById(
                        link.toLowerCase() === "home"
                          ? "hero"
                          : link.toLowerCase() === "about"
                            ? "about-founder"
                            : link.toLowerCase() === "case studies"
                              ? "case-studies"
                            : link.toLowerCase(),
                      );
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-light/70 hover:text-brand transition-colors text-sm"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-light/40 mb-6">
              Newsletter
            </h4>
            <p className="text-sm text-light/60 mb-4">
              Insights directly to your inbox. No spam.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="flex-grow bg-surface/50 border border-light/10 rounded px-4 py-2 text-sm text-light focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-light/10 hover:bg-brand hover:text-primary transition-colors px-6 py-2 rounded text-sm font-medium interactive"
              >
                Subscribe
              </button>
            </form>
            <div id="privacy" className="mt-6 text-xs text-light/50">
              Privacy: analytics only load after consent and anonymize IPs.
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new Event("cookie-consent:open"))
                }
                className="ml-2 text-brand hover:text-brand/80 transition-colors"
              >
                Manage cookies
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-light/10 text-xs font-mono text-light/40 gap-4 text-center md:text-left">
          <div>© 2026 Danco Analytics. All rights reserved.</div>
          <div className="flex gap-4">
            <span>Founded in Nairobi, Kenya 🇰🇪</span>
            <span className="hidden md:inline">·</span>
            <a
              href="https://github.com/MadScie254"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand transition-colors"
            >
              github.com/MadScie254
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
