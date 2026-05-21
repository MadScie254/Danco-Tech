import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { BarChart3, Menu, X, ArrowRight, Sun, Moon } from "lucide-react";

const LINKS = [
  "Home",
  "About",
  "Case Studies",
  "Services",
  "Projects",
  "Research",
  "Analytics",
  "GitHub",
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // check visible section
      let current = "Home";
      for (const link of LINKS) {
        const section = link.toLowerCase();
        const el = document.getElementById(
          section === "home"
            ? "hero"
            : section === "about"
              ? "about-founder"
              : section === "case studies"
                ? "case-studies"
                : section,
        );
        if (el && window.scrollY >= el.offsetTop - 200) {
          current = link;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const normalized = id.toLowerCase();
    const el = document.getElementById(
      normalized === "home"
        ? "hero"
        : normalized === "about"
          ? "about-founder"
          : normalized === "case studies"
            ? "case-studies"
            : normalized,
    );
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          scrolled
            ? "bg-primary/95 backdrop-blur-[20px] border-b border-brand/30 py-4"
            : "bg-transparent py-6",
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded bg-brand/10 border border-brand/50 flex items-center justify-center text-brand group-hover:bg-brand/20 transition-colors">
              <BarChart3 className="w-5 h-5" />
            </div>
            <span className="font-display font-semibold text-xl tracking-tight text-light flex items-baseline gap-1">
              Danco{" "}
              <span className="font-sans font-normal text-sm text-light/70">
                Analytics
              </span>
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={cn(
                  "text-sm font-medium transition-colors relative pb-1",
                  activeSection === link
                    ? "text-brand"
                    : "text-light/70 hover:text-light",
                )}
                aria-current={activeSection === link ? "page" : undefined}
              >
                {link}
                {activeSection === link && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-light/70 hover:text-light transition-colors"
              aria-label="Toggle theme"
              aria-pressed={theme === "light"}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="bg-sunset hover:bg-sunset/90 text-primary px-5 py-2.5 rounded text-sm font-medium transition-colors flex items-center gap-2"
            >
              Hire Us <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button
            className="lg:hidden text-light p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-primary z-[60] flex flex-col justify-center items-center transition-all duration-500",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <button
          className="absolute top-6 right-6 lg:right-12 text-light p-2"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation menu"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="flex flex-col items-center gap-6 text-2xl font-display">
          <button
            onClick={() => {
              setTheme(theme === 'dark' ? 'light' : 'dark');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 text-light/80 hover:text-brand transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            Switch Theme
          </button>
          {LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-light/80 hover:text-brand transition-colors"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="mt-4 bg-sunset text-light px-8 py-4 rounded font-sans text-lg flex items-center gap-2"
          >
            Hire Us <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}
