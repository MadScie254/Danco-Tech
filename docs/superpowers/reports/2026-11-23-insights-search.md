# Insights archive search — technical report

**Date:** 23 November 2026 (Europe/Moscow)
**Branch:** `cursor/insights-search-4270`
**Plan:** `docs/superpowers/plans/2026-11-23-insights-search.md`

## What shipped

The Insights hub (`/#insights`) can now search and filter the writing that was previously only a long editorial page. The catalog holds 19 articles, 3 talks, and 1 research paper. With no filter, Speaking, Research, and Articles still render in their existing layouts. A text query, a kind, or a tag replaces those sections with a ranked list.

Filters live on the query string and keep the `#insights` hash:

| Param | Meaning |
| --- | --- |
| `q` | Words matched across title, summary, tags, venue, date, place, and format. Capped at 120 characters. |
| `kind` | `article`, `talk`, or `research`. Anything else means all. |
| `tag` | One normalized tag, such as `ml`. |

Leaving the hub — Back to Homepage, the nav (including Hire Us and the logo), or a command-menu destination — drops `q`, `kind`, and `tag`. Unrelated params such as `utm` stay.

## Design

`src/lib/insights.ts` is pure. It folds case and accents (NFKD, strip U+0300–U+036F), splits the capped query on whitespace, and requires every token to match. Each token scores once, from the highest bucket that contains it:

| Bucket | Points |
| --- | --- |
| Title | 5 |
| Tag | 3 |
| Venue, date, place, or format | 2 |
| Summary | 1 |

Ties keep catalog order. Tag facets are counted from the kind-and-text match, before the tag filter, and sorted by count then name. The browser shows the top 12. A selected tag stays on screen even when its count in that set is zero, so a kind change cannot hide the active constraint.

`src/lib/insights-catalog.ts` is the only copy of the records. Articles, talks, and the research title and abstract read from it. Talk slides are still `#`. Those anchors call `preventDefault`, so they do not replace `#insights` and bounce the reader to the homepage. External article links still open in a new tab with `rel="noopener noreferrer"`.

`InsightsBrowser` is lazy-loaded with the other hub sections. The editorial sections render outside its `max-w-7xl` wrapper, so their full-bleed backgrounds stay intact.

## Tests

`npm test` — 44 tests, 3 files, exit 0.
`npm run lint` (`tsc --noEmit`) — exit 0.
`npm run build` — exit 0. The insights catalog is its own chunk (`insights-catalog`, about 8 kB). The pre-existing warning that the main chunk is over 500 kB is unchanged in character (about 632 kB).

New coverage includes accent folding, AND tokens, single-bucket scoring, the 120-character cap, exact tag match, facet counts taken before the tag filter, a zero-count selected tag, query-string round trips, catalog integrity (19 / 3 / 1 and stable ids), and static markup for the idle archive, a match list, an empty list, in-page versus external links, and the search `maxLength`.

The red run failed because the modules and the new contracts were absent. The green run is the suite above.

## Browser check

Headless Chrome against `npm run dev` on port 3000, after the loading screen dismissed:

- Idle `/#insights` showed Speaking and Articles. Desktop and a 390px-wide filtered view had no horizontal overflow (`scrollWidth` equalled the viewport).
- Typing `frappe` produced both Frappe articles, hid the editorial sections, and set `/?q=frappe#insights`.
- `frappe` plus Talks showed “No writing matches that search.” and `?q=frappe&kind=talk#insights`.
- Clear filters restored the editorial page and `/?#` became `/#insights`.
- Opening `/?q=kigali&kind=talk#insights` showed the Kigali talk and not the Frappe articles.
- Back to Homepage landed on `/` with the Open Insights Hub control.
- `kenya` plus the `ml` tag left one result, Kenya Finance Bill 2024, at `?q=kenya&tag=ml#insights`.
- Clicking the agriculture talk kept `/?kind=talk#insights`.
- Switching a `frappe` tag to Talks left the chip pressed (`aria-pressed="true"`) and the URL on `tag=frappe`.
- The nav Home control from a filtered hub landed on `/#home` with the insight params removed.
- No page errors.

## Review

A separate review of `e9d0b5b..afd7057` found no critical issues and three important ones. All three are fixed on this branch:

1. A `#` talk link cleared `#insights` and stranded the filter. Clicks on non-http links are cancelled. The markup test still sees `href="#"` and no `target="_blank"`.
2. Only “Back to Homepage” cleared the query. Any hash other than `#insights` now goes through `locationAfterInsightsExit`. The command menu also leaves the hub via `#home` before scrolling to a homepage section.
3. A selected tag could remain in state after its chip vanished. `visibleInsightTags` keeps that tag with a count of 0.

Also in that pass: the search field has `maxLength={120}` and a focus-within border, the idle view no longer says “23 results” above an unfiltered editorial page, and the README search section sits after the contact secrets instead of between them.

## Limits

- Ranking is substring inclusion, not stemming. `ml` matches the tag `ml` and any folded field that contains those letters; it does not match the words “machine learning” unless those letters appear contiguously.
- Talk slides are still `#`. The click no longer navigates away, and it also does not open a deck.
- The in-page click guard and the hash-exit helper are unit-tested. The browser pass above is not part of `npm test`.
- The main JavaScript chunk was already over 500 kB. This change did not split it further.
