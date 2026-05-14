import React from "react";
import { Mic, ArrowUpRight, Presentation } from "lucide-react";

const ENGAGEMENTS = [
  {
    title: "AI in African Agriculture: Beyond the Hype",
    event: "Tech in Africa Summit 2024",
    location: "Kigali, Rwanda",
    type: "Keynote",
    date: "Aug 2024",
    link: "#",
    description: "Discussed the practical challenges of deploying edge AI models using low-cost hardware for smallholder farmers.",
  },
  {
    title: "The Reality of Full-Stack Django in Healthcare",
    event: "DevFest Nairobi",
    location: "Nairobi, Kenya",
    type: "Technical Talk",
    date: "Dec 2023",
    link: "#",
    description: "Architectural teardown of MediShift, focusing on real-time scheduling constraints and HIPAA/Kenyan Data Protection Act compliance.",
  },
  {
    title: "Intro to Econometrics with Machine Learning",
    event: "Zetech Unversity Tech Bootcamp",
    location: "Ruiru, Kenya",
    type: "Workshop",
    date: "Mar 2023",
    link: "#",
    description: "A hands-on session helping undergraduate students build GDP forecasting models using Python and Pandas.",
  }
];

export function Speaking() {
  return (
    <section id="speaking" className="py-24 bg-surface/50 border-t border-light/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <div className="text-brand font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
            <Mic className="w-4 h-4" /> Speaking & Workshops
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Sharing Knowledge.
          </h2>
          <p className="text-xl text-light/70 max-w-2xl">
            I regularly speak at tech events and universities, bridging the gap between academic research and production engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ENGAGEMENTS.map((item, index) => (
            <div 
              key={index} 
              className="group bg-primary border border-light/10 p-6 md:p-8 rounded-xl flex flex-col hover:border-brand/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                  <Presentation className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono px-2 py-1 bg-surface border border-light/10 rounded text-light/60">
                  {item.date}
                </div>
              </div>
              
              <h3 className="font-display text-xl font-bold mb-2 group-hover:text-brand transition-colors">
                {item.title}
              </h3>
              
              <div className="text-xs font-mono uppercase tracking-widest text-[#A6CE39] mb-4">
                {item.event} · {item.type}
              </div>
              
              <p className="text-sm text-light/60 mb-8 flex-grow">
                {item.description}
              </p>
              
              <div className="mt-auto pt-4 border-t border-light/10 flex justify-between items-center text-sm font-mono text-light/50">
                <span>📍 {item.location}</span>
                <a href={item.link} className="flex items-center gap-1 hover:text-light transition-colors group-hover:text-brand">
                  View Slides <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
