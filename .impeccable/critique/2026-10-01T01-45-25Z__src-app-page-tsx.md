---
target: portfolio website (home + /projects)
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
timestamp: 2026-10-01T01-45-25Z
slug: src-app-page-tsx
---
# Critique: portfolio website (home + /projects)

Method: dual-agent (A: design review, B: detector + browser evidence), plus a parent source audit, a production build of a copy, and runtime computed-style checks. Surface mode: Experience (portfolio).

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Active-nav pill and aria-current are good. Contact never highlights on viewports taller than about 1,070px (useScrollSpy.ts:18-27). Mobile-menu jumps land 332px late. |
| 2 | Match System / Real World | 3 | Skills (2,356px incl. About) precede Experience. "Glimps" typo in the first viewport (Hero.tsx:179). |
| 3 | User Control and Freedom | 2 | Carousel auto-advances every 7.0s with no pause on hover or focus. Mobile menu ignores Esc and outside tap. |
| 4 | Consistency and Standards | 3 | One coherent visual system, but 19 `!important` text-color overrides patch a cascade bug. |
| 5 | Error Prevention | 3 | `startsWith("http")` guard is good. 1 of 24 repo links 404s, 16 of 40 projects have no link. |
| 6 | Recognition Rather Than Recall | 3 | Skill list hidden behind a flip; roles 2-3 collapsed; 10px unlabeled-state dots. |
| 7 | Flexibility and Efficiency | n/a | Read-once portfolio; no expert accelerators expected. |
| 8 | Aesthetic and Minimalist Design | 2 | 17 backdrop-blur surfaces, 8 infinite loops, 72-144px decoration against 14px evidence. Filler copy. |
| 9 | Error Recovery | 2 | Default white Next 404 with no link home. Dead repo link. No copy-email fallback. |
| 10 | Help and Documentation | n/a | No tasks to document. |
| **Total** | | **21/32 (66%)** | **Acceptable** |

Heuristics 7 and 10 scored n/a; maximum renormalised to 32.

## Design Specificity Verdict

Interchangeable. Swap the name and copy and roughly 85% ships on any AI engineer's portfolio: navy with sky/amber glow, fixed pointer-follow backdrop, grid and three mesh orbs, pill eyebrow plus condensed H2 plus grey subtitle on every section, bobbing cards, a 3D flip card and a word cloud. What is authored: the STAR content and the signature-name idea. The signature depends on whatever script font the OS has (globals.css:294) and all type is system fonts. The footer states the intent ("more like a modern product launch than a resume dump"). The work (fan-out/fan-in ingestion, RAG pipelines, traceability) has no visual motif anywhere.

Deterministic scan: CLI `detect.mjs src/` found 1 advisory (codex-grid-background, globals.css:57, the `.page-shell::before` grid); markup-only scan clean. Browser scan: 190 elements / 221 findings on home. About 118 of 137 low-contrast hits are false positives (the detector assumed white behind the gradient body background). Real: about 19 `--text-muted` #708198 hits at 3.99-4.35:1 at 11-12px. Verified true: dark-glow x6, ai-color-palette 24, radial-spotlight-glow 14, nested-cards 27, kicker-above-heading x5, oversized h1 (72px, 77 chars), -0.06em tracking, 100-105 character line length, header transition on padding/border-radius.

## Overall Impression

Strong evidence, weak presentation. The STAR scenarios are specific and quantified, but they rotate in a 14px grey card that leaves after 7 seconds, while 144px "AI" and a 373px signature panel take the visual weight. Biggest opportunity: let the work lead.

## What's Working

1. STAR scenarios (resumedata.ts:17-83, Hero.tsx:181-257): specific, quantified (15-20 min to 1-2 min, 30-40% to 85-90% coverage, 8K to 2K tokens), structured S/T/A/R with an impact chip. The one authored thing on the page.
2. Conversion path: sticky gradient Resume CTA (Navbar.tsx:184-196); Contact has one primary action, an availability signal and three labelled link cards (Contact.tsx:39-85).
3. Nav and archive craft: labelled nav with aria-current and correct scroll-mt offsets; /projects is the cleanest IA on the site (one decision, GenAI first).

## Priority Issues

1. [P1] The work never leads. Evidence is the smallest, dimmest type (134 of 291 text runs are 14px #9fb0c8) while decoration is 72-144px. No project has a screenshot, diagram or outcome; featured five are Streamlit/Ollama repos; 16 of 40 archive items have no link and `my-kurta-desiner` 404s. STAR cards carry no employer or date. Primary CTAs sit at y~1,222 on desktop. Why: a recruiter cannot verify anything in 90 seconds. Fix: one-line name/role/location header instead of the banner; first-fold proof strip of three STAR numbers tagged with employer and year; architecture diagram or GIF plus one-line outcome per featured project; reorder to Experience, Projects, Skills, About; delete duplicated and filler blocks (Experience.tsx:97-99, 103-108, 129-132). Command: /impeccable layout.
2. [P1] Mobile breaks the nav and the signature interactions. At 390px, 26 of 39 cloud words overlap; the flipped face holds 3,390px in a 940px card (nested scroll); the in-flow header makes the open menu add 332px so anchor jumps land at -204px instead of +128px; the Contact grid lacks `grid-cols-1 min-w-0`, so link cards overflow at 390, clip at 360 and cut the email at 320 (Contact.tsx:37). Why: a phone is where a LinkedIn click lands. Fix: default Skills to the grouped list; overlay menu that closes before scrolling; `grid-cols-1 min-w-0 break-all` on Contact; 44px targets; shorter hero card on small screens. Command: /impeccable adapt.
3. [P1] Keyboard and assistive-tech access fails where it matters. No skip link (layout.tsx:16-22). The flipped-away face stays in the tab order and a11y tree (no `inert`, verified at runtime). Focus lands under the sticky header (no `scroll-padding-top`). Accordions (Experience.tsx:69) and category filters (projects/page.tsx:93) expose no state. Carousel has no pause or live region. Mobile menu ignores Esc. The name is `role="img"`, not a heading. Fix: skip link, `inert` on the hidden face, aria-expanded/aria-pressed, scroll-padding-top, Esc handler, 24px+ targets, make the name the H1. Command: /impeccable harden.
4. [P2] Perpetual motion ignores reduced motion and fights reading. 8 infinite framer loops (Hero.tsx:64-175, NameBanner.tsx:37-45) never read reduced motion; verified under `reduce` that everything still moves and the carousel still advances. Carousel height swings 766-813px, so the CTA row jumps 52px every tick. WCAG 2.2.2 failure; also a hydration warning on `<header>` under reduce (Navbar.tsx:73). Fix: delete floats/orbs/tilt, make the carousel user-driven or a static list, wrap the app in `MotionConfig reducedMotion="user"`, keep one entrance moment. Command: /impeccable quieter.
5. [P2] Borrowed type and template copy leak credibility. Display font is Apple-only (globals.css:4-5); H1 at -0.06em with line-height 1 makes letter pairs touch; about 25% of text is 11-12px; About copy is generic; shipped H1 is weaker than the unused `hero.headline`; typos "Glimps" and "across a across a"; footer joke. Fix: one webfont via next/font, H1 near -0.02em, 16px body, rewrite About around one concrete claim, fix typos, replace the footer line. Command: /impeccable typeset.

## Persona Red Flags

Dana (time-pressed recruiter, 90 seconds): first 900px at 1440x900 hold the signature panel (41%), a 12px #708198 "AI ENGINEER", an H1 cut at y=917 and no employer, title or dates. The current role (Kaya Global, Feb 2025-) first appears about 4,330px down (about 6,640px on a phone). Skills default to a 39-word cloud; the real list is behind "Show Categories". Role Snapshot repeats bullet 1; "Strength" is identical filler on every role. No Education section and an unexplained 25-month gap (Jul 2022 to Aug 2024).

Sam (keyboard / screen reader): no skip link, invisible tab stops on the hidden flip face, focus obscured by the sticky header, no state on accordions or filters, autoplay with no pause, 10px dots, both flip faces and 39 unlabeled cloud spans in the accessibility tree.

Casey (distracted phone user): 16.7 screens of scroll, word-cloud collisions, a nested 3,390px scroller, a menu that lands 332px late, top-right hamburger, 10px dots, Contact cards clipped at 360, first CTA three screens down.

## Minor Observations

- Root cause of the `!important` patching: `a { color: inherit; }` at globals.css:47-49 is unlayered, so it beats every Tailwind v4 `text-*` utility on anchors. Verified at runtime: inactive nav link computes rgb(239,246,255) instead of the intended secondary; "View Project" ignores `text-sky-200`. Tailwind preflight already sets this rule inside `@layer base`, so deleting it fixes 19 overrides in Hero, Navbar, Skills, Contact.
- No favicon (404), no OG/Twitter tags, `/projects` shares the home title, no robots/sitemap.
- SSR ships hero and sections at `opacity:0` until hydration (14 elements); with JS off most sections are invisible.
- Contact never highlights on tall viewports; Home/logo leaves the banner 229px above the viewport.
- Dead code and data: `proofPoints`, LinkedInEmbeds, DynamicGlyph, unused `about` / `skills` / `hero.headline` exports (README says content lives there), 3 unreferenced images (about 1.1MB).
- The back face says "6 Focus Areas" on all nine cards; 7 numbered experience bullets leave an orphan.

## Questions to Consider

- If the reader keeps one number from the first 900px, which one, and why is it in a card that rotates?
- What does the site look like if the Zephyr ingestion pipeline is the hero, as a diagram rather than a signature?
- Which of the 17 blurred surfaces and 8 loops would you delete without anyone noticing?
- Would you feature a project a peer cannot open (16 of 40; 1 dead)?
- Why does an engineer's skill list hide behind a flip while a 144px "AI" sits in front of it?
