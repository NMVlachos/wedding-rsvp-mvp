# Handoff: Wedding RSVP Site (John & Jane)

## Overview
A single-page wedding website with a gated entry screen. Guests sign in with their
first name + an invite code, then land on a long-scrolling page covering the day's
information, ending in an RSVP form. There is one persistent top navbar that
deep-links/scrolls to each section.

## About the Design Files
The file in this bundle (`Wedding RSVP.html`) is a **design reference created in HTML**
— a prototype showing the intended look and behavior. It is **not production code to
copy directly**.

Your job is to **recreate this design in the target codebase's existing environment**
(React, Vue, Next.js, Astro, SwiftUI, etc.), following the established patterns,
component library, and styling conventions of that codebase. If no codebase exists
yet, pick the framework that best fits the project (a static-site framework like
Astro or Next.js App Router is a natural fit for a single-page wedding site with one
gated route).

## Fidelity
**High-fidelity.** Colors, typography, spacing, and copy in the reference are final
intent. Match them pixel-closely. Imagery is intentionally left as striped
placeholders — the couple will supply real photos later. Keep placeholder slots in
the same aspect ratios noted below.

---

## Screens / Views

### 1. Login screen
**Purpose.** A soft gate. The guest enters their first name and the invite code
printed on their physical invitation, then clicks Sign in. Validation is intentionally
loose at the prototype stage (any non-empty values). In production, validate the code
against the guest list.

**Layout.**
- Full viewport, centered card. Body background `--ivory` (#f6f1e7).
- Two soft sage radial gradients in the top-left and bottom-right corners of the
  viewport (decorative; ~520×520 circles at 60% opacity using `--sage-tint`).
- Card: `--paper` (#fbf7ed) on a 1px `--rule` (#ddd4bf) border, `max-width: 560px`,
  padding `64px 56px 56px`. Two thin horizontal rules inset 16px from top and bottom
  inside the card.
- Drop shadow: `0 30px 60px -30px rgba(60,55,40,0.18)`.

**Components, top to bottom (all center-aligned).**
1. **Ornament** — `—  •  —` motif: two 60×1px sage lines flanking a 5px sage dot,
   gap 14px, color `--sage` at 55% opacity.
2. **Eyebrow** — "YOU ARE WARMLY INVITED" in Work Sans 13px, letter-spacing 0.4em,
   color `--ink-faint`.
3. **Couple lockup** — "John&Jane" in Cormorant Garamond 76px / line-height 1.0.
   The ampersand is italic, color `--sage-deep` (#5d6e57), padding 0 6px.
4. **"are getting married"** — Cormorant Garamond italic 22px, `--ink-soft`.
5. **Date line** — "SATURDAY · SEPTEMBER 19, 2026", Work Sans 11px,
   letter-spacing 0.32em, `--ink-faint`.
6. **Section divider row** — flexbox of: rule | "GUEST SIGN-IN" label (Work Sans
   10px, 0.36em tracking) | rule. Margin `32px 0 28px`.
7. **Form fields** (left-aligned within card, stacked, gap 18px):
   - Label: Work Sans 10px uppercase, 0.3em tracking, `--ink-soft`.
   - Input: transparent bg, no border except 1px bottom `--rule`, padding
     `8px 2px 10px`, Cormorant Garamond 22px. Focus → bottom-border becomes
     `--sage-deep`, no glow. Placeholder italic `--ink-faint`.
   - Field 1: "FIRST NAME" — text input, placeholder "As it appears on your
     invitation".
   - Field 2: "INVITE CODE" — text input, auto-uppercased on change, placeholder
     "e.g. ROSE-2026".
8. **Error message** (only on empty submit): #8a3a2b text on #f4e5dd background,
   1px #e3c8b8 border, padding 10px 14px, italic 13px.
9. **Submit button** "SIGN IN" — full-width, `--ink` (#2b2a26) bg, `--ivory` text,
   1px `--ink` border, padding `16px 28px`, Work Sans 11px, 0.36em tracking, uppercase.
   Hover → bg becomes `--sage-deep`. Active → `translateY(1px)`.
10. **Hint** — italic 12px `--ink-faint`: "Lost your code? Email us at
    hello@johnandjane.wedding".

### 2. Main page (post-login, single scroll)

#### 2a. Navbar (sticky)
- `position: sticky; top: 0; z-index: 50;` Background
  `rgba(246, 241, 231, 0.92)` with `backdrop-filter: blur(8px)`. 1px bottom
  `--rule`.
- Inner row: `max-width: 1180px`, padding `16px 32px`, flex aligned center, gap 24px.
- **Brand** (left): "J & J" — Cormorant Garamond 22px, ampersand italic
  `--sage-deep`. **Must be `white-space: nowrap` and `flex-shrink: 0`** so it
  doesn't wrap at narrow widths.
- **Links** (right, `margin-left: auto`): Home, Our Story, Schedule, Venue, Stays,
  Dress Code, Registry. Work Sans 11px, 0.26em tracking, uppercase, `--ink-soft`.
  Padding `10px 12px`. Active link has 1px bottom border `--sage-deep` and the same
  color text.
- **RSVP CTA** (right of links): solid `--sage-deep` background, ivory text, same
  type as links. Hides at ≤1040px (handled by the section's own anchor + nav link).
- **Sign out** (rightmost): plain button, smaller (10px), `--ink-faint`. Hover
  → `--ink`.
- Below 1040px viewport, the link row tightens (8px padding, 10px font, 0.2em
  tracking) and the RSVP CTA hides.

**Scroll-spy.** As the user scrolls, the link whose section is at the top
(accounting for navbar height + 20px) gets the `active` class. Implemented via a
`scroll` listener (passive); ids are `home`, `story`, `schedule`, `venue`, `stay`,
`dress`, `registry`, `rsvp`. Clicking a link smooth-scrolls to the section minus
navbar height + 8px offset.

#### 2b. Hero (#home)
- Center-aligned, `padding: 140px 32px 100px`.
- Eyebrow: "TOGETHER WITH THEIR FAMILIES", Work Sans 11px, 0.32em, `--sage-deep`.
- Big lockup: "John&Jane", Cormorant Garamond `clamp(72px, 11vw, 152px)`,
  line-height 0.95. Ampersand italic, `--sage-deep`, padding 0 6px.
- **Section ornament** below name: 80×1 sage line | 8px sage diamond (rotated
  square) | 80×1 sage line. Reuse for every section header.
- Meta row: "SATURDAY · SEPTEMBER 19, 2026 · HUDSON VALLEY, NY", Work Sans 11px,
  0.36em, `--ink-soft`. Separators are 4px sage dots (not interpuncts).
- Hero image placeholder: 16:9, max-width 980px, padding 0 32px, margin-top 64px.

#### 2c. Section header (reused for Story / Schedule / Venue / Stays / Registry / RSVP)
- Centered. Eyebrow (Work Sans 11px, 0.32em, `--sage-deep`) → H2 (Cormorant
  Garamond 60px / line-height 1, optional italic span in `--sage-deep`) → ornament
  → optional italic subhead (Cormorant Garamond italic 19px, `--ink-soft`,
  max-width 560px). Margin-bottom 64px.

#### 2d. Our Story (#story)
- 2-col grid `1fr 1.1fr`, gap 80px, items center.
- Left: 3:4 portrait placeholder.
- Right: three paragraphs of body copy (Lora 18px / line-height 1.75 / `--ink-soft`),
  closing with a signature line "— John & Jane" in Cormorant Garamond italic 26px
  `--ink`, margin-top 28px.

#### 2e. Schedule (#schedule)
- Subhead: "A loose plan for September 19. Times approximate — the day will take its
  own shape."
- Container max-width 760px, centered. Each row is a 3-col grid `160px 1fr auto`,
  gap 32px, padding `28px 0`, separated by 1px `--rule` (top + between).
- Row cells:
  - **Time**: Cormorant Garamond italic 24px, `--sage-deep`.
  - **Title** (H4): Cormorant Garamond 28px, weight 500.
  - **Desc**: Lora italic 15px, `--ink-soft`.
  - **Location**: Work Sans 10px, 0.3em tracking, uppercase, `--ink-faint`, right-aligned.
- Rows (intentionally lyrical placeholder copy; let the couple edit):
  - 3:30 pm — Welcome — pre-ceremony drinks on the lawn — The Garden
  - 4:00 pm — Ceremony — vows beneath the old maple — The Garden
  - 4:45 pm — Cocktail Hour — hors d'oeuvres, music — South Terrace
  - 6:00 pm — Dinner & Toasts — long table, family-style — The Barn
  - 8:00 pm — Dancing — until candles burn low — The Barn
  - 11:00 pm — Send-off — sparklers and a slow drive home — The Lane
- At ≤1040px: collapse to 2-col `110px 1fr`; location moves below as its own row.

#### 2f. Venue & Travel (#venue)
- 2-col grid `1.15fr 1fr`, gap 80px.
- Left: 1:1 square placeholder.
- Right: H3 (Cormorant Garamond 44px) "Hollow Maple Farm" → italic 20px address
  → paragraph body → "Travel list" of three rows. Each row is a 2-col grid
  `90px 1fr`, separated by top + bottom borders of `--rule-soft` (#e7dfc9).
  Keys ("By Car", "By Train", "By Air") in Work Sans 10px, 0.32em, uppercase,
  `--sage-deep`.

#### 2g. Accommodations (#stay)
- Subhead: "Three nearby options, blocked or recommended for our guests."
- 3-col grid, gap 32px. Each card is `--paper` bg, 1px `--rule` border,
  padding 28px, flex column gap 14px.
- Card contents: 4:3 image placeholder → tag (Work Sans 10px, 0.32em uppercase,
  `--sage-deep`) → H4 (Cormorant Garamond 26px weight 500) → body 14px `--ink-soft`
  → meta footer with 1px top border `--rule-soft`, distance (left, `--ink-faint`)
  and rate (right, `--ink`), Work Sans 11px uppercase.
- Items:
  - Room block — The Beekman House — From $245/night — 8 min to venue
  - Boutique — Maplewood Lodge — From $310/night — 12 min to venue
  - Budget — Rhinebeck Motor Inn — From $129/night — 5 min to venue

#### 2h. Dress Code (#dress) — full-bleed band
- Background switches to `--paper`. Top + bottom 1px `--rule` borders. Padding
  `96px 32px`.
- Inner: max-width 980px, 2-col grid `1fr 1fr`, gap 80px, items center.
- Left: eyebrow "A NOTE ON ATTIRE" → H3 "Garden *formal*" (Cormorant 48px,
  italic span `--sage-deep`) → two paragraphs.
- Right: palette swatch grid (5 columns, gap 14px, aspect-ratio 1 squares, 1px
  `--rule` border). Labels below each swatch (Work Sans 9px, 0.24em, uppercase,
  `--ink-faint`, positioned `bottom: -22px`):
  - sage `#7a8a72`
  - oat `#d8c9a8`
  - fawn `#c8a984`
  - clay `#8a6a5a`
  - ink `#3d3a36`

#### 2i. Registry (#registry)
- Subhead: "Your presence is the only present we need. If you'd like to do more,
  a few gentle options."
- 3-col grid, gap 24px, max-width 980px. Each card: 1px `--rule` border, `--paper`
  bg, padding `36px 28px`, center-aligned, flex column gap 14px.
- Card top is a 56px circle marked "i", "ii", "iii" in Cormorant italic 24px
  `--sage-deep`, with a 1px sage border.
- Items: "Our Home" (Crate & Barrel registry), "Honeymoon Fund" (southern Italy),
  "A Local Cause" (Hudson Valley Food Bank).

#### 2j. RSVP (#rsvp) — full-bleed dark band
- Background `--ink` (#2b2a26), text `--ivory`. Padding `120px 32px`.
- Section header reuses the standard structure but H2 reads "R*S*V*P*" with
  alternating ivory/italic-sage-tint letters. Subhead "By August 15, 2026."
- Form max-width 720px, grid gap 36px.
- Greeting line above the form: italic 24px `rgba(246,241,231,0.8)`, "Hello,
  {firstName} —".
- **Each question** has:
  - Label: Work Sans 11px, 0.3em tracking, uppercase, `#c7d3bd` (sage tint).
  - Optional help: Cormorant italic 16px, `rgba(246,241,231,0.65)`.
- **Choice tiles** (radio-equivalent): flex row, gap 14px, each tile flex `1 1 220px`,
  1px `rgba(246,241,231,0.25)` border, padding `22px 24px`. Contains an 18px
  outlined circle + label stack (title in Cormorant 24px, description in Work Sans
  10px 0.28em uppercase 55% opacity). Active state: 1px `#c7d3bd` border, bg
  `rgba(199,211,189,0.06)`, inner radio dot scales from 0 → 1.
- **Q1 — Will you join us?**
  - "Joyfully accepts / I'll be there"
  - "Regretfully declines / Can't make it"
- **Q2 — Dietary preference** (only shown when attending = yes):
  - "No restrictions / All courses, please"
  - "Vegetarian / No meat or fish"
  - "Vegan / Plant-based"
- **Q3 — Favorite song** (only shown when attending = yes): text input styled
  like login inputs but for dark mode (transparent bg, bottom border
  `rgba(246,241,231,0.3)`, focus → `#c7d3bd`). Placeholder "Artist — Title".
- **Submit button**: ivory background, ink text, 1px ivory border, Work Sans 11px,
  0.36em tracking, uppercase, "SEND RSVP". Disabled until attending is chosen
  (transparent bg, 40% ivory text). Hover → background becomes `#c7d3bd`.
- **Confirmation state** (after submit): replaces the form. Centered 64px circle
  with a check, then H3 "Thank you, *{firstName}*" (Cormorant 48px, italic span
  `#c7d3bd`), body copy that diverges by answer ("can't wait to celebrate" vs.
  "we'll miss you"), and an "Edit response" ghost button.

#### 2k. Footer
- Centered, `padding: 60px 32px`. Cormorant italic 18px `--ink-faint`:
  "John & Jane · September 19, 2026". Below: Work Sans 10px, 0.32em uppercase,
  "WITH LOVE, FROM HUDSON VALLEY".

---

## Interactions & Behavior

- **Login → main**: form submit (Enter or button). Empty values → inline error.
  Valid → render main site. No real auth in the prototype; in production validate
  the code server-side against a guest record and return the guest's first name
  (don't trust client input).
- **Sign out**: clears guest state → returns to login screen.
- **Smooth scroll**: nav links call a smooth `window.scrollTo` to
  `el.getBoundingClientRect().top + pageYOffset - (navHeight + 8)`. Don't use
  `scrollIntoView`.
- **Scroll spy**: a passive scroll listener finds the last section whose top is
  ≤ navHeight + 20 and sets it as active. Runs on mount and on scroll.
- **RSVP**: choosing "Joyfully accepts" reveals dietary + song fields. "Regretfully
  declines" hides them. Submit is disabled until an attending choice is made.
- **No animations beyond**: button hover color transitions (0.2s), input
  border-color (0.2s), choice-tile active state (0.2s scale on inner dot).
  No page transitions, no parallax.

## State Management
Three pieces of state, all client-side in the prototype:
- `guest: { firstName, code } | null` — top-level. Drives login vs. main.
- `active: string` — current section id for the navbar (in `MainSite`).
- RSVP local state (in `RSVP`):
  - `attending: "yes" | "no" | null`
  - `diet: "none" | "vegetarian" | "vegan"` (default `"none"`)
  - `song: string`
  - `submitted: boolean`

In production: persist the RSVP server-side keyed by invite code, surface the
existing answer on load so a guest can edit, and consider rate-limiting code
attempts.

## Design Tokens

```
/* Color */
--ivory:        #f6f1e7;   /* page background */
--ivory-soft:   #f1ead9;   /* placeholder stripes (alt) */
--paper:        #fbf7ed;   /* cards, bands */
--ink:          #2b2a26;   /* body text, dark band bg */
--ink-soft:     #5b5750;   /* secondary text */
--ink-faint:    #8a857c;   /* tertiary text, captions */
--rule:         #ddd4bf;   /* primary borders */
--rule-soft:    #e7dfc9;   /* secondary borders */
--sage:         #7a8a72;   /* accent base */
--sage-deep:    #5d6e57;   /* accent emphasis (italics, active nav) */
--sage-tint:    #e3e7dd;   /* radial glows */

/* RSVP-band-only tints */
sage-on-ink:    #c7d3bd;
ivory-25:       rgba(246,241,231,0.25);
ivory-40:       rgba(246,241,231,0.40);
ivory-65:       rgba(246,241,231,0.65);
ivory-80:       rgba(246,241,231,0.80);

/* Error palette */
error-fg:       #8a3a2b;
error-bg:       #f4e5dd;
error-border:   #e3c8b8;

/* Typography */
--display:  "Cormorant Garamond", "Garamond", serif;   /* Google Font, weights 300/400/500/600/700 + italic 400 */
--body:     "Lora", Georgia, serif;                    /* Google Font, weights 400/500 + italic 400 */
--ui:       "Work Sans", system-ui, sans-serif;        /* Google Font, weights 400/500/600 */

/* Type scale (px) */
display:    152 / 76 / 60 / 48 / 44 / 28 / 26 / 24 / 22 / 19 / 18 / 16
body:       18 / 17 / 15 / 14 / 13
ui:         11 / 10 / 9      (always uppercase + tracked)

/* Tracking (letter-spacing) */
ui-default: 0.30em
ui-tight:   0.24em
ui-wide:    0.36em
ui-extra:   0.40em
display:    -0.01em

/* Spacing scale (px, observed) */
4, 6, 8, 10, 12, 14, 16, 18, 22, 24, 28, 32, 36, 48, 56, 64, 80, 96, 120

/* Container */
max-content-width: 1180px (most sections)
narrow:            980px  (dress, registry, hero image)
form/text:         760/720/560px

/* Breakpoint */
mobile/tablet: ≤ 1040px

/* Radius */
0 everywhere except 50% circles (radio, registry marks, check icon, ornament dots,
hero meta dots, login-card gradients).

/* Shadow */
Login card: 0 1px 0 rgba(0,0,0,0.02), 0 30px 60px -30px rgba(60,55,40,0.18)
Everywhere else: none.
```

## Assets

The prototype uses **no real images** — every photo is a striped CSS placeholder
(repeating 45° gradient between `--ivory-soft` and `--paper` with a centered
uppercase caption). When implementing, swap these for real `<img>` elements but
keep the aspect ratios:
- Hero — 16:9
- Story portrait — 3:4
- Venue exterior — 1:1
- Each accommodation card — 4:3

No icons. The only "iconography" is geometric: dots, diamonds, thin rules, and
a single check (the literal "✓" character) in the RSVP success state. Keep it
that way — don't introduce an icon library.

Google Fonts to import:
```
Cormorant Garamond: 300, 400, 500, 600, 700, 400 italic
Lora: 400, 500, 400 italic
Work Sans: 400, 500, 600
```

## Files in this bundle
- `Wedding RSVP.html` — the full reference prototype. Open it in a browser to
  see all states (login, scroll-spy, RSVP yes/no branching, confirmation).
- `README.md` — this document.

## Implementation notes for the developer

- The reference is a single HTML file with inline React via Babel for prototype
  speed. Don't ship it that way. Split into proper components in the target
  codebase (`<Login>`, `<Navbar>`, `<Hero>`, `<OurStory>`, `<Schedule>`, `<Venue>`,
  `<Stays>`, `<DressCode>`, `<Registry>`, `<RSVP>`, `<Footer>`).
- The RSVP form is the only piece with a real backend dependency — wire it to
  whatever the project's chosen backend is (Supabase, a Google Sheet, Resend +
  a Worker, etc.). The invite code → guest record lookup belongs there too.
- All copy in the prototype is placeholder. Expect the couple to provide final
  story, schedule, venue text, accommodations, registry links, and the email
  address in the "lost your code" hint.
- The design is mobile-aware down to ~360px but is not phone-first; verify on
  iPhone SE width before shipping. The `≤ 1040px` breakpoint collapses 2- and
  3-column grids to single column; you may want a second breakpoint around 640px
  for finer mobile polish.
- Accessibility to-dos that the prototype does not handle: associate the choice
  buttons with proper `radiogroup` / `aria-checked` semantics; give the success
  state focus management; add `aria-current="true"` on the active nav link;
  ensure focus rings are visible on the dark-band inputs.
