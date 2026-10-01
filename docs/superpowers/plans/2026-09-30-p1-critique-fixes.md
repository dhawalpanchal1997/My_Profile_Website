# P1 Critique Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the three P1 (high-priority) issues in the impeccable critique: the work never leads, mobile nav/signature interactions break, and keyboard/assistive-tech access fails.

**Architecture:** Ten independent, small tasks touching existing components only — no new files, no new dependencies. Section reorder in `page.tsx` + `Navbar.tsx`; `NameBanner.tsx` rewritten as a one-line header carrying the H1; proof strip and STAR employer/year tags sourced from `resumedata.ts`; Skills flip card replaced by the grouped list (deleting the flip removes two P1 symptoms at once); skip link/scroll-padding/aria state added in place.

**Tech Stack:** Next.js 14 App Router, React 18, Tailwind v4, framer-motion. No test runner exists in this repo; verification is `npm run build` plus targeted browser checks listed per task (adding a test framework for this would be over-engineering — add one only if the project grows real logic).

**Spec:** `.impeccable/critique/2026-10-01T01-45-25Z__src-app-page-tsx.md` — this plan argues from that critique; read it first. Scope is the three `[P1]` entries in "Priority Issues" only. P2 issues (reduced motion, webfont, typeset, SSR opacity, favicon/OG, dead code) are explicitly out of scope.

## Global Constraints

- No new dependencies. No new files.
- Every task ends with `npm run build` passing (this repo has no lint/test scripts).
- Exactly one `<h1>` per page: the site name on home (Task 2), the archive title on `/projects` (already present).
- Keep existing visual system (colors, surfaces, radii) — this is structural/a11y work, not a restyle.
- Do not touch: About.tsx copy, InteractiveBackdrop, Footer, SideRail, P2 items.
- Commit after each task with the message given.

---

### Task 1: Reorder sections so Experience leads

**Files:**
- Modify: `src/app/page.tsx:26-33`
- Modify: `src/components/Navbar.tsx:9-16`

**Interfaces:**
- Consumes: existing section components (unchanged).
- Produces: DOM order `home, experience, projects, skills, about, contact` — Tasks 2–7 assume this order for scroll-spy and anchor behavior.

- [ ] **Step 1: Reorder `<main>` in page.tsx**

Replace lines 26-33 of `src/app/page.tsx`:

```tsx
<main id="main-content" tabIndex={-1} className="relative focus:outline-none">
  <NameBanner />
  <Hero />
  <Experience />
  <Projects />
  <Skills />
  <About />
  <Contact />
  <Footer />
</main>
```

(The `id`/`tabIndex` are the skip-link target from Task 6 — include them now so the element is stable.)

- [ ] **Step 2: Reorder the nav sections array**

Replace lines 9-16 of `src/components/Navbar.tsx`:

```ts
const sections = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Capabilities" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
```

(Array order must match DOM order or `useScrollSpy` reports the wrong active link.)

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: PASS. Then in the browser: desktop nav pill order matches the above, and scrolling down highlights each section in that order.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/components/Navbar.tsx
git commit -m "reorder home sections so Experience and Projects lead"
```

---

### Task 2: One-line name header (H1) + first-fold proof strip

**Files:**
- Rewrite: `src/components/NameBanner.tsx`
- Modify: `src/data/resumedata.ts:17-83` (add `employer`/`year` to `starScenarios`)
- Modify: `src/components/Hero.tsx:14-21, 54-95, 177-221` (proof strip, h1→h2, id move, dead `proofPoints`)

**Interfaces:**
- Consumes: `site.name`, `site.location` from `resumedata.ts`; `starScenarios` (now with `employer: string`, `year: string`).
- Produces: `#home` anchor lives on NameBanner (Hero loses it); page H1 is the site name; proof strip renders `proofIds` from Hero.

- [ ] **Step 1: Add employer/year to every STAR scenario**

In `src/data/resumedata.ts`, add two fields to each of the 5 `starScenarios` entries (values derived from `experience` dates in the same file):

| id | employer | year |
|----|----------|------|
| 01 | `"Kaya Global"` | `"2025"` |
| 02 | `"Accenture"` | `"2019–2022"` |
| 03 | `"Accenture"` | `"2019–2022"` |
| 04 | `"Kaya Global"` | `"2025"` |
| 05 | `"Kaya Global"` | `"2025"` |

e.g. scenario 01 becomes:

```ts
{
  id: "01",
  employer: "Kaya Global",
  year: "2025",
  title: "Parallelized GenAI Test Generation",
  ...
```

- [ ] **Step 2: Rewrite NameBanner as the compact header carrying the H1**

Replace all of `src/components/NameBanner.tsx`:

```tsx
import { site } from "@/data/resumedata";

export default function NameBanner() {
  return (
    <section
      id="home"
      className="scroll-mt-32 px-6 pt-8 sm:scroll-mt-36 sm:px-8 lg:px-10"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl [font-family:var(--font-display)]">
          {site.name}
        </h1>
        <p className="text-sm uppercase tracking-[0.24em] text-[var(--text-secondary)]">
          AI Engineer · {site.location}
        </p>
      </div>
    </section>
  );
}
```

This drops the 373px signature panel (the critique's fix: "one-line name/role/location header instead of the banner") and makes the name the H1 (P1 #3: "The name is `role='img'`, not a heading"). The signature SVG lives in git history if wanted back.

- [ ] **Step 3: Fix Hero — move `id="home"`, h1→h2, delete dead code, add proof strip**

In `src/components/Hero.tsx`:

1. Delete the unused `proofPoints` const (lines 17-21).
2. Delete the now-unused `useEffect` import usage: remove lines 35-41 (the 7s autoplay `useEffect` — full carousel change is Task 7; removing it here avoids editing the same lines twice) and drop `useEffect` from the import on line 3.
3. Section element (line 54-59): remove `id="home"` (NameBanner owns it now):

```tsx
<section
  className="relative overflow-hidden scroll-mt-32 px-6 pb-20 pt-14 sm:scroll-mt-36 sm:px-8 lg:px-10 lg:pb-28"
  onPointerMove={handlePointerMove}
  onPointerLeave={handlePointerLeave}
>
```

4. Change `<h1>` (line 87) to `<h2>` and its closing tag (line 90).
5. Insert the proof strip as the first child of the left column, above the pill-label (before line 78):

```tsx
const proofIds = ["01", "02", "04"];
const proofStrip = proofIds.map(
  (id) => starScenarios.find((scenario) => scenario.id === id)!,
);
```

(component scope, next to `activeScenario`), then JSX:

```tsx
<div className="mb-6 grid gap-3 sm:grid-cols-3">
  {proofStrip.map((scenario) => (
    <div
      key={scenario.id}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
    >
      <p className="text-2xl font-semibold text-white [font-family:var(--font-display)]">
        {scenario.impact}
      </p>
      <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
        {scenario.title}
      </p>
      <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-sky-200/75">
        {scenario.employer} · {scenario.year}
      </p>
    </div>
  ))}
</div>
```

6. Tag the carousel scenario with employer/year: in the card header (lines 183-189), after the `Scenario {activeScenario.id}` paragraph, add:

```tsx
<p className="text-xs uppercase tracking-[0.18em] text-sky-200/75">
  {activeScenario.employer} · {activeScenario.year}
</p>
```

(wrap the left group in `flex flex-wrap items-center gap-3` — it already is.)

- [ ] **Step 4: Delete the dead signature CSS**

In `src/styles/globals.css` (verified via grep: referenced only by the old NameBanner), delete:
- All `.signature-name*` rules, lines 273-339.
- The five `@keyframes signature-*` blocks, lines 341-392.
- Inside the `@media (prefers-reduced-motion: reduce)` block at line 394, delete the signature selectors/rules (lines 399-419): the `.signature-name__shadow, ...__clip { animation: none; }` rule, `.signature-name__shadow, .signature-name__fill { opacity: 1; }`, `.signature-name__stroke, .signature-name__flourish { ... }`, and `.signature-name__clip { ... }`. Keep the `.skill-flip-card { transition: none; }` rule and the block braces — Task 8 removes that rule.

- [ ] **Step 5: Build and verify**

Run: `npm run build`
Expected: PASS. Browser check: first 900px at 1440×900 contains name, role, location, three STAR numbers with employer·year tags, and the primary CTA row has moved up versus before; exactly one `<h1>` in the DOM; `#home` scrolls to the name header, not past it; no element carries a `signature-name` class and no `signature-*` keyframes remain in the stylesheet.

- [ ] **Step 6: Commit**

```bash
git add src/components/NameBanner.tsx src/components/Hero.tsx src/data/resumedata.ts src/styles/globals.css
git commit -m "lead with one-line name header and first-fold proof strip"
```

---

### Task 3: Featured project outcomes + fix dead repo link

**Files:**
- Modify: `src/data/projectsdata.ts:1` (type annotation), featured entries, line 320
- Modify: `src/components/Projects.tsx:46-48`

**Interfaces:**
- Consumes: `projects` array.
- Produces: optional `outcome?: string` on project objects (type-annotated so TS allows it on the 5 featured entries only).

- [ ] **Step 1: Type the projects array so `outcome` is a known optional field**

Change line 1 of `src/data/projectsdata.ts`:

```ts
type Project = {
  title: string;
  description: string;
  tech: string[];
  category: string;
  link: string;
  outcome?: string;
};

export const projects: Project[] = [
```

- [ ] **Step 2: Add one-line outcomes to the five featured projects**

Add `outcome` to these entries:

```ts
"Text-to-SQL Agent":
  outcome: "Anyone can query Postgres in plain English — runs locally on Ollama, no API keys.",
"GraphRAG Knowledge Retrieval":
  outcome: "Answers stay grounded by traversing entity relationships, not flat text chunks.",
"DocuMind – RAG-Based AI Research Assistant":
  outcome: "Ask questions across large PDF libraries and get citations instead of guesses.",
"DeepSeek Code Companion – AI Coding Assistant":
  outcome: "One interface for suggestions, debugging, docs, and best-practice review.",
"E-Commerce Customer Segmentation & Recommendation System":
  outcome: "K-Means cohorts drive a personalized recommendation per customer segment.",
```

- [ ] **Step 3: Fix the 404 repo link**

Line 320 of `src/data/projectsdata.ts`: change

```ts
link: "https://github.com/dhawalpanchal1997/my-kurta-desiner",
```

to

```ts
link: "#",
```

(The `startsWith("http")` guard in Projects.tsx / projects/page.tsx then hides the link instead of shipping a 404. The 16 `link: "#"` entries are already correctly hidden — leave them.)

- [ ] **Step 4: Render the outcome in Projects.tsx**

After the description paragraph (line 48 of `src/components/Projects.tsx`), add:

```tsx
{project.outcome && (
  <p className="mt-4 flex max-w-3xl items-start gap-2 text-sm leading-6 text-sky-100">
    <ArrowUpRight size={15} className="mt-1 shrink-0" />
    {project.outcome}
  </p>
)}
```

- [ ] **Step 5: Build and verify**

Run: `npm run build`
Expected: PASS. Browser check: each of the five featured cards shows an outcome line; the `/projects` archive no longer renders a "View Project" link for `my-kurta-desiner` (its link is gone — verify no remaining `<a href="https://github.com/dhawalpanchal1997/my-kurta-desiner">`).

- [ ] **Step 6: Commit**

```bash
git add src/data/projectsdata.ts src/components/Projects.tsx
git commit -m "add featured project outcomes and remove dead repo link"
```

---

### Task 4: Delete Experience filler blocks

**Files:**
- Modify: `src/components/Experience.tsx:92-109, 129-132`

**Interfaces:**
- Consumes: `experience` data (unchanged).
- Produces: accordion body = numbered points grid only.

- [ ] **Step 1: Delete the Role Snapshot + Strength cards**

Remove lines 92-109 (the two-card grid — "Role Snapshot" repeats `item.points[0]`, "Strength" is identical filler on every role). The numbered points grid that follows stays.

- [ ] **Step 2: Delete the filler closer**

Remove lines 129-132:

```tsx
<div className="mt-5 flex items-center gap-2 text-sm text-sky-200">
  <ArrowUpRight size={15} />
  Built for product impact, scale, and maintainability.
</div>
```

Then remove the now-unused `ArrowUpRight` import (line 5).

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: PASS. Browser check: expand a role — only duration/location/company/focus/highlights and the numbered points render; no "Strength" card.

- [ ] **Step 4: Commit**

```bash
git add src/components/Experience.tsx
git commit -m "remove duplicated and filler blocks from experience accordion"
```

---

### Task 5: Overlay mobile menu + Esc + scroll-spy bottom fix

**Files:**
- Modify: `src/components/Navbar.tsx:38-65, 198-207, 226`
- Modify: `src/hooks/useScrollSpy.ts:18-30`

**Interfaces:**
- Consumes: existing `isMenuOpen` state.
- Produces: menu renders as a fixed overlay (opening it never changes document height); Escape closes it and restores focus to the toggle.

- [ ] **Step 1: Make the mobile menu a fixed overlay**

In `Navbar.tsx`, replace the menu's className (line 266):

```tsx
className={`${shellBaseClassName} fixed left-4 right-4 top-[5.5rem] z-40 max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-[1.75rem] p-3 lg:hidden`}
```

Removing `mt-3` (in-flow) is the fix: the open menu no longer adds 332px, so anchor jumps land at the scroll-padding offset instead of 332px late.

- [ ] **Step 2: Add Escape handling with focus restore**

Add `useRef` to the React import (line 3), add a ref to the toggle button, and add the effect:

```tsx
const menuButtonRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
  if (!isMenuOpen) return;

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  };

  window.addEventListener("keydown", onKeyDown);
  return () => window.removeEventListener("keydown", onKeyDown);
}, [isMenuOpen]);
```

Attach the ref to the hamburger `<button>` (line 198): `ref={menuButtonRef}`.

(The existing `hashchange` listener already closes the menu; with the overlay there is no layout shift when it closes.)

- [ ] **Step 3: Fix Contact never highlighting on tall viewports**

In `src/hooks/useScrollSpy.ts`, after the `for` loop inside `onScroll` (before `setActiveId(current)`), add:

```ts
if (
  window.innerHeight + window.scrollY >=
  document.documentElement.scrollHeight - 2
) {
  current = sections[sections.length - 1].id;
}
```

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: PASS. Browser checks:
1. At 390px wide: open menu, tap a link → page lands on the section (offset by header, not shifted); document height while the menu is open equals height when closed (toggle menu and compare `document.documentElement.scrollHeight`).
2. Press Escape → menu closes and focus returns to the hamburger button.
3. Desktop at 1440×1000+: scroll to page bottom → Contact nav pill is active.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.tsx src/hooks/useScrollSpy.ts
git commit -m "overlay mobile menu with Esc, fix tall-viewport scroll spy"
```

---

### Task 6: Skip link + scroll-padding-top

**Files:**
- Modify: `src/app/layout.tsx:17-21`
- Modify: `src/app/projects/page.tsx:55`
- Modify: `src/styles/globals.css:26-28`

**Interfaces:**
- Consumes: `#main-content` id added in Task 1 (home) — this task adds it to `/projects`.
- Produces: every in-page anchor and skip-link jump lands 128px below the viewport top, clear of the sticky header.

- [ ] **Step 1: Add scroll-padding-top to html**

In `globals.css` lines 26-28:

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 8rem;
}
```

- [ ] **Step 2: Add the skip link as the first focusable element**

In `layout.tsx`, inside `<body>` before `{children}`:

```tsx
<body
  className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]"
>
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-sky-300 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-slate-950"
  >
    Skip to content
  </a>
  {children}
</body>
```

- [ ] **Step 3: Add the target to /projects**

In `src/app/projects/page.tsx` line 55:

```tsx
<main
  id="main-content"
  tabIndex={-1}
  className="page-shell min-h-screen px-6 pb-20 pt-10 focus:outline-none sm:px-8 lg:px-10"
>
```

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: PASS. Browser/keyboard checks: load home, press Tab → "Skip to content" appears visibly; press Enter → focus lands on `<main>` and the name header is in view below the sticky header. Click any nav link → target section title is not hidden under the header. Repeat Tab check on `/projects`.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/projects/page.tsx src/styles/globals.css
git commit -m "add skip link and scroll-padding-top for sticky header"
```

---

### Task 7: User-driven carousel, live region, hit targets, compact mobile hero card

**Files:**
- Modify: `src/components/Hero.tsx` (autoplay already removed in Task 2; now dots, live region, mobile compaction)

**Interfaces:**
- Consumes: `starScenarios` with `employer`/`year` (Task 2).
- Produces: carousel advances only via buttons/dots; scenario changes announced politely; 24px+ dot targets; one-line Result on <640px.

- [ ] **Step 1: Add a polite live region**

Wrap the scenario content `motion.div` (line 212) with `aria-live="polite"`:

```tsx
<motion.div
  key={activeScenario.id}
  aria-live="polite"
  initial={{ opacity: 0, y: 18 }}
  ...
```

(Autoplay is already gone from Task 2, so nothing changes without user action — this announces manual prev/next/dot changes. This satisfies WCAG 2.2.2: no auto-playing carousel left to pause.)

- [ ] **Step 2: Give the dots 24px+ hit targets**

Replace the dot buttons (lines 259-273):

```tsx
<div className="mt-5 flex flex-wrap items-center gap-1">
  {starScenarios.map((scenario, index) => (
    <button
      key={scenario.id}
      type="button"
      aria-label={`Show scenario ${scenario.id}`}
      aria-pressed={index === activeScenarioIndex}
      onClick={() => setActiveScenarioIndex(index)}
      className="group inline-flex h-6 w-6 items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
    >
      <span
        className={`h-2.5 rounded-full transition ${
          index === activeScenarioIndex
            ? "w-8 bg-sky-300"
            : "w-2.5 bg-white/20 group-hover:bg-white/35"
        }`}
      />
    </button>
  ))}
</div>
```

(Visuals unchanged; hit area is now 24×24px with 4px between targets. `aria-pressed` also covers the filter-state pattern.)

- [ ] **Step 3: Compact the STAR card on small screens**

In the S/T/A/R grid (line 223), keep `grid gap-3 sm:grid-cols-2`, and add `hidden sm:block` to the Situation, Task, and Action wrappers (lines 224, 232, 240 — the three divs whose label paragraphs read Situation/Task/Action). Result stays always visible. On <640px the card shows header + title + Result + dots + CTAs instead of four stacked blocks — shortens the hero card as the critique asks.

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: PASS. Browser checks: carousel never advances on its own (wait 10s); prev/next/dots work and the scenario title is announced (use a screen reader or inspect `aria-live`); dot buttons measure ≥24px (`getBoundingClientRect()`); at 390px the hero card height drops noticeably (only Result shown); tab order reaches dots with a visible focus ring.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "make STAR carousel user-driven with live region and 24px targets"
```

---

### Task 8: Skills — grouped list by default (remove flip + word cloud)

**Files:**
- Rewrite: `src/components/Skills.tsx`
- Modify: `src/styles/globals.css:224-271, 394-397`

**Interfaces:**
- Consumes: `skillGroups` (keep the const exactly as-is).
- Produces: plain grid of nine group cards; no flip, no cloud — this removes P1 #2's word-cloud overlaps and 3,390px nested scroller, and P1 #3's hidden-face tab-order/`inert` problem, in one task.

- [ ] **Step 1: Rewrite Skills.tsx**

Keep the `skillGroups` const untouched. Replace everything from line 405 (`export default function Skills()`) to the end with:

```tsx
export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Capabilities"
      title="Nine skill groups spanning AI depth through delivery range."
      subtitle="What I build with, how I ship it, and how I run it in production — organized by area instead of hidden behind an effect."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = group.icon;

          return (
            <article
              key={group.title}
              className="rounded-[1.7rem] border border-white/10 bg-white/[0.05] p-5"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-2xl border border-sky-300/20 bg-sky-300/10 p-3 text-sky-200">
                  <Icon size={18} />
                </span>
                <h3 className="text-base font-semibold text-white">
                  {group.title}
                </h3>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/[0.08] bg-slate-950/55 px-3 py-2 text-sm text-[var(--text-secondary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
```

This deletes: `isFlipped` state, pointer-parallax handlers, the entire `wordCloudSkills` const (~275 lines), both flip faces, the "6 Focus Areas" templated line, and unused imports (`useState`, `PointerEvent`, `RefreshCw`). Fix the `Section` import if the relative path differs (it currently is `@/components/Section`).

- [ ] **Step 2: Delete the dead flip CSS**

In `globals.css` remove: `.skill-flip-scene` (224-226), `.skill-flip-card` + `.is-flipped` (228-238), `.skill-face` (240-245), `.skill-face-back` (247-249), `.skill-face-scroll` + its three scrollbar rules (251-267), `.skill-cloud-word` (269-271). Then in the reduced-motion block at line 394: Task 2 already removed the signature rules, so once you delete its remaining `.skill-flip-card { transition: none; }` rule the block is empty — delete the whole `@media (prefers-reduced-motion: reduce)` block. Verified via grep these classes are referenced only by Skills.tsx.

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: PASS. Browser checks: no element with class `skill-flip-*` or `skill-cloud-word` in the DOM; nine group cards render in a grid at desktop and one column at 390px; section has no nested scrollbar; tab order never enters an invisible face.

- [ ] **Step 4: Commit**

```bash
git add src/components/Skills.tsx src/styles/globals.css
git commit -m "replace skills flip card with grouped list"
```

---

### Task 9: Contact overflow at small widths

**Files:**
- Modify: `src/components/Contact.tsx:37, 38, 58, 63-71, 80`

**Interfaces:**
- Consumes: `site.email` etc.
- Produces: link cards and email survive 320–390px without clipping.

- [ ] **Step 1: Constrain the grid**

Line 37:

```tsx
<div className="surface-card grid grid-cols-1 gap-6 rounded-[2rem] p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
```

- [ ] **Step 2: Add min-w-0 to both grid children and break-all to values**

- Line 38 `<div>` → `<div className="min-w-0">`
- Line 58 `<div className="grid gap-4">` → `<div className="grid min-w-0 gap-4">`
- Line 63 anchor → add `min-w-0` to its className
- Line 80 `<p className="mt-1 text-base text-white">` → `<p className="mt-1 break-all text-base text-white">`

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: PASS. Browser check at 320, 360, and 390px: no horizontal overflow (`document.documentElement.scrollWidth <= innerWidth`), full email address visible, cards not clipped.

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "fix contact card overflow at small viewports"
```

---

### Task 10: Expose state on accordion and category filters

**Files:**
- Modify: `src/components/Experience.tsx:69-79, 85`
- Modify: `src/app/projects/page.tsx:93-105`

**Interfaces:**
- Consumes: existing `isOpen` / `isActive` booleans.
- Produces: `aria-expanded` + `aria-controls` on each role toggle; `aria-pressed` on each category filter.

- [ ] **Step 1: Accordion state**

On the "View Details" button (Experience.tsx line 69):

```tsx
<button
  type="button"
  aria-expanded={isOpen}
  aria-controls={`exp-details-${index}`}
  onClick={() => setOpenIndex(isOpen ? null : index)}
  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white transition hover:bg-white/[0.08]"
>
```

On the expanding `motion.div` (line 85) add `id={`exp-details-${index}`}`.

- [ ] **Step 2: Filter state**

On each category button (projects/page.tsx line 93):

```tsx
<button
  key={category}
  type="button"
  aria-pressed={isActive}
  onClick={() => setActiveCategory(category)}
  className={...unchanged...}
>
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: PASS. Accessibility check (browser dev tools or axe): each toggle exposes `aria-expanded`; filters expose `aria-pressed` true/false matching the visual pill; no contrast/state regressions.

- [ ] **Step 4: Commit**

```bash
git add src/components/Experience.tsx src/app/projects/page.tsx
git commit -m "expose expanded and pressed state on accordions and filters"
```

---

### Task 11: Final verification pass

**Files:** none (verification only).

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: PASS with no errors.

- [ ] **Step 2: P1 acceptance checklist (browser, dev server via `npm run dev`)**

- **P1 #1 Work leads:** DOM order Home→Experience→Projects→Capabilities→About→Contact; name+role+location above the fold; three STAR numbers with employer·year in first 900px; five featured projects show outcomes; no dead `my-kurta-desiner` link; Experience accordion has no Role Snapshot/Strength/filler.
- **P1 #2 Mobile (390px):** no word cloud; menu overlay doesn't change page height and jumps land correctly; Contact cards fit at 320/360/390; dots ≥24px; hero card compact.
- **P1 #3 Keyboard/AT:** Tab-first stop is the skip link; exactly one `<h1>` (the name); no invisible tab stops anywhere; anchors land below the sticky header; accordion/filters announce state; carousel only moves on user action; Escape closes the menu.

- [ ] **Step 3: Confirm P2 items untouched**

Run: `git diff $(git merge-base HEAD main 2>/dev/null || git merge-base HEAD master) --stat` (or review the branch diff). Only the files listed in Tasks 1–10 appear — no drive-by P2 changes.

- [ ] **Step 4: Commit if any fixup was needed**

```bash
git add -A
git commit -m "fixups from final P1 verification pass"
```

(Skip if the checklist passed with no changes.)

---

## Self-Review

- **Spec coverage (P1 #1):** one-line header → T2; proof strip w/ employer+year → T2; STAR cards employer/date → T2; featured outcomes → T3; dead link → T3; reorder → T1; filler deletion → T4; diagram/GIF → **deliberately skipped** (requires assets that don't exist in the repo — add when assets exist).
- **Spec coverage (P1 #2):** grouped Skills list → T8; overlay menu → T5; Contact `grid-cols-1 min-w-0 break-all` → T9; 44px/24px targets → T7 (+T4's `min-h-11` toggle); shorter hero card → T7.
- **Spec coverage (P1 #3):** skip link → T6; hidden-face tab order → T8 (flip deleted); scroll-padding-top → T6; accordion/filters state → T10; carousel pause/live region → T7 (autoplay removed in T2); Esc → T5; name as H1 → T2. Tall-viewport Contact highlight (heuristic-1 key issue) → T5.
- **Placeholders:** none — every step carries exact code/copy.
- **Type consistency:** `employer`/`year` defined in T2 before use in T2; `outcome?: string` typed in T3 before use; `#main-content` created in T1/T6, consumed in T6; `id="home"` moves to NameBanner in T2 and is removed from Hero in the same task.
