import React, { useState } from "react";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Github,
  Linkedin,
} from "lucide-react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      projectType: String(formData.get("project_type") ?? ""),
      message: String(formData.get("message") ?? ""),
      honeypot: String(formData.get("company_website") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to send message.");
      }

      setStatus("success");
      setMessage("Thanks! Your message has been sent.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-primary relative border-t border-light/5"
    >
      <div
        className="absolute inset-0 bg-brand/5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(29, 158, 117, 0.15) 0%, transparent 40%)",
        }}
      ></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16">
          <div className="text-brand font-mono text-sm tracking-widest uppercase mb-4">
            Let's Build
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Ready to make your data work harder?
          </h2>
          <p className="text-xl text-light/70 max-w-2xl">
            Based in Nairobi. Working globally. Always building.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-mono text-light/70 uppercase"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-surface/50 border border-light/10 rounded-md px-4 py-3 text-light focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-mono text-light/70 uppercase"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-surface/50 border border-light/10 rounded-md px-4 py-3 text-light focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="company"
                  className="text-sm font-mono text-light/70 uppercase"
                >
                  Company / Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full bg-surface/50 border border-light/10 rounded-md px-4 py-3 text-light focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="project_type"
                  className="text-sm font-mono text-light/70 uppercase"
                >
                  Project Type
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  className="w-full bg-surface/50 border border-light/10 rounded-md px-4 py-3 text-light focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors appearance-none"
                >
                  <option className="bg-primary text-light">AI/ML Model</option>
                  <option className="bg-primary text-light">
                    SaaS Product
                  </option>
                  <option className="bg-primary text-light">
                    IT Consulting
                  </option>
                  <option className="bg-primary text-light">
                    Research Collaboration
                  </option>
                  <option className="bg-primary text-light">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-mono text-light/70 uppercase"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full bg-surface/50 border border-light/10 rounded-md px-4 py-3 text-light focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="relative group w-full md:w-auto overflow-hidden bg-sunset hover:bg-sunset/90 text-light px-8 py-4 rounded font-sans text-lg flex items-center justify-center gap-2 transition-colors interactive"
              >
                <span className="relative z-10 font-bold">
                  {status === "loading" ? "Sending..." : "Send Message"}
                </span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/20 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite] pointer-events-none"></div>
              </button>
              {message && (
                <p
                  className={`text-sm font-mono ${
                    status === "success" ? "text-brand" : "text-red-400"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-12">
            <div className="font-mono border border-brand/40 bg-brand/5 p-6 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-[50px]"></div>
              <div className="relative z-10 space-y-2">
                <div className="flex items-center gap-3 text-brand font-bold mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse" />
                  AVAILABLE FOR NEW PROJECTS
                </div>
                <div className="text-sm text-light/80">
                  Accepting: Q3 2026 engagements
                </div>
                <div className="text-sm text-light/80">
                  Preferred: ML · SaaS · Research
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-surface border border-light/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-light/50 mb-1">
                    Email
                  </div>
                  <a
                    href="mailto:danielwanjalamachimbo@gmail.com"
                    className="text-lg hover:text-brand transition-colors"
                  >
                    danielwanjalamachimbo@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-surface border border-light/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-light/50 mb-1">
                    Phone
                  </div>
                  <a
                    href="tel:+254742007277"
                    className="text-lg hover:text-brand transition-colors"
                  >
                    +254 742 007 277
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-surface border border-light/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-light/50 mb-1">
                    Location
                  </div>
                  <div className="text-lg">Ruiru / Nairobi, Kenya 🇰🇪</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-surface border border-light/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-light/50 mb-1">
                    Timezone
                  </div>
                  <div className="text-lg">East Africa Time (UTC+3)</div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-light/10">
              <div className="text-xs font-mono uppercase text-light/50 mb-4">
                Connect
              </div>
              <div className="flex gap-4">
                <a
                  href="https://github.com/MadScie254"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="w-12 h-12 rounded-full bg-surface border border-light/10 flex flex-col items-center justify-center hover:bg-brand hover:border-brand hover:text-primary transition-all interactive group"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/daniel-wanjala-msc-912b8b17b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="w-12 h-12 rounded-full bg-surface border border-light/10 flex flex-col items-center justify-center hover:bg-brand hover:border-brand hover:text-primary transition-all interactive group"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://dev.to/wanjala"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="DEV.to profile"
                  className="h-12 px-5 rounded-full bg-surface border border-light/10 flex flex-col items-center justify-center hover:bg-brand hover:border-brand hover:text-primary transition-all interactive group font-bold text-sm"
                >
                  DEV.to
                </a>
                <a
                  href="https://orcid.org/0009-0005-1979-8555"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ORCID profile"
                  className="h-12 px-5 rounded-full bg-surface border border-light/10 flex flex-col items-center justify-center hover:bg-brand hover:border-brand hover:text-primary transition-all interactive group font-bold text-sm"
                >
                  ORCID
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
