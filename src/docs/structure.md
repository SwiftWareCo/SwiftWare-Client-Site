1) Intent & Narrative

Swiftware builds made-to-fit software across CRMs + field apps, tee-sheet ops, AI/RAG automations, and customer-facing sites. The site should quickly communicate fit, let visitors choose a focus, and guide them to start a project.

Hero headline: Software. Made to fit.
Typing style: character-by-character with a caret that follows each character, then blinks at the end forever (respect prefers-reduced-motion).

2) High-level Plan

Keep / as a neutral home (hero + short “fit-first” bullets).

Always show a splash overlay on /:

First visit (no saved focus): show a small Focus Choice grid inside the splash (CRM · Tee Sheet · AI/RAG · Web) + “Continue without choosing.”

Returning visit (saved focus): show a brief brand flash (≈400–600ms), then auto-route to /solutions/{focus}.

Header always allows switching focus (reversible at any time).

SEO-safe: underlying page content is SSR and not gated; bots aren’t redirected.

Add four SSR/SEO vertical landing pages:

/solutions/crm – Service CRM + field app

/solutions/tee-sheet – Golf tee sheet & ops

/solutions/ai-ml – AI & RAG workflows

/solutions/web – Customer Websites & Portals (rename from “client-facing sites”)

3) Sections (global order)

Fit-First Bullets (under Hero)

Capabilities Grid (includes “Build on request”)

Outcome Snapshots (3 anonymized wins)

How We Work (Discovery → MVP → Launch → Iterate)

Engagement Options (Fixed Scope · Sprint Retainer · Support)

FAQ (scope, timelines, ownership, stack, hosting, maintenance)

Start a Project (Resend form – already set up)

Cohesion Pass (shared visual motif + section transitions)

Quality Pass (A11y/reduced-motion · SEO/OG · Analytics · Performance)

Note: No separate “Flow” section. The device animation remains a hero showcase motif with a compact alternate at ≤1024px.

4) Animations

≥1024px (desktop): DeviceBridgeShowcase (monitor ↔ phone packet travel).

≤1024px (laptop & below): replace with MobileSyncTile (compact, centered, fits small widths; no progress bar).

Respect prefers-reduced-motion.

Performance budget: no Lottie/video; use Motion/Framer + Tailwind only.

5) Splash & Focus Selection Behavior

Component: FocusSplash (full-viewport overlay, lightweight).

First visit: show Focus Choice (4 tiles) + “Continue without choosing.”

On select:

Save localStorage["swiftware.focus.v1"] = "crm"|"tee-sheet"|"ai-ml"|"web".

Optionally set a same-site cookie for human-only auto-route.

Route to /solutions/{key} and dismiss splash.

On Continue: dismiss splash; remain on neutral home.

Returning visit (human): show brand flash, then auto-route to /solutions/{key}.

Bots/crawlers: never redirected; overlay renders instantly hidden (SSR content readable).

Header: FocusSwitch dropdown changes route + updates storage at any time.

A11y: dialog semantics, focus trap, ESC to close, return focus to trigger; reduced-motion = simple fades.

6) File & Component Structure (Next.js App Router)
app/
  layout.tsx
  page.tsx                      # neutral home; mounts FocusSplash
  solutions/
    [focus]/
      page.tsx                  # vertical page (SSR)
components/
  hero/
    TypingHeadline.tsx          # per-char caret + final blink
    DeviceBridgeShowcase.tsx    # desktop-only (≥lg)
    MobileSyncTile.tsx          # laptop & below (≤lg), no progress bar
  splash/
    FocusSplash.tsx             # always-on splash with optional choice
  focus/
    FocusSwitch.tsx             # header dropdown to change focus
  sections/
    FitFirstBullets.tsx
    CapabilitiesGrid.tsx
    OutcomeSnapshots.tsx
    HowWeWork.tsx
    EngagementOptions.tsx
    FAQ.tsx
    StartProjectForm.tsx        # Resend (already wired)
lib/
  useFocus.ts                   # get/save focus (LS + optional cookie), type FocusKey
  isHuman.ts                    # optional heuristic for auto-route gating
styles/
  tokens.css                    # gradients, radii, shadows


lib/useFocus.ts (spec)

export type FocusKey = "crm" | "tee-sheet" | "ai-ml" | "web";
export function getSavedFocus(): FocusKey | null;
export function saveFocus(focus: FocusKey): void;

7) Design & Cohesion

Shared gradient motif: blue→purple (existing palette).

Section separators: subtle radial or 1px gradient lines.

Large desktop: hero left column (headline + buttons) vertically centered (xl:min-h-[calc(100vh-HEADER)] with flex center).

≤1024px: hero’s right tile switches to MobileSyncTile, narrower to avoid squeeze.

8) Accessibility, SEO, Analytics, Performance

A11y: aria-labelledby, dialog semantics, keyboard/ESC, focus management, contrast.

Reduced motion: static or gentle fades; no parallax/complex transforms.

SEO: each /solutions/* has unique <title>, meta description, OG/Twitter tags.

Analytics: track splash_seen, focus_selected, focus_skipped, change_focus, contact_started, contact_submitted (with current focus).

Perf: zero layout shift; next/image; animations smooth under 60fps.

9) Acceptance Criteria

Hero typing: caret follows each character; final caret blinks forever; reduced-motion shows static with end-blink only.

Layout: on large desktop, hero left column vertically centered.

≤1024px: DeviceBridgeShowcase replaced by MobileSyncTile (no overflow, no progress bar).

Splash: always appears; first visit shows Focus Choice + Continue; selection saves and routes; returning visits brand-flash then auto-route (humans only); bots unaffected.

Header switch: can change focus anytime; updates storage + route.

Vertical pages: SSR and indexable; no JS-gated content.

Cohesion: consistent gradients, borders, spacing, transitions across sections.

Resend form: functional (already set up).

10) Copy Skeletons (short placeholders)

Fit bullets (under hero):

“CRMs that field teams actually use.”

“Operations that run themselves.”

“AI where it matters (RAG, workflows).”

“Websites & portals that convert.”

Capabilities grid: 6–8 tiles incl. Build on request.
Outcome snapshots: three anonymized cards: metric + one-liner.
How we work: 4 steps, concise copy.
Engagement options: 3 cards with highlights.
FAQ: ownership, timelines, stack, hosting, maintenance.
Start a project: short form → Resend.