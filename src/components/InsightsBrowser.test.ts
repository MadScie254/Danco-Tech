import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { InsightsBrowser } from "./InsightsBrowser";
import { EMPTY_INSIGHT_FILTERS, type InsightItem } from "../lib/insights";

const items: InsightItem[] = [
  {
    id: "frappe",
    kind: "article",
    title: "Frappe in seven minutes",
    summary: "A quick intro",
    href: "https://example.com/frappe",
    tags: ["frappe"],
    venue: "LinkedIn",
    when: "LinkedIn",
  },
  {
    id: "agriculture",
    kind: "talk",
    title: "AI in African Agriculture",
    summary: "Edge models for farmers",
    href: "#",
    tags: ["agriculture"],
    venue: "Tech in Africa Summit 2024",
    when: "Aug 2024",
    place: "Kigali, Rwanda",
    format: "Keynote",
  },
];

const render = (filters = EMPTY_INSIGHT_FILTERS) =>
  renderToStaticMarkup(
    createElement(
      InsightsBrowser,
      { items, initialFilters: filters, syncUrl: false },
      createElement("p", null, "Editorial archive"),
    ),
  );

describe("InsightsBrowser", () => {
  it("shows the editorial archive and hides result titles when no filter is active", () => {
    const html = render();
    expect(html).toContain("Editorial archive");
    expect(html).toContain('maxLength="120"');
    expect(html).not.toContain("2 results");
    expect(html).not.toContain("Frappe in seven minutes");
    expect(html).not.toContain("Clear filters");
  });

  it("keeps a selected tag on screen when nothing in the catalog has it", () => {
    const html = render({ ...EMPTY_INSIGHT_FILTERS, tag: "missing" });
    expect(html).toContain("missing");
    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain("No writing matches that search.");
    expect(html).not.toContain("Editorial archive");
  });

  it("lists the matching external article and hides the editorial archive", () => {
    const html = render({ ...EMPTY_INSIGHT_FILTERS, text: "frappe" });
    expect(html).toContain("Frappe in seven minutes");
    expect(html).toContain('href="https://example.com/frappe"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain("1 result");
    expect(html).toContain("Clear filters");
    expect(html).not.toContain("Editorial archive");
    expect(html).not.toContain("AI in African Agriculture");
  });

  it("states when nothing matches", () => {
    const html = render({ ...EMPTY_INSIGHT_FILTERS, text: "zzzz-nope" });
    expect(html).toContain("No writing matches that search.");
    expect(html).toContain("0 results");
    expect(html).not.toContain("Editorial archive");
  });

  it("renders an in-page talk without a new tab", () => {
    const html = render({ ...EMPTY_INSIGHT_FILTERS, kind: "talk" });
    expect(html).toContain("AI in African Agriculture");
    expect(html).not.toContain("Frappe in seven minutes");
    expect(html).not.toContain('target="_blank"');
    expect(html).toContain('href="#"');
  });
});
