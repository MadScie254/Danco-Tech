import React from "react";

const LOGOS = [
  "THE CO-OPERATIVE UNIVERSITY OF KENYA",
  "ZETECH UNIVERSITY",
  "MORINGA SCHOOL",
  "AGRITECH KENYA",
  "COUNTY HOSPITAL SECTOR",
  "KENYA POWER LABS",
];

export function LogosBanner() {
  return (
    <div className="py-12 bg-surface/80 border-y border-light/5 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <div className="animate-[ticker_40s_linear_infinite] inline-flex items-center">
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, index) => (
            <div
              key={index}
              className="flex items-center text-light/40 hover:text-light/80 transition-colors cursor-default font-display font-semibold tracking-wider uppercase text-xl px-12"
            >
              <div className="w-2 h-2 rounded-full bg-brand/50 mr-8" />
              {logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
