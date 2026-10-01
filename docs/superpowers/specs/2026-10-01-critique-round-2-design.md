# Design: Critique Round 2 — P2 Fixes and Remaining Gaps

Date: 2026-10-01
Status: approved (in-chat design, Approach A — one surgical plan)
Follows: `docs/superpowers/plans/2026-09-30-p1-critique-fixes.md` (P1 round, complete)

## Context

The P1 round (11 tasks) fixed all three P1 issues from
`.impeccable/critique/2026-10-01T01-45-25Z__src-app-page-tsx.md`. This round
clears the remaining P2 issues, minor observations, and persona content gaps
from the same critique. One plan, same subagent-driven workflow.

## Scope (approved)

### 1. Type & copy (P2 #5)

- Load **Inter** via `next/font/google` in `src/app/layout.tsx` (variable weight,
  self-hosted, no layout shift). Wire CSS variables so `--font-body` and
  `--font-display` resolve to Inter (display = Inter with tighter tracking, not a
  second family).
- Body base 16px. Raise all 11–12px text to ≥13px (target: no text below 13px).
- H1 tracking `-0.06em → -0.02em`, line-height ≈ 1.1.
- Fix typos: "Glimps of Problems Solved" → "Glimpse of Problems Solved"
  (Hero.tsx:187); "across a across a" → "across a" (resumedata.ts:128).
- Rewrite the About copy around one concrete claim (draft in plan, user approves
  before implementation ships). Replace the footer joke line
  ("Designed to feel more like a modern product launch than a resume dump")
  with a concrete line.
- Out of scope: `hero.headline` swap (H1 is now the name), second webfont.

### 2. Motion remainder (P2 #4)

- Wrap the app in `<MotionConfig reducedMotion="user">` in layout.tsx.
- Delete Hero's floating orbs / infinite framer loops (Hero.tsx:64-175 region);
  keep exactly one entrance moment (hero header above the fold).
- Fix carousel height swing (766–813px) with a fixed min-height on the card
  container so the CTA row does not jump.
- Fix the hydration warning on `<header>` under reduced motion (Navbar.tsx:73).
- Keep InteractiveBackdrop (already reduced-motion aware).

### 3. Cascade fix + dead code (minor observations)

- Delete unlayered `a { color: inherit; }` (globals.css:47-49). Preflight's
  layered rule remains. Then delete all `!text-*` Tailwind-importance patches
  it forced (~19 across Navbar.tsx, Hero.tsx, Contact.tsx) and verify anchor
  colors are correct (inactive nav = secondary text, "View Project" = sky-200).
- Delete dead files: `src/components/LinkedInEmbeds.tsx`,
  `src/components/DynamicGlyph.tsx` (zero importers).
- Delete unused data exports: `about`, `skills` from resumedata.ts (no
  importers); delete unused `hero.headline` field (keep `hero` itself — Hero
  imports it).
- Delete 3 unreferenced images: `public/images/hero_background.jpg`,
  `public/images/logo.png`, `public/images/logo1.png` (~1.1MB). Keep
  `profile.png` (referenced).
- Fix the orphaned 7th numbered experience bullet: inspect the numbered list in
  Experience.tsx — if bullet 7 duplicates another, fold it in; otherwise adjust
  the numbering/structure so no single item sits alone as an orphan.

### 4. Metadata (domain-dependent parts excluded per user)

- Favicon: resize `public/images/logo.png` with macOS `sips` →
  `src/app/icon.png` (≤128px). Kills the `/favicon.ico` 404.
- Give `/projects` its own `<title>` via the page `metadata` export (currently
  shares the home title).
- Out of scope: OG/Twitter tags, robots, sitemap, canonical (need production
  domain).

### 5. Content: Education + gap

- Add an Education block inside the **About** section (no new nav item,
  no new page):
  - MSc Information Technology and Management
  - University of Texas at Dallas, Aug 2022 – May 2024
  - Scholar with High Distinction
- Data lives in `resumedata.ts` (`education` export), rendered by About.tsx.
- Its dates explain the Jul 2022 – Aug 2024 experience gap; no separate gap
  note.
- The 16 linkless archive projects stay linkless (existing `startsWith("http")`
  guard already hides dead CTAs).

### 6. SSR opacity

- Remove `initial: { opacity: 0 }` from below-fold section-level motion
  wrappers so content is visible without JS (critique: 14 elements ship
  invisible). Keep the single above-fold hero entrance.

## Constraints

- No new dependencies except Inter (via `next/font`, ships with Next).
- No new pages. Education folds into About.
- No domain-dependent metadata.
- No P2 scope beyond this list.

## Verification

- `npm run build` passes.
- Browser pass: desktop + 390px (no overflow, type ≥13px), reduced-motion
  (nothing moves), JS-off sanity (below-fold content visible), favicon 200,
  /projects title distinct, anchor colors correct without `!text-*` patches.
- Task-scoped reviews + final whole-branch review, same as the P1 round.
