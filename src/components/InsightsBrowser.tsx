import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { INSIGHTS } from "../lib/insights-catalog";
import {
  EMPTY_INSIGHT_FILTERS,
  INSIGHT_KIND_OPTIONS,
  MAX_INSIGHT_QUERY_LENGTH,
  blockInPageInsightNavigation,
  hasActiveInsightFilters,
  insightResultLabel,
  normalizeInsightTag,
  searchInsights,
  toggleInsightTag,
  visibleInsightTags,
  withInsightFilters,
  type InsightFilters,
  type InsightItem,
  type InsightKind,
} from "../lib/insights";

type InsightsBrowserProps = {
  items?: readonly InsightItem[];
  initialFilters?: InsightFilters;
  syncUrl?: boolean;
  children?: React.ReactNode;
};

function kindLabel(kind: InsightKind): string {
  if (kind === "article") return "Article";
  if (kind === "talk") return "Talk";
  return "Research";
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

export function InsightsBrowser({
  items = INSIGHTS,
  initialFilters,
  syncUrl = false,
  children,
}: InsightsBrowserProps) {
  const [filters, setFilters] = useState<InsightFilters>(() => ({
    ...(initialFilters ?? EMPTY_INSIGHT_FILTERS),
  }));

  useEffect(() => {
    if (!syncUrl || typeof window === "undefined") return;
    const next = withInsightFilters(window.location.href, filters);
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (next !== current) {
      window.history.replaceState(null, "", next);
    }
  }, [filters, syncUrl]);

  const search = searchInsights(items, filters);
  const active = hasActiveInsightFilters(filters);
  const tags = visibleInsightTags(search.availableTags, filters.tag);

  return (
    <section id="insights-browser" aria-labelledby="insights-browser-heading">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="text-brand font-mono text-sm tracking-widest uppercase mb-4">
          Archive
        </div>
        <h2
          id="insights-browser-heading"
          className="font-display text-3xl md:text-4xl font-bold mb-6"
        >
          Search the archive
        </h2>

        <form
          role="search"
          className="mb-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="insight-search" className="sr-only">
            Search titles, topics, and tags
          </label>
          <div className="flex items-center gap-3 border border-light/10 bg-surface/40 rounded-xl px-4 focus-within:border-brand">
            <Search className="w-4 h-4 text-light/40 shrink-0" aria-hidden="true" />
            <input
              id="insight-search"
              name="q"
              type="search"
              value={filters.text}
              maxLength={MAX_INSIGHT_QUERY_LENGTH}
              placeholder="Search titles, topics, and tags"
              autoComplete="off"
              onChange={(event) => {
                const text = event.target.value.slice(0, MAX_INSIGHT_QUERY_LENGTH);
                setFilters((current) => ({ ...current, text }));
              }}
              className="w-full bg-transparent py-4 text-light outline-none placeholder:text-light/40"
            />
          </div>
        </form>

        <div className="flex flex-col gap-4 mb-6">
          <div role="group" aria-label="Filter by kind" className="flex flex-wrap gap-2">
            {INSIGHT_KIND_OPTIONS.map((option) => {
              const pressed = filters.kind === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() =>
                    setFilters((current) => ({ ...current, kind: option.value }))
                  }
                  className={`px-3 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider ${
                    pressed
                      ? "border-brand text-brand bg-brand/10"
                      : "border-light/15 text-light/60 hover:border-brand/40 hover:text-light"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {tags.length > 0 && (
            <div role="group" aria-label="Filter by tag" className="flex flex-wrap gap-2">
              {tags.map((entry) => {
                const pressed = normalizeInsightTag(filters.tag) === entry.tag;
                return (
                  <button
                    key={entry.tag}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() =>
                      setFilters((current) => toggleInsightTag(current, entry.tag))
                    }
                    className={`px-2.5 py-1 rounded border text-[11px] font-mono ${
                      pressed
                        ? "border-brand text-brand bg-brand/10"
                        : "border-light/10 text-light/50 hover:border-light/30 hover:text-light"
                    }`}
                  >
                    {entry.tag}
                    <span className="text-light/30"> · {entry.count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {active && (
          <div className="flex items-center justify-between gap-4 mb-8">
            <p aria-live="polite" className="text-sm font-mono text-light/50">
              {insightResultLabel(search.total)}
            </p>
            <button
              type="button"
              onClick={() => setFilters({ ...EMPTY_INSIGHT_FILTERS })}
              className="inline-flex items-center gap-1 text-sm font-mono text-light/60 hover:text-brand"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              Clear filters
            </button>
          </div>
        )}

        {active &&
          (search.results.length === 0 ? (
            <p role="status" className="text-light/70 pb-28">
              No writing matches that search.
            </p>
          ) : (
            <ul aria-label="Search results" className="grid gap-4 pb-28">
              {search.results.map((item) => {
                const external = isExternalHref(item.href);
                const meta = [item.venue, item.format, item.place].filter(Boolean).join(" · ");
                return (
                  <li
                    key={item.id}
                    className="border border-light/10 bg-surface/30 rounded-xl p-6 hover:border-brand/30"
                  >
                    <div className="flex justify-between gap-4 text-[10px] font-mono uppercase tracking-wider text-light/40 mb-3">
                      <span>{kindLabel(item.kind)}</span>
                      <span>{item.when}</span>
                    </div>
                    <a
                      href={item.href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      onClick={(event) => blockInPageInsightNavigation(item.href, event)}
                      className="font-display text-2xl font-bold hover:text-brand break-words"
                    >
                      {item.title}
                    </a>
                    <p className="text-sm text-light/60 mt-3">{item.summary}</p>
                    <p className="text-xs font-mono text-light/40 mt-4">{meta}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono text-light/40">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          ))}
      </div>
      {!active && children}
    </section>
  );
}
