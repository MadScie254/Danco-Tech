import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { BarChart3, Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { Drawer } from "vaul";
import { useTheme } from "next-themes";
import { REDUCED_MOTION_QUERY, prefersReducedMotion } from "../lib/motion";

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

const getSectionId = (link: string) => {
  const normalized = link.toLowerCase();
  if (normalized === "home") return "hero";
  if (normalized === "about") return "about-founder";
  if (normalized === "case studies") return "case-studies";
  return normalized;
};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(() => prefersReducedMotion());
  const { theme, setTheme } = useTheme();
  const currentTheme = theme ?? "dark";

  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    setReduceMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const updateScrollState = () => {
      setScrolled(window.scrollY > 80);

      let current = "Home";
      for (const link of LINKS) {
        const el = document.getElementById(getSectionId(link));
        if (el && window.scrollY >= el.offsetTop - 200) {
          current = link;
        }
      }
      setActiveSection(current);
      animationFrame = 0;
    };

    const handleScroll = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(getSectionId(id));
    if (el) {
      el.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    }
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
              type="button"
              onClick={() => window.dispatchEvent(new Event("command-menu:open"))}
              className="inline-flex items-center gap-2 rounded-full border border-light/10 bg-surface/40 px-3 py-1.5 text-xs font-mono text-light/50 hover:border-brand/40 hover:text-brand transition-colors"
              aria-label="Open command menu"
              title="Open command menu"
            >
              <kbd className="rounded border border-light/20 bg-primary px-1.5 py-0.5 font-sans text-[10px] text-light/70">
                ⌘K
              </kbd>
              <span>Menu</span>
            </button>
            <button
              onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
              className="p-2 text-light/70 hover:text-light transition-colors"
              aria-label="Toggle theme"
              aria-pressed={currentTheme === "light"}
            >
              {currentTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="bg-sunset hover:bg-sunset/90 text-primary px-5 py-2.5 rounded text-sm font-medium transition-colors flex items-center gap-2"
            >
              Hire Us <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <Drawer.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <Drawer.Trigger asChild>
              <button
                className="lg:hidden text-light p-2"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-[60] bg-primary/80" />
              <Drawer.Content
                className={cn(
                  "fixed inset-x-0 bottom-0 z-[60] bg-primary border-t border-light/10 rounded-t-2xl px-6 pt-4 pb-8",
                  reduceMotion ? "transition-none" : "transition-transform duration-300",
                )}
              >
                <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-light/20" />
                <div className="flex justify-end mb-4">
                  <Drawer.Close asChild>
                    <button
                      className="text-light p-2"
                      aria-label="Close navigation menu"
                    >
                      <X className="w-8 h-8" />
                    </button>
                  </Drawer.Close>
                </div>

                <div className="flex flex-col items-center gap-6 text-2xl font-display">
                  <button
                    onClick={() => {
                      setTheme(currentTheme === "dark" ? "light" : "dark");
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-light/80 hover:text-brand transition-colors"
                  >
                    {currentTheme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
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
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </nav>
    </>
  );
}
