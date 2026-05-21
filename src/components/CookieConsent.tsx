import React, { useCallback, useEffect, useState } from "react";

const CONSENT_KEY = "danco-analytics-consent";

type ConsentState = "accepted" | "declined" | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const enableAnalytics = (measurementId: string) => {
  if (document.getElementById("ga4-loader")) return;

  const script = document.createElement("script");
  script.id = "ga4-loader";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", measurementId, { anonymize_ip: true });
};

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentState;
    if (!stored) {
      setVisible(true);
      return;
    }
    setConsent(stored);
    setVisible(false);
  }, []);

  useEffect(() => {
    if (consent !== "accepted") return;
    const measurementId = import.meta.env.VITE_GA4_ID as string | undefined;
    if (measurementId) {
      enableAnalytics(measurementId);
    }
  }, [consent]);

  useEffect(() => {
    const openHandler = () => setVisible(true);
    window.addEventListener("cookie-consent:open", openHandler);
    return () => window.removeEventListener("cookie-consent:open", openHandler);
  }, []);

  const handleChoice = useCallback((choice: ConsentState) => {
    if (!choice) return;
    localStorage.setItem(CONSENT_KEY, choice);
    setConsent(choice);
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-0 right-0 z-[70] px-4"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className="max-w-4xl mx-auto bg-primary border border-brand/40 rounded-2xl p-6 shadow-2xl shadow-black/40">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-light/70">
            We use privacy-friendly analytics to understand usage and improve
            the experience. You can opt out anytime.
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleChoice("declined")}
              className="px-4 py-2 rounded border border-light/20 text-light/70 hover:text-light hover:border-light/40 transition-colors text-sm"
            >
              Decline
            </button>
            <button
              onClick={() => handleChoice("accepted")}
              className="px-4 py-2 rounded bg-brand text-primary font-medium text-sm hover:bg-brand/90 transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
