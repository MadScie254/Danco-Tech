export const MAX_INSIGHT_QUERY_LENGTH = 120;

export type InsightKind = "article" | "talk" | "research";

export type InsightItem = {
  id: string;
  kind: InsightKind;
  title: string;
  summary: string;
  href: string;
  tags: readonly string[];
  venue: string;
  when: string;
  place?: string;
  format?: string;
};

export type InsightFilters = {
  text: string;
  kind: InsightKind | "all";
  tag: string;
};

export const EMPTY_INSIGHT_FILTERS: InsightFilters = Object.freeze({
  text: "",
  kind: "all",
  tag: "",
});

export type InsightMatch = InsightItem & { score: number };

export type InsightTagCount = {
  tag: string;
  count: number;
};

export type InsightSearch = {
  results: InsightMatch[];
  total: number;
  availableTags: InsightTagCount[];
};

export const INSIGHT_KIND_OPTIONS = [
  { value: "all", label: "All" },
  { value: "article", label: "Articles" },
  { value: "talk", label: "Talks" },
  { value: "research", label: "Research" },
] as const;

const INSIGHT_KINDS = new Set<InsightKind>(["article", "talk", "research"]);
const COMBINING_MARKS = /[\u0300-\u036f]/g;

export function normalizeInsightTag(value: string): string {
  return value.trim().replace(/^#+/, "").trim().replace(/\s+/g, " ").toLowerCase();
}

export function hasActiveInsightFilters(filters: InsightFilters): boolean {
  return (
    filters.text.trim().length > 0 ||
    filters.kind !== "all" ||
    normalizeInsightTag(filters.tag).length > 0
  );
}

function foldInsightText(value: string): string {
  return value.normalize("NFKD").replace(COMBINING_MARKS, "").toLowerCase();
}

function queryTokens(text: string): string[] {
  const capped = text.trim().slice(0, MAX_INSIGHT_QUERY_LENGTH);
  if (!capped) return [];
  return foldInsightText(capped).split(/\s+/).filter(Boolean);
}

function tokenScore(token: string, item: InsightItem): number {
  if (foldInsightText(item.title).includes(token)) return 5;
  const tags = item.tags.map((tag) => foldInsightText(normalizeInsightTag(tag)));
  if (tags.some((tag) => tag.includes(token))) return 3;
  const context = [item.venue, item.when, item.place ?? "", item.format ?? ""]
    .map((value) => foldInsightText(value))
    .join(" ");
  if (context.includes(token)) return 2;
  if (foldInsightText(item.summary).includes(token)) return 1;
  return 0;
}

function tagCounts(items: readonly InsightItem[]): InsightTagCount[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    const seen = new Set<string>();
    for (const tag of item.tags) {
      const normalized = normalizeInsightTag(tag);
      if (!normalized || seen.has(normalized)) continue;
      seen.add(normalized);
      counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function searchInsights(
  items: readonly InsightItem[],
  filters: InsightFilters,
): InsightSearch {
  const tokens = queryTokens(filters.text);
  const wantedTag = normalizeInsightTag(filters.tag);
  const matchedKind: { item: InsightItem; index: number; score: number }[] = [];

  items.forEach((item, index) => {
    if (filters.kind !== "all" && item.kind !== filters.kind) return;
    let score = 0;
    for (const token of tokens) {
      const part = tokenScore(token, item);
      if (part === 0) return;
      score += part;
    }
    matchedKind.push({ item, index, score });
  });

  const availableTags = tagCounts(matchedKind.map((entry) => entry.item));
  const matched = matchedKind.filter((entry) => {
    if (!wantedTag) return true;
    return entry.item.tags.some((tag) => normalizeInsightTag(tag) === wantedTag);
  });
  matched.sort((a, b) => b.score - a.score || a.index - b.index);

  const results = matched.map(({ item, score }) => ({ ...item, score }));
  return { results, total: results.length, availableTags };
}

export function visibleInsightTags(
  available: readonly InsightTagCount[],
  selectedTag: string,
  limit = 12,
): InsightTagCount[] {
  const selected = normalizeInsightTag(selectedTag);
  const top = available.slice(0, limit);
  if (!selected || top.some((entry) => entry.tag === selected)) return [...top];
  const extra = available.find((entry) => entry.tag === selected);
  if (!extra) return [...top];
  return [extra, ...top];
}

export function parseInsightFilters(params: URLSearchParams): InsightFilters {
  const kindParam = (params.get("kind") ?? "").trim().toLowerCase();
  const kind = INSIGHT_KINDS.has(kindParam as InsightKind)
    ? (kindParam as InsightKind)
    : "all";
  return {
    text: (params.get("q") ?? "").trim().slice(0, MAX_INSIGHT_QUERY_LENGTH),
    kind,
    tag: normalizeInsightTag(params.get("tag") ?? ""),
  };
}

export function serializeInsightFilters(filters: InsightFilters): string {
  const params = new URLSearchParams();
  const text = filters.text.trim().slice(0, MAX_INSIGHT_QUERY_LENGTH);
  if (text) params.set("q", text);
  if (filters.kind !== "all") params.set("kind", filters.kind);
  const tag = normalizeInsightTag(filters.tag);
  if (tag) params.set("tag", tag);
  return params.toString();
}

export function withInsightFilters(href: string, filters: InsightFilters): string {
  const url = new URL(href, "https://insights.local");
  url.searchParams.delete("q");
  url.searchParams.delete("kind");
  url.searchParams.delete("tag");
  const next = new URLSearchParams(serializeInsightFilters(filters));
  for (const [key, value] of next) {
    url.searchParams.append(key, value);
  }
  return `${url.pathname}${url.search}${url.hash}`;
}

export function toggleInsightTag(filters: InsightFilters, tag: string): InsightFilters {
  const normalized = normalizeInsightTag(tag);
  if (normalizeInsightTag(filters.tag) === normalized) {
    return { ...filters, tag: "" };
  }
  return { ...filters, tag: normalized };
}

export function insightResultLabel(total: number): string {
  return total === 1 ? "1 result" : `${total} results`;
}

export function validateInsightCatalog(items: readonly InsightItem[]): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();

  for (const item of items) {
    if (!item.id.trim()) {
      errors.push("empty id");
    } else if (seen.has(item.id)) {
      errors.push(`duplicate id ${item.id}`);
    } else {
      seen.add(item.id);
    }

    if (!item.title.trim()) errors.push(`${item.id} missing title`);
    if (!item.summary.trim()) errors.push(`${item.id} missing summary`);
    if (!item.venue.trim()) errors.push(`${item.id} missing venue`);
    if (!item.when.trim()) errors.push(`${item.id} missing when`);
    if (item.tags.length === 0) errors.push(`${item.id} needs a tag`);
    for (const tag of item.tags) {
      if (tag !== normalizeInsightTag(tag)) {
        errors.push(`${item.id} tag ${tag} not normalized`);
      }
    }
    if (!INSIGHT_KINDS.has(item.kind)) errors.push(`${item.id} bad kind`);
    if (!/^https?:\/\//.test(item.href) && item.href !== "#") {
      errors.push(`${item.id} bad href`);
    }
  }

  return errors;
}
