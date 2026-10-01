# Critique Round 2 (P2 Fixes) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clear the remaining P2 issues, minor observations, and content gaps from the `.impeccable` critique (2026-10-01): type/copy, motion remainder, cascade + dead code, favicon/title, Education block, SSR opacity.

**Architecture:** Surgical edits to the existing Next.js 15 + Tailwind v4 + framer-motion portfolio. One shared stylesheet fix (cascade) unblocks deleting ~19 `!text-*` patches; Inter lands via `next/font`; below-fold sections become static server-rendered markup; Education folds into the existing About section as data + one card.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4, framer-motion, next/font (Inter)

**Spec:** `docs/superpowers/specs/2026-10-01-critique-round-2-design.md`

## Global Constraints

- No new dependencies except Inter via `next/font` (ships with Next).
- No new pages. (`src/app/projects/layout.tsx` is a layout, not a page — permitted for the per-route title.)
- No domain-dependent metadata (no OG/sitemap/robots/canonical).
- No scope beyond the spec's six sections. P2 items not in the spec stay untouched.
- No text below 13px anywhere after Task 2.
- Exactly one hero entrance moment remains after Task 3 (Hero column entrances); no other framer loops.
- Verification is `npm run build` + browser checks (project has no test framework — recorded ruling).
- **Never run `npm run build` while `next dev` is running** (it clobbers `.next` under the dev server). Stop dev first.
- Each task stages only its own listed files.

---

### Task 1: Kill the cascade root cause and its `!text-*` patches

**Files:**
- Modify: `src/styles/globals.css:47-49`
- Modify: `src/components/Navbar.tsx` (lines 149, 172, 184, 203, 206, 209, 261, 274)
- Modify: `src/components/Hero.tsx:297`
- Modify: `src/components/Contact.tsx:51`

**Interfaces:**
- Consumes: Tailwind v4 preflight already ships `a { color: inherit }` inside `@layer base`.
- Produces: anchors obey Tailwind `text-*` utilities; no `!text-*` tokens remain in `src/`.

- [ ] **Step 1: Delete the unlayered rule in globals.css**

Remove exactly this block (currently lines 47-49):

```css
a {
  color: inherit;
}
```

- [ ] **Step 2: Downgrade `!text-*` to plain utilities**

The `!` (Tailwind important modifier) only existed to beat the unlayered rule. Preflight's layered rule loses to utilities, so plain classes now win.

In `Navbar.tsx`, replace every `!text-black` with `text-black`, `hover:!text-black` with `hover:text-black`, `focus-visible:!text-black` with `focus-visible:text-black` (8 locations: lines 149, 172, 184, 203×3, 206, 209, 261, 274).

In `Hero.tsx:297` replace `!text-slate-950`, `hover:!text-slate-950`, `focus-visible:!text-slate-950` with `text-slate-950`, `hover:text-slate-950`, `focus-visible:text-slate-950`.

In `Contact.tsx:51` same three replacements for `!text-slate-950`.

- [ ] **Step 3: Verify no patches remain**

Run: `rg '!text-' src/ --glob '*.tsx'`
Expected: no matches that are CSS important-modifiers (JS negations like `!isMenuOpen`, `!ref` are fine — an empty result or only JS negations is a pass).

- [ ] **Step 4: Build**

Run: `npm run build` — must pass.

- [ ] **Step 5: Browser color check**

Start dev (`npm run dev -- --port 3222`), then verify with computed styles:
- inactive desktop nav link color = `rgb(159, 176, 200)` (was `rgb(239,246,255)` — the bug)
- active nav pill link text = `rgb(0, 0, 0)`
- "Open Resume" CTA text = `rgb(0, 0, 0)`
- "Explore Projects" / "Start a Conversation" text = `rgb(2, 6, 23)` (slate-950)

Stop the dev server after checking.

- [ ] **Step 6: Commit**

```bash
git add src/styles/globals.css src/components/Navbar.tsx src/components/Hero.tsx src/components/Contact.tsx
git commit -m "fix: drop unlayered a{color:inherit} and its important text patches"
```

---

### Task 2: Inter via next/font, 13px floor, sane tracking

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/styles/globals.css`
- Modify: `src/components/NameBanner.tsx:10`
- Modify: `src/components/Hero.tsx:95` and `:79`
- Modify: `src/components/Section.tsx:42`
- Modify: `src/app/projects/page.tsx:73` and `:76`

**Interfaces:**
- Produces: `--font-inter` CSS variable (set by next/font on `<html>`); `--font-body`/`--font-display` resolve to Inter; Tailwind `text-xs` = 13px.

- [ ] **Step 1: Load Inter in layout.tsx**

```tsx
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
```

Change the html element to carry the variable:

```tsx
<html lang="en" className={inter.variable}>
```

(Variable must be on `<html>` so `:root`'s `--font-body: var(--font-inter), …` resolves on the same element.)

- [ ] **Step 2: Point font vars at Inter in globals.css**

Replace lines 4-5:

```css
  --font-body: var(--font-inter), "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  --font-display: var(--font-inter), "Trebuchet MS", sans-serif;
```

- [ ] **Step 3: Raise text-xs to 13px (Tailwind v4 theme override)**

Add immediately after `@import "tailwindcss";`:

```css
@theme {
  --text-xs: 0.8125rem;
  --text-xs--line-height: 1.4615;
}
```

- [ ] **Step 4: Replace the three `text-[11px]` literals with `text-xs`**

- `Section.tsx:42`: `text-[11px]` → `text-xs`
- `Hero.tsx:79`: `text-[11px]` → `text-xs`
- `projects/page.tsx:73`: `text-[11px]` → `text-xs`

- [ ] **Step 5: Fix tracking on all headings that are tighter than -0.02em**

- `NameBanner.tsx:10` h1: `tracking-[-0.03em]` → `tracking-[-0.02em]`
- `Hero.tsx:95` h2: `tracking-[-0.06em]` → `tracking-[-0.02em]`
- `projects/page.tsx:76` h1: `tracking-[-0.05em]` → `tracking-[-0.02em]`

(Section.tsx h2 keeps its `-0.04em` — sizes there are smaller; spec only mandates the display headings.)

- [ ] **Step 6: Verify no sub-13px text remains**

Run: `rg 'text-\[[0-9]+px\]' src/`
Expected: no matches with a value below 13. Run: `rg 'text-\[1[0-2]px\]' src/` → empty.

- [ ] **Step 7: Build + browser check**

`npm run build` passes (first run downloads Inter). Then in the browser: `getComputedStyle(document.body).fontFamily` contains the `__Inter_` token; no layout overflow at 390px; heading letters do not touch.

- [ ] **Step 8: Commit**

```bash
git add src/app/layout.tsx src/styles/globals.css src/components/NameBanner.tsx src/components/Hero.tsx src/components/Section.tsx src/app/projects/page.tsx
git commit -m "type: load Inter via next/font, floor text at 13px, relax display tracking"
```

---

### Task 3: Kill remaining loops, add MotionConfig, de-animated header

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Navbar.tsx:86-94, 291`
- Delete: `src/hooks/usePointerParallax.ts`

**Interfaces:**
- Produces: `<MotionConfig reducedMotion="user">` wrapping the app; Hero has no parallax/orbs/bobs; `Navbar` header is a plain `<header>` (hydration warning gone); exactly one entrance moment (Hero column entrances at lines 60-63 and 166-169) remains.

- [ ] **Step 1: Wrap the app in MotionConfig (layout.tsx)**

```tsx
import { MotionConfig } from "framer-motion";
```

Wrap the skip link and `{children}` inside `<body>`:

```tsx
<MotionConfig reducedMotion="user">
  <a href="#main-content" …>Skip to content</a>
  {children}
</MotionConfig>
```

- [ ] **Step 2: Delete parallax + orbs from Hero.tsx**

- Remove import of `usePointerParallax` (line 15) and `useTransform` from the framer import (line 4 → `import { motion } from "framer-motion";`).
- Delete the hook destructure + all five `useTransform` calls (lines 24-31).
- Remove `onPointerMove={handlePointerMove}` and `onPointerLeave={handlePointerLeave}` from the `<section>` (lines 46-47).
- Delete the two decorative orb `motion.div`s (lines 49-58).
- On the left column `motion.div` (line 60): remove `style={{ x: leftX, y: leftY }}` (keep `initial`/`animate`/`transition` entrance).
- On the right column `motion.div` (line 166): remove `style={{ x: rightX, y: rightY }}` (keep entrance).
- Convert the three bobbing "What I Optimize For" cards (lines 109-161): `motion.div` → `div`, delete their `animate` + `transition` props.
- Convert the right-card float (lines 173-175): `motion.div` → `div`, delete `animate` + `transition`.
- Convert the drifting badge orb (lines 179-183): `motion.div` → `div`, delete `animate` + `transition`.

- [ ] **Step 3: Delete the hook file**

```bash
git rm src/hooks/usePointerParallax.ts
```

(Only Hero imported it. Verify: `rg usePointerParallax src/` → empty.)

- [ ] **Step 4: Plain header in Navbar.tsx**

Replace `motion.header` with `header` — delete `initial`, `animate`, `transition` props (lines 87-92), close with `</header>` (line 291). Keep `className="sticky top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4"`. The inner scroll-scale `motion.div` stays (SSR-safe: no `initial` prop). This removes the reduced-motion hydration mismatch.

- [ ] **Step 5: Build + reduced-motion check**

`npm run build` passes. In the browser with `prefers-reduced-motion: reduce` emulated: hero optimize-for cards and the scenario card do not move over a 3s sample; console has no hydration warning.

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx src/components/Hero.tsx src/components/Navbar.tsx src/hooks/usePointerParallax.ts
git commit -m "motion: remove orbs parallax and bobs, gate app with MotionConfig, plain header"
```

---

### Task 4: Below-fold content renders without JS

**Files:**
- Modify: `src/components/Section.tsx`
- Modify: `src/components/Experience.tsx:24-30`
- Delete: `src/hooks/useReveal.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `Section` is a static server component (no hooks); Experience cards render visible in SSR HTML; `useReveal` deleted.

- [ ] **Step 1: Make Section.tsx static**

Section currently animates `motion.div` with `initial={{ opacity: 0, y: 28 }}` gated on `useReveal` — SSR ships it invisible. Rewrite:

```tsx
import Section from ... (no "use client", no framer, no useReveal)

export default function Section({ id, eyebrow, title, subtitle, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden px-6 py-24 sm:px-8 lg:px-10 ${className ?? ""}`}
    >
      <div className="section-fade" aria-hidden />
      <div className="relative mx-auto max-w-6xl">
        {/* identical header markup: mb-14 flex … eyebrow/h2/subtitle */}
        <div>{children}</div>
      </div>
      <div className="absolute bottom-0 left-0 w-full px-6 sm:px-8 lg:px-10">
        <div className="section-divider mx-auto max-w-6xl" />
      </div>
    </section>
  );
}
```

Delete `"use client"`, the `motion` import, the `useReveal` import, and the `const { ref, isVisible } = useReveal();` line; drop `ref={ref}` from the section element. All child markup (eyebrow pill, h2, subtitle) stays byte-identical.

- [ ] **Step 2: Static Experience cards**

In `Experience.tsx`, change `motion.article` → `article` and delete `initial`, `whileInView`, `viewport`, `transition` props (lines 26-29). Keep `key`, `className`, and the whole `AnimatePresence` expand block (interactive, `initial={false}`, SSR-safe).

- [ ] **Step 3: Delete the hook**

```bash
git rm src/hooks/useReveal.ts
```

Verify: `rg useReveal src/` → empty.

- [ ] **Step 4: SSR proof**

`npm run build` then `npm run start` (or dev), and check raw HTML:

Run: `curl -s http://localhost:PORT/ | rg -c 'opacity:0'`
Expected: the only remaining `opacity:0` occurrences are the Hero entrance columns (above-fold, allowed). None inside section/experience card markup.

- [ ] **Step 5: Commit**

```bash
git add src/components/Section.tsx src/components/Experience.tsx src/hooks/useReveal.ts
git commit -m "fix: render below-fold sections and experience cards without JS"
```

---

### Task 5: Stable STAR card height (kill CTA row jump)

**Files:**
- Modify: `src/components/Hero.tsx:189` (the scenario card div)

**Interfaces:**
- Consumes: Task 3's Hero structure (locate by content, not line numbers — orbs/parallax deletions shift lines).
- Produces: scenario card carries `sm:min-h-[X]` where X is measured, so the CTA row's viewport Y never changes when switching scenarios.

- [ ] **Step 1: Measure the actual symptom (CTA row jump)**

Start the dev server. At 1440×900, click each of the 5 dots in turn (wait 500ms after each) and record the CTA row's viewport top:

```js
// run after each dot click — CTA row = the flex container of Explore Projects/Resume buttons
Math.round(document.querySelector('a[href="#projects"]').closest('div.flex').getBoundingClientRect().top)
```

Note the spread (max − min). Also record the scenario card heights (the `div.rounded-[1.5rem]` wrapping the S/T/A grid — climb two `.parentElement`s from a dot button). Tallest card height = the value for Step 2.

- [ ] **Step 2: Set the min-height**

Add `sm:min-h-[TALLESTpx]` (rounded up to the next 8px) to that card's className. Below `sm` no min-height (S/T/A are hidden there, content is short and stable).

Example: if heights are 318/341/330/352/326 → `sm:min-h-[352px]`.

- [ ] **Step 3: Re-measure**

Re-run Step 1. Expected: identical height for all 5 scenarios at ≥640px; CTA row Y delta = 0. Check 390px still has no overflow.

- [ ] **Step 4: Build + Commit**

```bash
# stop dev server first
npm run build
git add src/components/Hero.tsx
git commit -m "fix: hold STAR card height so the CTA row never jumps"
```

---

### Task 6: Favicon + distinct /projects title

**Files:**
- Create: `src/app/icon.png` (resized from `public/images/logo.png`, which still exists — the purge is Task 7)
- Create: `src/app/projects/layout.tsx`

**Interfaces:**
- Produces: `/icon.png` served by the app router as the favicon; `metadata.title = "Projects | Dhawal Panchal"` for the /projects route.

- [ ] **Step 1: Generate the icon**

```bash
sips -Z 128 public/images/logo.png --out src/app/icon.png
```

(`sips` is macOS built-in; verifies: `sips -g pixelWidth -g pixelHeight src/app/icon.png` → 128 max dimension.)

- [ ] **Step 2: Create the route layout**

`src/app/projects/layout.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Dhawal Panchal",
  description:
    "Archive of projects across GenAI, machine learning, cloud, data analytics, and full-stack development.",
};

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
```

(The page itself is `"use client"` — metadata must live on a server layout, not the page. This is a layout, not a new page; allowed per spec note.)

- [ ] **Step 3: Verify**

`npm run build`, start server:
- `curl -s http://localhost:PORT/projects | rg '<title>'` → `Projects | Dhawal Panchal`
- HTML contains `<link rel="icon"` pointing at the icon
- `curl -s -o /dev/null -w "%{http_code}" http://localhost:PORT/icon.png` → 200
- browser console: no `/favicon.ico` 404

- [ ] **Step 4: Commit**

```bash
git add src/app/icon.png src/app/projects/layout.tsx
git commit -m "feat: favicon from logo and distinct /projects page title"
```

---

### Task 7: Dead code and unused assets purge

**Files:**
- Delete: `src/components/LinkedInEmbeds.tsx`
- Delete: `src/components/DynamicGlyph.tsx`
- Modify: `src/data/resumedata.ts` (`about`, `skills` exports; `hero.headline`, `hero.tags`)
- Delete: `public/images/hero_background.jpg`, `public/images/logo.png`, `public/images/logo1.png`

**Interfaces:**
- Produces: resumedata exports = `site`, `hero` (subheadline only), `starScenarios`, `experience`, `education` (added in Task 10), and whatever else remains referenced.

- [ ] **Step 1: Confirm zero importers, then delete components**

Run: `rg 'LinkedInEmbeds|DynamicGlyph' src/` → matches only the files themselves.
```bash
git rm src/components/LinkedInEmbeds.tsx src/components/DynamicGlyph.tsx
```

- [ ] **Step 2: Trim resumedata.ts**

- Delete the entire `export const about = [ … ]` block — no importers (`rg 'from "@/data/resumedata"' src/` shows no `about`).
- Delete the entire `export const skills = { … }` block — Skills.tsx defines its own groups.
- In `export const hero`, delete the `headline:` and `tags:` lines (unused: `rg 'hero\.(headline|tags)|\.tags' src/` → empty). Keep `subheadline` (Hero uses it).

- [ ] **Step 3: Confirm images unreferenced, then delete**

Run: `rg 'hero_background|logo1|logo\.png' src/` → empty (only `profile.png` is referenced; `src/app/icon.png` is a copy, not a reference).

```bash
git rm public/images/hero_background.jpg public/images/logo.png public/images/logo1.png
```

- [ ] **Step 4: Build**

`npm run build` passes (no dangling imports).

- [ ] **Step 5: Commit**

```bash
git add -A src/components src/data/resumedata.ts public/images
git commit -m "chore: remove dead components, unused data exports, and unreferenced images"
```

---

### Task 8: Typos and concrete footer line

**Files:**
- Modify: `src/data/resumedata.ts:128` (accenture/CSA bullet — anchor by content, line numbers may have shifted)
- Modify: `src/components/Hero.tsx:187`
- Modify: `src/components/Footer.tsx:6`

**Interfaces:** none.

- [ ] **Step 1: Fix the duplicated words**

In resumedata.ts, in the bullet starting "Architected and implemented a secure authentication…":

`…security across a across a full-stack web platform.` → `…security across a full-stack web platform.`

- [ ] **Step 2: Fix the first-viewport typo**

Hero.tsx: `Glimps of Problems Solved` → `Glimpse of Problems Solved`

- [ ] **Step 3: Replace the footer joke line**

Footer.tsx line 6:

```tsx
<p>Built by Dhawal Panchal with Next.js, Framer Motion, and Tailwind CSS.</p>
```

- [ ] **Step 4: Verify + Commit**

Run: `rg 'Glimps of|across a across|resume dump' src/` → empty. `npm run build` passes.

```bash
git add src/data/resumedata.ts src/components/Hero.tsx src/components/Footer.tsx
git commit -m "fix: typos and a concrete footer line"
```

---

### Task 9: Rewrite About copy around concrete work

**Files:**
- Modify: `src/components/About.tsx:18` (subtitle) and `:39-50` (Perspective paragraphs)

**Interfaces:** none (consumes nothing from other tasks; Task 10 inserts below this block).

- [ ] **Step 1: Replace the subtitle**

```tsx
subtitle="I turn AI prototypes into systems teams can operate — most recently shipping agentic workflows and RAG pipelines for production products at Kaya Global in Dallas."
```

- [ ] **Step 2: Replace the two Perspective paragraphs**

Inside the `<div className="mt-5 space-y-5 …">`:

```tsx
<p>
  At Kaya Global I build the platform behind production GenAI features: FastAPI
  services, vector retrieval with pgvector and FAISS, and prompt orchestration
  that cut LLM response latency from minutes to seconds.
</p>
<p>
  Before that I shipped full-stack products and enterprise integrations —
  OAuth2/JWT authentication, event-driven AWS Lambda pipelines, and test
  analytics adopted across teams at Accenture. The through-line is consistent:
  clear architecture, measurable outcomes, software people use.
</p>
```

Leave the section `title`, `principles` array, and image card unchanged.

- [ ] **Step 3: Verify + Commit**

Build passes; browser shows the new copy, no layout break at 390px.

```bash
git add src/components/About.tsx
git commit -m "copy: rewrite About around concrete production work"
```

---

### Task 10: Education block in About

**Files:**
- Modify: `src/data/resumedata.ts` (add export after `experience`)
- Modify: `src/components/About.tsx` (new card in the right column)

**Interfaces:**
- Produces: `export const education = { degree, school, period, honors }` — consumed by About.tsx in this same task.

- [ ] **Step 1: Add the data export**

```ts
export const education = {
  degree: "MSc Information Technology and Management",
  school: "University of Texas at Dallas",
  period: "Aug 2022 – May 2024",
  honors: "Scholar with High Distinction",
};
```

- [ ] **Step 2: Import and render the card**

In About.tsx add `import { education } from "@/data/resumedata";`.

Insert a new card **between** the Perspective card (`</div>` closing the `surface-card rounded-[2rem] p-7` block) and the `<div className="grid gap-4 sm:grid-cols-3">` principles block:

```tsx
<div className="surface-card rounded-[2rem] p-7">
  <p className="text-sm uppercase tracking-[0.26em] text-sky-200/80">
    Education
  </p>
  <div className="mt-5 space-y-1">
    <p className="text-base font-semibold text-white">{education.degree}</p>
    <p className="text-base text-[var(--text-secondary)]">{education.school}</p>
    <p className="text-sm text-[var(--text-muted)]">
      {education.period} · {education.honors}
    </p>
  </div>
</div>
```

- [ ] **Step 3: Verify**

Build passes. Browser: Education card visible in About at desktop and 390px; dates `Aug 2022 – May 2024` sit between Accenture (`Jul 2019 – Jul 2022`) and CSA (`Aug 2024 – Feb 2025`) — gap self-explains. No new nav item.

- [ ] **Step 4: Commit**

```bash
git add src/data/resumedata.ts src/components/About.tsx
git commit -m "feat: add education to About, closing the resume gap question"
```

---

### Task 11: Even out the experience bullet grid (odd last item)

**Files:**
- Modify: `src/components/Experience.tsx:95-110` (points grid)

**Interfaces:** none.

- [ ] **Step 1: Span the orphan**

Role 1 (Kaya) has 7 points; the 2-column grid leaves the 7th alone in the last row. In the points map, make the last item span both columns when the count is odd:

```tsx
<div
  key={point}
  className={`rounded-[1.4rem] border border-white/[0.08] bg-white/[0.04] px-4 py-4 ${
    pointIndex === item.points.length - 1 && item.points.length % 2 === 1
      ? "sm:col-span-2"
      : ""
  }`}
>
```

- [ ] **Step 2: Verify**

Build passes. Open the Kaya accordion at ≥640px: 7th card spans the full grid width; other roles (3 and 4 points) render as before (4 → two full rows; 3 → row of 2 + full-width last card, which also fixes their orphan).

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience.tsx
git commit -m "fix: span the last experience bullet when the grid count is odd"
```

---

### Task 12: Final verification pass

**Files:** none (read-only audit; fixes, if any, get their own task).

**Interfaces:** none.

- [ ] **Step 1: Build**

Stop any dev server. `npm run build` — must pass.

- [ ] **Step 2: Grep audits**

- `rg '!text-' src/ --glob '*.tsx' | rg 'text-'` → empty
- `rg 'text-\[[0-9]+px\]' src/` → no values < 13
- `rg 'repeat: Infinity' src/components/Hero.tsx` → empty
- `rg 'useReveal|usePointerParallax|LinkedInEmbeds|DynamicGlyph' src/` → empty
- `rg 'Glimps of|across a across|resume dump' src/` → empty
- `rg 'hero_background|logo1' src/ public/ -l` → empty (logo.png gone; icon.png exists)

- [ ] **Step 3: Browser acceptance pass** (desktop 1440×900 + 390px + reduced-motion)

- body font = Inter (computed font-family contains `__Inter_`)
- all text ≥13px (spot-check eyebrow pills, scenario labels, footer)
- no `!important`-dependent colors: nav inactive secondary, CTAs dark-on-gradient
- reduced motion: nothing bobs/floats (sample transforms over 3s)
- CTA row Y identical across all 5 scenarios (≥640px)
- Education card present; gap sequence reads Accenture → MSc → CSA → Kaya
- About shows concrete copy; footer shows new line
- `/projects` title distinct; `/icon.png` 200; no favicon 404
- Experience role 1: 7th bullet spans both columns
- no horizontal overflow at 390px
- `curl -s / | rg -c 'opacity:0'` → only the 2 hero entrance columns

- [ ] **Step 4: Scope audit**

`git diff --stat $(git merge-base main HEAD)..HEAD` — only files named by Tasks 1-11 appear; no P2 drive-bys.

- [ ] **Step 5: No commit** (read-only pass; ledger the results and dispatch the final whole-branch review).
