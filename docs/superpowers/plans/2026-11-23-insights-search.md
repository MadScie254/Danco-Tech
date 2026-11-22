# Insights Archive Search Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let visitors search and filter the writing, talks, and research already published on the Insights hub, without dropping the existing editorial layout when no filter is active.

**Architecture:** One pure module owns normalization, scoring, tag facets, and shareable query-string filters. A catalog module is the only copy of article, talk, and research records. `InsightsBrowser` renders the controls and, once a filter is active, a ranked result list; otherwise it renders the existing Speaking, Research, and Articles sections as children. Vitest stays on the Node environment. Markup is asserted with `react-dom/server` `renderToStaticMarkup`, so no new test dependency is required.

**Tech Stack:** React 19, TypeScript 5.8, Vite 6, Vitest 5, existing Tailwind theme tokens. No new runtime dependencies.

## Global Constraints

- Do not add runtime or test dependencies.
- Tests live in `src/**/*.test.ts` and run with `npm test` (Vitest, `environment: "node"`).
- `npm run lint` is `tsc --noEmit` and must pass.
- Keep every existing article (19), talk (3), and the featured research paper. Do not rewrite their titles, summaries, venues, or the existing "Zetech Unversity" spelling.
- Article tags are stored without a leading `#`. The article cards may render the `#` prefix.
- Search is case-insensitive, accent-insensitive, and tokenized on whitespace. Every token must match (AND).
- A token scores at most once, from the highest bucket that contains it: title 5, tag 3, venue / when / place / format 2, summary 1.
- Matching is substring-based after folding. Tag filtering is exact on the normalized tag.
- Query text is trimmed and capped at 120 characters before tokenization.
- Empty text, kind `all`, and an empty tag are the inactive state. Inactive state keeps the editorial sections and does not render the ranked list.
- Shareable params are `q`, `kind`, and `tag`. Other query params and the `#insights` hash are preserved.
- Kind values are `article`, `talk`, and `research`. Any other value means `all`.
- Visible tag chips are the top 12 facets. A selected tag outside that slice stays visible.
- External result links (`http` / `https`) open in a new tab with `rel="noopener noreferrer"`. Links that are only `#` stay in the same tab.
- Match the existing visual language: `font-display`, `font-mono`, `text-brand`, `border-light/10`, `bg-primary`, `bg-surface`.

---

### Task 1: Search and URL filters

**Files:**
- Create: `src/lib/insights.ts`
- Test: `src/lib/insights.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `MAX_INSIGHT_QUERY_LENGTH = 120`
  - `InsightKind = "article" | "talk" | "research"`
  - `InsightItem` with `id`, `kind`, `title`, `summary`, `href`, `tags`, `venue`, `when`, optional `place`, optional `format`
  - `InsightFilters` with `text: string`, `kind: InsightKind | "all"`, `tag: string`
  - `EMPTY_INSIGHT_FILTERS`
  - `InsightMatch` = `InsightItem & { score: number }`
  - `InsightTagCount` = `{ tag: string; count: number }`
  - `InsightSearch` = `{ results: InsightMatch[]; total: number; availableTags: InsightTagCount[] }`
  - `normalizeInsightTag(value: string): string`
  - `hasActiveInsightFilters(filters: InsightFilters): boolean`
  - `parseInsightFilters(params: URLSearchParams): InsightFilters`
  - `serializeInsightFilters(filters: InsightFilters): string`
  - `withInsightFilters(href: string, filters: InsightFilters): string`
  - `toggleInsightTag(filters: InsightFilters, tag: string): InsightFilters`
  - `searchInsights(items: readonly InsightItem[], filters: InsightFilters): InsightSearch`
  - `visibleInsightTags(available: readonly InsightTagCount[], selectedTag: string, limit?: number): InsightTagCount[]`
  - `insightResultLabel(total: number): string`
  - `INSIGHT_KIND_OPTIONS`
  - `validateInsightCatalog(items: readonly InsightItem[]): string[]`

- [x] **Step 1: Write the failing test**

Cover, with plain fixtures (not the real catalog):

- folding case and accents (`Naïve` matches `naive`)
- AND tokens, including a query that matches nothing
- title score 5 beats a summary-only score 1, and a token present in both title and summary scores 5 once
- place text scores 2 and is indexed (`Kigali`)
- original order when every score is 0
- exact tag filter, including a leading `#` and mixed case
- `availableTags` ignores the selected tag, respects text and kind, and sorts by count desc then tag asc
- `visibleInsightTags` keeps a selected tag that falls outside the top 12
- query text longer than 120 characters cannot match a token that starts past the cap
- parse / serialize round-trip; unknown kind becomes `all`; `###` tag becomes empty
- `withInsightFilters` preserves an unrelated `utm` param and `#insights`, and clears insight params when given empty filters
- `toggleInsightTag` clears the tag when it is already selected
- `insightResultLabel(1)` is `1 result` and `insightResultLabel(0)` is `0 results`
- `validateInsightCatalog` reports a duplicate id and a non-normalized tag
- `hasActiveInsightFilters` is false only for empty text, kind `all`, and blank tag

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/insights.test.ts`

Expected: FAIL because `./insights` does not export the functions (module missing, then assertion failures once the module exists).

- [x] **Step 3: Write minimal implementation**

Implement the interfaces above in `src/lib/insights.ts`.

Fold with `NFKD` and strip U+0300–U+036F. Do not use a Unicode property escape.

`searchInsights` computes `availableTags` from items that match kind and text, before the tag filter. `results` apply the tag filter too. `total` is `results.length`.

`withInsightFilters` parses `href` with base `https://insights.local`, deletes `q`, `kind`, and `tag`, appends the serialized filters, and returns `pathname + search + hash` (no origin).

`validateInsightCatalog` checks unique non-empty ids, non-empty title, summary, venue, and when, at least one tag, tags already equal to `normalizeInsightTag`, kind in the union, and `href` of `http(s)` or `#`.

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/insights.test.ts`

Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/lib/insights.ts src/lib/insights.test.ts
git commit -m "feat: add insights search and shareable filters"
```

---

### Task 2: Catalog as the single source of records

**Files:**
- Create: `src/lib/insights-catalog.ts`
- Modify: `src/lib/insights.test.ts`
- Modify: `src/components/Articles.tsx`
- Modify: `src/components/Speaking.tsx`
- Modify: `src/components/Research.tsx`

**Interfaces:**
- Consumes: `InsightItem`, `validateInsightCatalog`, `searchInsights`, `EMPTY_INSIGHT_FILTERS` from Task 1
- Produces:
  - `INSIGHTS: readonly InsightItem[]`
  - `ARTICLE_INSIGHTS`, `TALK_INSIGHTS`, `RESEARCH_INSIGHT`

- [x] **Step 1: Extend the failing test**

Assert all of the following against `INSIGHTS`:

- `validateInsightCatalog(INSIGHTS)` equals `[]`
- 19 articles, 3 talks, 1 research item
- `searchInsights` for text `frappe` returns 2 articles
- text `kigali` returns the agriculture talk
- text `electricity theft` returns the research item
- ids are stable: `frappe-in-7-minutes`, `talk-ai-african-agriculture`, `research-electricity-theft`

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/insights.test.ts`

Expected: FAIL because the catalog module or those records do not exist.

- [x] **Step 3: Move the records**

Create `src/lib/insights-catalog.ts` by moving the 19 articles from `Articles.tsx`, the 3 engagements from `Speaking.tsx`, and the featured paper title plus abstract from `Research.tsx`.

Field mapping:

- article `topic` → `summary`, `url` → `href`, `platform` → `venue`, `published` → `when`, tags stripped of `#`
- talk `event` → `venue`, `type` → `format`, `location` → `place`, `date` → `when`, `description` → `summary`, `link` → `href`
- research title without the wrapping quotation marks, full abstract as `summary`, venue `The Co-operative University of Kenya`, when `2024–2026`, href `https://orcid.org/0009-0005-1979-8555`, tags `smart-grid`, `class-imbalance`, `xgboost`, `utilities`

Point Articles, Speaking, and Research at the catalog. Article cards render tags as `#${tag}`. Speaking keeps its card layout. Research keeps institution, supervisor, registration, status, methods, dataset, and applicability copy in the component, and reads title and abstract from `RESEARCH_INSIGHT`.

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/insights.test.ts`

Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/lib/insights-catalog.ts src/lib/insights.test.ts src/components/Articles.tsx src/components/Speaking.tsx src/components/Research.tsx
git commit -m "feat: share one insights catalog across sections"
```

---

### Task 3: Insights browser

**Files:**
- Create: `src/components/InsightsBrowser.tsx`
- Create: `src/components/InsightsBrowser.test.ts`
- Modify: `src/App.tsx`
- Modify: `src/components/CommandMenu.tsx`
- Modify: `README.md`

**Interfaces:**
- Consumes: Task 1 and Task 2 exports
- Produces: `InsightsBrowser` props `{ items?: readonly InsightItem[]; initialFilters?: InsightFilters; syncUrl?: boolean; children?: React.ReactNode }`

- [x] **Step 1: Write the failing markup test**

Use `renderToStaticMarkup` and `createElement` (the test file stays `.ts`). Fixture: one external article and one `#` talk, plus a child text node `Editorial archive`.

Assert:

- inactive filters render `Editorial archive`, the label `2 results`, and no article title
- text `frappe` renders the article title and `https://example.com/frappe`, hides `Editorial archive` and the talk title, and shows `1 result` plus a `Clear filters` button
- the external link has `target="_blank"` and `rel="noopener noreferrer"`
- text that matches nothing renders `No writing matches that search.` and `0 results`
- kind `talk` renders the talk title and does not add `target="_blank"`

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/InsightsBrowser.test.ts`

Expected: FAIL because the component does not exist.

- [x] **Step 3: Implement the browser and wire the page**

`InsightsBrowser`:

- `useState` seeded from `initialFilters` or a shallow copy of `EMPTY_INSIGHT_FILTERS`
- when `syncUrl` is true, `replaceState` to `withInsightFilters(window.location.href, filters)` only if the path/search/hash changed
- search form with `role="search"`, label `Search titles, topics, and tags`, input id `insight-search`
- kind buttons from `INSIGHT_KIND_OPTIONS` with `aria-pressed`
- tag buttons from `visibleInsightTags`, `aria-pressed`, click calls `toggleInsightTag`
- `Clear filters` only when `hasActiveInsightFilters`
- polite result count via `insightResultLabel`
- active filters render a list of matches and not `children`
- inactive filters render `children` and not the match list
- section id `insights-browser`

In `App.tsx`, wrap `<Speaking />`, `<Research />`, and `<Articles />` on the insights page with `InsightsBrowser` (`syncUrl`, `initialFilters` parsed from `window.location.search`). `openHome` writes a URL passed through `withInsightFilters(..., EMPTY_INSIGHT_FILTERS)` so leaving the hub drops `q`, `kind`, and `tag`.

Add a Command Menu item labeled `Insights Hub` that sets `window.location.hash = "#insights"` and closes the menu.

Document the params `q`, `kind`, and `tag` in the README.

- [x] **Step 4: Run tests, lint, and build**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected: all three exit 0.

- [x] **Step 5: Commit**

```bash
git add src/components/InsightsBrowser.tsx src/components/InsightsBrowser.test.ts src/App.tsx src/components/CommandMenu.tsx README.md
git commit -m "feat: filter the insights hub from a shareable query"
```

---

## Spec coverage (self-review)

- Search, AND tokens, folding, scoring, tag facets, and the 120-character cap are Task 1.
- Preserving all published records and feeding the existing sections from one catalog are Task 2.
- Editorial layout when idle, ranked results when filtered, shareable URL, command menu entry, and README are Task 3.
- No placeholders. Types named in later tasks are produced by Task 1 or Task 2.

## Execution

Inline execution in this session. The originating request already asked for implementation, tests, review, and a report, so the plan is not waiting on a second execution choice.
