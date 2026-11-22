import { describe, expect, it } from "vitest";
import {
  EMPTY_INSIGHT_FILTERS,
  hasActiveInsightFilters,
  insightResultLabel,
  normalizeInsightTag,
  parseInsightFilters,
  searchInsights,
  serializeInsightFilters,
  toggleInsightTag,
  validateInsightCatalog,
  visibleInsightTags,
  withInsightFilters,
  type InsightFilters,
  type InsightItem,
} from "./insights";
import { INSIGHTS } from "./insights-catalog";

const article = (overrides: Partial<InsightItem> = {}): InsightItem => ({
  id: "alpha",
  kind: "article",
  title: "Alpha notes",
  summary: "A short summary",
  href: "https://example.com/alpha",
  tags: ["alpha"],
  venue: "LinkedIn",
  when: "LinkedIn",
  ...overrides,
});

const filters = (overrides: Partial<InsightFilters> = {}): InsightFilters => ({
  ...EMPTY_INSIGHT_FILTERS,
  ...overrides,
});

describe("normalizeInsightTag", () => {
  it("strips hashes, case, and extra spaces", () => {
    expect(normalizeInsightTag("  #ML  Models ")).toBe("ml models");
    expect(normalizeInsightTag("###")).toBe("");
  });
});

describe("hasActiveInsightFilters", () => {
  it("is inactive only when text, kind, and tag are blank", () => {
    expect(hasActiveInsightFilters(EMPTY_INSIGHT_FILTERS)).toBe(false);
    expect(hasActiveInsightFilters(filters({ text: "  " }))).toBe(false);
    expect(hasActiveInsightFilters(filters({ text: "kenya" }))).toBe(true);
    expect(hasActiveInsightFilters(filters({ kind: "talk" }))).toBe(true);
    expect(hasActiveInsightFilters(filters({ tag: "#" }))).toBe(false);
    expect(hasActiveInsightFilters(filters({ tag: "ml" }))).toBe(true);
  });
});

describe("searchInsights", () => {
  const items: InsightItem[] = [
    article({
      id: "title-hit",
      title: "Naïve forecasting",
      summary: "Seasonal baselines",
      tags: ["forecasting"],
    }),
    article({
      id: "summary-hit",
      title: "Field notes",
      summary: "Naive forecasting fails on holidays",
      tags: ["notes"],
    }),
    article({
      id: "place-hit",
      kind: "talk",
      title: "Opening remarks",
      summary: "Welcome",
      tags: ["events"],
      place: "Kigali, Rwanda",
      format: "Keynote",
      href: "#",
    }),
    article({
      id: "later",
      title: "Later piece",
      summary: "Unrelated",
      tags: ["notes"],
    }),
  ];

  it("matches case and accents, and ranks a title hit above a summary hit", () => {
    const found = searchInsights(items, filters({ text: "  NAIVE Forecasting " }));
    expect(found.results.map((item) => item.id)).toEqual(["title-hit", "summary-hit"]);
    expect(found.results[0].score).toBe(10);
    expect(found.results[1].score).toBe(2);
    expect(found.total).toBe(2);
  });

  it("scores a token once, from the title, when the summary repeats it", () => {
    const found = searchInsights(
      [article({ title: "Alpha notes", summary: "alpha extra", tags: ["other"] })],
      filters({ text: "alpha" }),
    );
    expect(found.results[0].score).toBe(5);
  });

  it("requires every token and indexes place at the venue score", () => {
    expect(searchInsights(items, filters({ text: "naive holidays" })).results.map((item) => item.id)).toEqual([
      "summary-hit",
    ]);
    expect(searchInsights(items, filters({ text: "naive kigali" })).total).toBe(0);
    const place = searchInsights(items, filters({ text: "kigali" }));
    expect(place.results.map((item) => item.id)).toEqual(["place-hit"]);
    expect(place.results[0].score).toBe(2);
  });

  it("keeps catalog order when the query is blank", () => {
    const found = searchInsights(items, filters({ text: "   " }));
    expect(found.results.map((item) => item.id)).toEqual(items.map((item) => item.id));
    expect(found.results.every((item) => item.score === 0)).toBe(true);
  });

  it("filters by exact tag and still lists other tags for the current text", () => {
    const found = searchInsights(items, filters({ tag: "#Notes" }));
    expect(found.results.map((item) => item.id)).toEqual(["summary-hit", "later"]);
    expect(found.availableTags).toEqual([
      { tag: "notes", count: 2 },
      { tag: "events", count: 1 },
      { tag: "forecasting", count: 1 },
    ]);
  });

  it("builds tag facets from the kind and text match, before the tag filter", () => {
    const found = searchInsights(items, filters({ kind: "talk", tag: "events" }));
    expect(found.results.map((item) => item.id)).toEqual(["place-hit"]);
    expect(found.availableTags).toEqual([{ tag: "events", count: 1 }]);
  });

  it("ignores tokens that start past the 120 character cap", () => {
    const filler = "nomatch ".repeat(15);
    expect(filler.trimEnd().length).toBe(119);
    const query = `${filler}uniqueunicorn`;
    const found = searchInsights(
      [
        article({ id: "unicorn", title: "uniqueunicorn", tags: ["other"] }),
        article({ id: "noise", title: "nomatch", tags: ["other"] }),
      ],
      filters({ text: query }),
    );
    expect(found.results.map((item) => item.id)).toEqual(["noise"]);
  });

  it("returns an empty result for an empty catalog", () => {
    expect(searchInsights([], filters({ text: "alpha" }))).toEqual({
      results: [],
      total: 0,
      availableTags: [],
    });
  });
});

describe("visibleInsightTags", () => {
  it("keeps a selected tag that is outside the top slice", () => {
    const available = Array.from({ length: 14 }, (_, index) => ({
      tag: `tag-${String(index).padStart(2, "0")}`,
      count: 14 - index,
    }));
    const visible = visibleInsightTags(available, "tag-13", 12);
    expect(visible).toHaveLength(13);
    expect(visible[0]).toEqual({ tag: "tag-13", count: 1 });
    expect(visible.slice(1).some((entry) => entry.tag === "tag-13")).toBe(false);
  });
});

describe("insight query string", () => {
  it("round-trips filters and drops unknown kinds", () => {
    const parsed = parseInsightFilters(
      new URLSearchParams("q=Kenya&kind=Article&tag=%23ML"),
    );
    expect(parsed).toEqual({ text: "Kenya", kind: "article", tag: "ml" });
    expect(serializeInsightFilters(parsed)).toBe("q=Kenya&kind=article&tag=ml");
    expect(parseInsightFilters(new URLSearchParams("kind=podcast&tag=%23%23%23"))).toEqual(
      EMPTY_INSIGHT_FILTERS,
    );
  });

  it("caps serialized text at 120 characters", () => {
    const text = "a".repeat(150);
    expect(serializeInsightFilters(filters({ text }))).toBe(`q=${"a".repeat(120)}`);
  });

  it("preserves unrelated params and the hash, and can clear insight params", () => {
    expect(
      withInsightFilters("https://danco.example/work?utm=1&q=old#insights", filters({
        text: "kenya",
        kind: "talk",
        tag: "AI",
      })),
    ).toBe("/work?utm=1&q=kenya&kind=talk&tag=ai#insights");
    expect(withInsightFilters("/?q=kenya&kind=talk#insights", EMPTY_INSIGHT_FILTERS)).toBe(
      "/#insights",
    );
  });

  it("toggles a tag off when it is already selected", () => {
    expect(toggleInsightTag(filters({ tag: "ml", text: "kenya" }), "#ML")).toEqual(
      filters({ text: "kenya" }),
    );
    expect(toggleInsightTag(filters({ text: "kenya" }), " AI ")).toEqual(
      filters({ text: "kenya", tag: "ai" }),
    );
  });
});

describe("insightResultLabel", () => {
  it("singularizes one result", () => {
    expect(insightResultLabel(1)).toBe("1 result");
    expect(insightResultLabel(0)).toBe("0 results");
    expect(insightResultLabel(22)).toBe("22 results");
  });
});

describe("validateInsightCatalog", () => {
  it("reports duplicate ids and tags that are not normalized", () => {
    const errors = validateInsightCatalog([
      article({ id: "same", tags: ["#ML"] }),
      article({ id: "same" }),
    ]);
    expect(errors.some((error) => error.includes("duplicate"))).toBe(true);
    expect(errors.some((error) => error.includes("#ML") || error.includes("not normalized"))).toBe(
      true,
    );
  });
});

describe("published insights catalog", () => {
  it("keeps every article, talk, and the research paper searchable", () => {
    expect(validateInsightCatalog(INSIGHTS)).toEqual([]);
    expect(INSIGHTS.filter((item) => item.kind === "article")).toHaveLength(19);
    expect(INSIGHTS.filter((item) => item.kind === "talk")).toHaveLength(3);
    expect(INSIGHTS.filter((item) => item.kind === "research")).toHaveLength(1);

    const frappe = searchInsights(INSIGHTS, filters({ text: "frappe" }));
    expect(frappe.total).toBe(2);
    expect(frappe.results.every((item) => item.kind === "article")).toBe(true);

    const kigali = searchInsights(INSIGHTS, filters({ text: "kigali" }));
    expect(kigali.results.map((item) => item.id)).toEqual(["talk-ai-african-agriculture"]);

    const paper = searchInsights(INSIGHTS, filters({ text: "electricity theft" }));
    expect(paper.results.map((item) => item.id)).toEqual(["research-electricity-theft"]);

    expect(INSIGHTS.map((item) => item.id)).toEqual(
      expect.arrayContaining([
        "frappe-in-7-minutes",
        "talk-ai-african-agriculture",
        "research-electricity-theft",
      ]),
    );
  });
});
