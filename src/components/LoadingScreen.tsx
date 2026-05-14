import React, { useState, useEffect } from "react";
import { cn } from "../lib/utils";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const duration = 2000;
    const interval = 20; // update every 20ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(Math.round(newProgress));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "";
        }, 400); // slight delay after 100%
      }
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] bg-primary flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)]",
        progress === 100 && !loading ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="absolute inset-0 bg-surface/50 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="overflow-hidden mb-6">
          <div 
            className="text-[120px] md:text-[200px] font-serif font-bold italic tracking-tighter text-brand leading-none"
            style={{ 
              clipPath: `polygon(0 100%, 100% 100%, 100% ${100 - progress}%, 0 ${100 - progress}%)`,
              transition: "clip-path 0.1s linear"
            }}
          >
            DW
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[120px] md:text-[200px] font-serif font-bold italic tracking-tighter text-light/5 leading-none z-[-1]">
            DW
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-light/50 font-mono text-sm max-w-[200px] w-full">
          <div className="h-[1px] bg-brand flex-grow" style={{ transform: `scaleX(${progress / 100})`, transformOrigin: "left" }} />
          <span>{progress.toString().padStart(3, '0')}%</span>
        </div>
        
        <div className="mt-8 text-brand font-mono text-xs uppercase tracking-widest text-center animate-pulse">
          INITIALIZING SYSTEMS
        </div>
      </div>
    </div>
  );
}
