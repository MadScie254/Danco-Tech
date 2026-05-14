import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const MOCK_GDP_DATA = [
  { year: "2018", actual: 5.6, predicted: 5.5 },
  { year: "2019", actual: 5.1, predicted: 5.2 },
  { year: "2020", actual: -0.3, predicted: -0.1 },
  { year: "2021", actual: 7.5, predicted: 7.2 },
  { year: "2022", actual: 4.8, predicted: 5.0 },
  { year: "2023", actual: 5.4, predicted: 5.3 },
  { year: "2024", actual: null, predicted: 5.8 },
  { year: "2025", actual: null, predicted: 6.1 },
];

export function AnalyticsShowcase() {
  const [activeView, setActiveView] = useState<"gdp" | "sgcc">("gdp");

  return (
    <section id="analytics" className="py-24 bg-primary border-t border-light/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <div className="text-brand font-mono text-sm tracking-widest uppercase mb-4">
            Live Demo
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Data in Motion
          </h2>
          <p className="text-xl text-light/70 max-w-2xl">
            Interactive visualizations demonstrating model outputs and dataset analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-4">
            <button
              onClick={() => setActiveView("gdp")}
              className={`p-6 text-left rounded-xl border transition-all ${
                activeView === "gdp"
                  ? "bg-brand/10 border-brand/50 text-light"
                  : "bg-surface/50 border-light/10 text-light/60 hover:bg-surface"
              }`}
            >
              <h3 className="font-display font-bold text-lg mb-2">Macroeconomic Forecasting</h3>
              <p className="text-sm opacity-80">
                Random Forest predictions for Kenya's GDP growth utilizing CBK exchange rates and historical data.
              </p>
            </button>
            <button
              onClick={() => setActiveView("sgcc")}
              className={`p-6 text-left rounded-xl border transition-all ${
                activeView === "sgcc"
                  ? "bg-brand/10 border-brand/50 text-light"
                  : "bg-surface/50 border-light/10 text-light/60 hover:bg-surface"
              }`}
            >
              <h3 className="font-display font-bold text-lg mb-2">Class Imbalance Analysis</h3>
              <p className="text-sm opacity-80">
                Visualizing the severe minority class distribution in the SGCC electricity theft dataset (SMOTE application).
              </p>
            </button>
          </div>

          <div className="lg:col-span-2 bg-surface/50 border border-light/10 rounded-xl p-6 md:p-8 relative overflow-hidden backdrop-blur-sm">
            {/* Custom Grid Background for pure tech vibe */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            
            <div className="relative z-10 h-[400px]">
              {activeView === "gdp" ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-mono text-sm uppercase tracking-widest text-brand">Kenya GDP Growth (%)</h4>
                    <div className="flex gap-4 text-xs font-mono">
                      <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-light"></span> Actual</span>
                      <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-brand"></span> Predicted</span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height="85%">
                    <LineChart data={MOCK_GDP_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                      <XAxis dataKey="year" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                      <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Line type="monotone" dataKey="actual" stroke="#ffffff" strokeWidth={2} dot={{ r: 4, fill: '#fff' }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="predicted" stroke="#c5a059" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: '#c5a059' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </>
              ) : (
                 <>
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-mono text-sm uppercase tracking-widest text-brand">SGCC Class Distribution</h4>
                    <div className="text-xs text-light/50 font-mono">Before / After SMOTE</div>
                  </div>
                  <div className="flex flex-col justify-center h-[85%] gap-8">
                    <div className="relative w-full h-12 bg-light/5 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-brand flex items-center px-4 text-primary font-bold text-sm" style={{ width: '9%' }}>
                        9% (Theft)
                      </div>
                      <div className="absolute top-0 right-0 h-full flex items-center px-4 text-light/50 font-bold text-sm justify-end" style={{ width: '91%' }}>
                        91% (Normal)
                      </div>
                      <div className="absolute -top-6 text-xs text-light/40 font-mono">Original Dataset (Imbalanced)</div>
                    </div>
                    
                    <div className="relative w-full h-12 bg-light/5 rounded-full overflow-hidden mt-8">
                      <div className="absolute top-0 left-0 h-full bg-brand flex items-center px-4 text-primary font-bold text-sm transition-all duration-1000" style={{ width: '50%' }}>
                        50% (Synthetic + Real)
                      </div>
                      <div className="absolute top-0 right-0 h-full flex items-center px-4 text-light/80 font-bold text-sm justify-end transition-all duration-1000" style={{ width: '50%' }}>
                        50% (Normal)
                      </div>
                      <div className="absolute -top-6 text-xs text-light/40 font-mono">After SMOTE Technique</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
