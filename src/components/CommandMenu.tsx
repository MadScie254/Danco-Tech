import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, Monitor, Terminal, FileText, Mail, Github, ExternalLink } from "lucide-react";

export function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh] bg-primary/80 backdrop-blur-sm px-4">
      <div className="fixed inset-0" onClick={() => setOpen(false)} />
      
      <Command 
        className="w-full max-w-2xl bg-surface border border-light/10 rounded-xl overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200"
        label="Global Command Menu"
      >
        <div className="flex items-center border-b border-light/5 px-4">
          <Search className="w-5 h-5 text-light/40 mr-3" />
          <Command.Input 
            autoFocus 
            placeholder="Type a command or search..." 
            className="flex-grow bg-transparent border-none outline-none py-5 text-light font-medium placeholder:text-light/40"
          />
          <div className="text-[10px] font-mono text-light/40 px-2 py-1 bg-primary/50 rounded border border-light/5">ESC</div>
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto p-2 smooth-scroll">
          <Command.Empty className="py-6 text-center text-sm text-light/50 font-mono">No results found.</Command.Empty>

          <Command.Group heading="Navigation" className="text-xs font-mono uppercase tracking-widest text-light/40 p-2 mb-2">
            {[
              { id: "home", label: "Home", icon: <Monitor className="w-4 h-4 mr-3" /> },
              { id: "projects", label: "Projects Showcase", icon: <Terminal className="w-4 h-4 mr-3" /> },
              { id: "analytics", label: "Live Analytics", icon: <FileText className="w-4 h-4 mr-3" /> },
              { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4 mr-3" /> },
            ].map(item => (
              <Command.Item
                key={item.id}
                onSelect={() => {
                  setOpen(false);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center px-3 py-3 text-sm text-light/80 hover:bg-brand/10 hover:text-brand cursor-pointer rounded-lg transition-colors aria-selected:bg-brand/10 aria-selected:text-brand"
              >
                {item.icon} {item.label}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Projects" className="text-xs font-mono uppercase tracking-widest text-light/40 p-2 border-t border-light/5">
            {[
              { label: "NyumbaIQ", link: "https://github.com/MadScie254" },
              { label: "AgriAI Kenya", link: "https://github.com/MadScie254/Capstone-Lazarus" },
              { label: "InvestWise Predictor", link: "https://github.com/MadScie254/Invest-wise" },
            ].map(item => (
              <Command.Item
                key={item.label}
                onSelect={() => {
                  setOpen(false);
                  window.open(item.link, "_blank");
                }}
                className="flex items-center px-3 py-3 text-sm text-light/80 hover:bg-light/5 cursor-pointer rounded-lg transition-colors aria-selected:bg-light/5"
              >
                <Github className="w-4 h-4 mr-3" /> 
                {item.label}
                <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
