# DESIGN.md — Askari-style Academy Landing Page (desktop reference + proposed responsive)

## 1. Read first

**Legend**
- ✓ observed in the screenshot
- ≈ estimate (all hex and px values are ≈ unless marked ✓)
- ? unknown
- [NEW] proposed, not in the screenshot

**Reference screenshot:** `reference/askari-academy-desktop.png` (compare against this; do not copy its copy/brand, see §9).
Scale note ≈: the screenshot is ~949px wide. Treat it as a 1440px design scaled ×0.66. All px values below are converted to the 1440 desktop width.

**Tone:** Disciplined military-prep academy, calm and credible rather than loud. Visual recipe: a dark, grainy black-and-white hero with a huge sage-grey tight-set headline, then a clean WHITE page with emerald-green tracked uppercase headings, thin-bordered white cards with soft shadows, and one dark olive-green footer. Wide letter-spacing on headings and labels is the signature. Army tank/anchor/plane/shield iconography is the only decoration. Stack: HTML + Tailwind CSS only, no JS-dependent visuals except the menu toggle and reveal-on-scroll.

## 2. Color tokens

```css
:root {
  /* Brand */
  --green-500: #44B47F;   /* ≈ primary: headings, icons, dividers, back-to-top shape, CTA [NEW] */
  --green-600: #3A9C6D;   /* [NEW] hover/pressed */
  --coral-500: #E85D55;   /* ≈ accent: ONLY the strip under the hero */
  --cream-300: #DAD7A5;   /* ≈ footer wordmark only */
  --sage-300:  #B9C1B5;   /* ≈ hero H1 + footer tagline */

  /* Surfaces */
  --bg-page:   #FFFFFF;   /* ✓ all content sections are white, no alternating tints */
  --bg-hero:   #6E6E6E;   /* ≈ fallback behind the grayscale photo */
  --bg-strip:  #262E3E;   /* ≈ navy strip under hero */
  --bg-footer: #1F2722;   /* ≈ dark olive-black */
  --bg-legal:  #171C19;   /* ≈ footer bottom bar, ? could be same as footer */
  --bg-map:    #1B2233;   /* ≈ dark map tile */
  --bg-badge:  #3A3A3C;   /* ≈ numbered circles in About */

  /* Text */
  --text-heading: #111111; /* ≈ statement heading, card body, About questions */
  --text-body:    #2B2B2B; /* ≈ */
  --text-muted:   #4A4A4A; /* ≈ contact values, answers */
  --text-on-dark: #FFFFFF;
  --text-on-dark-muted: #C9D0CA; /* ≈ footer small text */

  /* Lines & shadows */
  --border-card: #C9CCCB;  /* ≈ 1px card border */
  --shadow-card: 0 4px 14px rgba(0,0,0,.10);        /* ≈ */
  --shadow-card-hover: 0 8px 22px rgba(0,0,0,.16);  /* [NEW] */
  --icon-olive:  #5F705F;  /* ≈ tank silhouettes */
}
```

**Usage rules**
- Green = section H2s, service-card titles and icons, ornament dividers, back-to-top shape, CTA. Never as a large background except the back-to-top shape and the CTA.
- Coral = only the strip text. Never on white (fails contrast).
- Cream = only the footer wordmark.
- Black/near-black text on white for everything not green.
- Cards are always white with a 1px grey border; never colored fills.

**Tailwind extension (visual tokens only)**
```js
theme: { extend: {
  colors: { brand: { DEFAULT:'#44B47F', dark:'#3A9C6D' }, coral:'#E85D55', cream:'#DAD7A5',
            sage:'#B9C1B5', strip:'#262E3E', footer:'#1F2722', legal:'#171C19', mapbg:'#1B2233',
            badge:'#3A3A3C', line:'#C9CCCB', olive:'#5F705F' },
  fontFamily: { display:['Lexend','sans-serif'], sans:['Montserrat','sans-serif'], serif:['"Playfair Display"','serif'], hero:['Inter','Helvetica','Arial','sans-serif'] },
  boxShadow: { card:'0 4px 14px rgba(0,0,0,.10)', cardHover:'0 8px 22px rgba(0,0,0,.16)' }
}}
```

## 3. Typography

Three voices ≈: a wide geometric sans for tracked headings/labels (**Lexend**, ?), a humanist-geometric sans for body/UI (**Montserrat**, ?), an italic didone/transitional serif for course names (**Playfair Display Italic**, ?). Hero H1 is a heavy neo-grotesque (**Inter 800 / Helvetica Bold**).

| Element | Font | Size (1440) | Weight | Line-height | Tracking | Notes |
|---|---|---|---|---|---|---|
| Hero eyebrow "brand name" | Montserrat | 24px / 1.5rem | 400 | 1.2 | 0.02em | uppercase, #F2F2F2 |
| Hero H1 | Inter | clamp(3rem, 6vw, 5.5rem) ≈ 88px | 800 | 0.82 | −0.06em ≈ | uppercase, 3 lines, color sage-300 |
| Strip text | Montserrat | 13px | 500 | 1 | 0.35em | uppercase, coral, centered |
| Section H2 | Lexend | clamp(1.75rem, 3vw, 2.6rem) ≈ 42px | 600 | 1.1 | 0.22em | uppercase, green, centered |
| Statement heading | Montserrat | 24px / 1.5rem | 700 | 1.3 | 0 | uppercase, near-black, centered |
| Service card title | Montserrat | 20px | 500 | 1.2 | 0.02em | uppercase, green, centered |
| Service card body | Montserrat | 15px | 600 | 1.5 | 0 | left-aligned, near-black |
| Address quote (as observed ✓) | Lexend | 11px | 300 | 2.2 | 0.3em | justified; see §9 for the readable fix |
| Address quote [NEW readable] | Montserrat | 15px | 400 | 1.75 | 0.02em | |
| Course name | Playfair Display | 15px | 400 italic | 1.3 | 0 | |
| Course duration | Lexend | 30px | 700 | 1 | 0.25em | uppercase, centered |
| Course bullets | Montserrat | 12px | 400 | 1.6 | 0.02em | disc bullets |
| Price | Montserrat italic | 12px | 400 | 1 | 0.15em | uppercase |
| About numeral | Montserrat | 20px | 600 | 1 | 0 | white in badge |
| About question | Montserrat | 14px | 700 | 1.3 | 0.01em | uppercase |
| About answer | Montserrat | 14px | 400 | 1.5 | 0 | muted |
| "Find us here" | Montserrat | 32px / 2rem | 700 | 1.1 | 0 | Title Case, green, NOT tracked (✓ inconsistent with other H2s) |
| Contact label | Montserrat | 18px | 700 | 1.2 | 0 | uppercase |
| Contact value | Lexend | 17px | 300 | 1.5 | 0.3em | muted |
| Footer wordmark | Lexend | 22px | 400 | 1 | 0.2em | uppercase, cream |
| Footer tagline | Montserrat | 11px | 400 | 1 | 0.3em | uppercase, sage |
| Footer column heading | Lexend | 20px | 400 | 1.2 | 0.05em | uppercase, white |
| Footer links | Montserrat | 13px | 600 | 1.15 | 0.01em | uppercase, white, tight stack |
| Footer small text | Montserrat | 12px | 400 | 1.5 | 0 | on-dark-muted |
| Legal bar | Montserrat | 11px | 400 | 1 | 0 | white, left |

Distinctive treatments: wide-tracked uppercase headings; collapsed, ultra-tight hero headline; italic serif only on course names; Title Case only on "Find us here" (see §9).

## 4. Layout and spacing

- **Page:** single column, full-bleed sections, white page background.
- **Content containers (≈):**
  - Commandant card: 645px wide, centered.
  - Service cards row: 1000px wide, 3 columns, gap ≈ 6px ✓ (very tight; keep).
  - Courses row: 2 cards, 264px each, gap ≈ 92px, centered.
  - About list: ≈ 984px wide, centered; text left-aligned inside.
  - Contact + map row: ≈ 913px wide, 2 columns, gap ≈ 22px.
  - Footer: full-bleed, own side padding ≈ 35px.
- **Vertical rhythm ≈:** each content section ≈ 96px top/bottom padding (`py-24`). Ornament → H2 ≈ 30px. H2 → content ≈ 85–90px. About items pitch ≈ 99px. Footer top padding ≈ 90px below the brand row.
- **Alignment:** headings centered; card text mixed (titles/icons centered, body left) ✓; About list left; footer columns left.
- **Radii ≈:** cards 6px, contact card and map 8px, number badges full circle, hero icon buttons full circle.
- **Borders/shadows:** 1px --border-card + --shadow-card on every card. No gradients except the ornament lines fading at their ends.
- **Hero height ≈ 812px** (min-h 85svh).

## 5. Components

**Hero icon buttons (✓ two, overlay on the photo)**
- Left (menu toggle): ≈ 32px circle, 1.5px white outline, transparent fill, right-arrow glyph inside. Position: top ≈ 54px, left ≈ 48px.
- Right (call/WhatsApp): ≈ 32px solid white circle, grey phone-handset glyph. Position: top ≈ 54px, right ≈ 54px.
- States [NEW]: hover → left fills white with dark arrow, right scales 1.08; focus → 2px outline `--green-500` offset 3px; touch target expanded to 44px via padding. Left toggle opens the menu drawer; right links to WhatsApp (`wa.me`).

**Menu drawer [NEW]:** slides from the left, 320px wide, bg `--bg-strip`, links Home / Courses / About / Contact Us (4 links only, since Information and Commission Dates are removed). Montserrat 14px 600 uppercase, tracking 0.2em, white, hover → green. Close icon replaces the arrow. Scrim rgba(0,0,0,.5).

**Navigation:** no visible top nav bar ✓. Transparent overlay icons only. Not sticky ?.

**Strip (✓):** full-width bar ≈ 30px tall, bg `--bg-strip`, centered coral tracked uppercase text.

**Ornament divider (✓):** centered row ≈ 570px wide: 1px green lines left/right, fading toward the outer ends [≈ gradient from transparent to green], a ≈ 24px green four-pointed "✥" glyph at the center. Sits ≈ 30px above each section H2 (not above "Find us here").

**Cards (✓):** white, 1px --border-card, radius 6px, --shadow-card. Hover [NEW]: translateY(−2px), --shadow-card-hover, border → green, transition 200ms ease.

**Service card:** ≈ 329×262px; padding ≈ 28px; title, then icon (≈ 30px, green, Font-Awesome-solid style: shield / airplane / anchor), then body.

**Course card:** ≈ 264×337px, padding ≈ 20px. Order: italic serif name → big tracked duration → disc bullet list → **footer strip** pinned to the bottom (≈ 54px tall, own 1px border, radius 6px, overlapping the card's bottom edge) containing price (left) and black graduation-cap icon (≈ 28px, right).

**Number badge (✓):** 50px circle, --bg-badge, white numeral.

**Contact card (✓):** ≈ 440×270px, white, 1px border, radius 8px, shadow; labels bold, values tracked light.

**Map block (✓):** ≈ 446×270px, radius 8px, dark navy styled map with faint street lines (≈ #2B3449), no labels, no border, no pin visible ✓. Embed an iframe/static dark-styled map; [NEW] add a small green pin.

**Back-to-top shape (✓):** green polygon flush to the footer top-right, ≈ 258×78px, left edge slanted: `clip-path: polygon(24% 0,100% 0,100% 100%,0 100%)` ≈. Contains a white upward triangle (≈ 32px) + two-line "BACK / TO TOP" (12px, tracking 0.1em, pale mint-white). Hover [NEW]: bg → `--green-600`; focus ring white 2px.

**Footer social icons (✓):** Instagram (gradient), WhatsApp (green), Facebook (blue), ≈ 22px, colored brand icons, gap ≈ 12px. Hover [NEW]: scale 1.1.

**CTA button [NEW]:** `bg-brand text-white font-bold uppercase text-sm tracking-[0.12em] px-7 py-3.5 rounded-md`, hover `bg-brand-dark`, focus ring 2px green offset 2px, min-height 44px.

**Image treatment (✓):** hero photo is monochrome/posterized with heavy grain (? baked in or CSS). Replicate: `object-cover`, `filter: grayscale(1) contrast(1.15)`, subtle black overlay rgba(0,0,0,.2). Subject sits right of center; keep `object-position ≈ 65% 30%`.

## 6. Section by section (page order)

**6.1 Hero ✓** Full-width, ≈ 812px tall. B&W photo of a soldier in helmet aiming a scoped rifle, left side clear. Overlays: two icon buttons (§5). Text block bottom-left, left ≈ 83px, bottom ≈ 130px: eyebrow (brand name) over a 3-line H1. Words are set extremely tight. [NEW] CTA button 24px below H1.

**6.2 Strip ✓** Navy bar directly under the hero, single tracked coral uppercase line, centered.

**6.3 Commandant's Address ✓** Ornament + H2. Card 645×310px, centered, ≈ 60px below the H2. Inside: bold "By …:" line (≈ 11px), then justified quote with wide tracking, tank silhouette (≈ 78px, olive) at bottom-right.

**6.4 Statement + Service cards ✓** ≈ 117px below the address card. Centered uppercase bold statement heading (1 line at 1440). ≈ 83px below: three cards in a row (Army, PAF, Navy), gap 6px, each with green title, green icon, left-aligned bold body (≈ 5 lines).

**6.5 Our Courses ✓** Ornament + H2. One-line bold centered subtitle (16px, 600, near-black). Two course cards ≈ 92px below, centered, gap ≈ 92px. Each: name, "10 DAYS" / "15 DAYS", 4 bullets, footer strip with price + graduation cap. Both cards identical structure.

**6.6 About Us ✓** Ornament + H2. Four numbered Q&A rows, pitch ≈ 99px: badge at left, then bold uppercase question with a one-line answer under it. Left-aligned within the 984px container.

**6.7 Find us here ✓** ≈ 138px below the last About row. Title-case green H2, no ornament. ≈ 80px below: two columns: contact card (CONTACT / ADDRESS / EMAIL blocks, label above value) and dark map.

**6.8 Footer ✓** Full-bleed `--bg-footer`, ≈ 325px tall. Top row: tank logo (≈ 105px, olive) + cream wordmark + tagline; back-to-top shape flush right. Below: 4 columns at x ≈ 35 / 441 / 786 / 1129:
1. Nav links, tight stack: **HOME, COURSES, ABOUT, CONTACT US** (4 links, see §9).
2. LOCATION: address (2 lines), pin icon + underlined "Map" link.
3. CONTACTS: Telephone, Mobile, E-mail lines.
4. FOLLOW US: three colored icons.

**6.9 Legal bar ✓** ≈ 38px strip at the very bottom, `--bg-legal`, 11px white disclaimer, left-aligned, ≈ 14px left padding.

## 7. Mobile and tablet [NEW — screenshot is desktop only]

**Tablet (768–1023px)**
- Hero ≈ 70svh; H1 ≈ 64px.
- Service cards: 3 → stacked 1 column (or 2 + 1), gap 16px.
- Courses: 2 columns, gap 24px.
- Contact + map: stacked, full width, map 280px high.
- Footer: 2×2 grid.

**Mobile (<768px)**
- Hero ≈ 75svh. H1 clamp ≈ 44px, left 24px, bottom 64px. Icon buttons 40px, 16px from edges.
- Strip: 12px text, tracking 0.2em, wraps to 2 lines (≈ 48px tall).
- Section padding 64px; H2 28px with tracking 0.15em; ornament 80% width.
- Commandant card full-width minus 24px, text 15px (see §3 readable variant).
- Service cards: 1 column, gap 16px, full width.
- Course cards: 1 column, full width, max 340px, gap 24px.
- About rows: badge 40px; question/answer 14px.
- Contact card above map; both full-width, map 260px high.
- Footer: 1 column, left aligned; back-to-top shape shrinks to ≈ 160×56px.
- Menu drawer: 85vw width.

## 8. Motion (subtle only)

- Hover/focus transitions 200ms ease on cards, icons, buttons.
- Section reveal on scroll [NEW]: opacity 0→1 and translateY 12px→0, 400ms ease-out, once per element, no stagger over 80ms.
- Menu drawer: slide 250ms ease-out.
- Strip: static [NEW]; ? original may have a marquee. Do not add one unless confirmed.
- Reduced-motion rule:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  .reveal { opacity: 1 !important; transform: none !important; }
}
```

## 9. Reference flaws not to copy, and intentional differences to keep

**9a. Intentional differences — the coding agent must KEEP these when comparing to the screenshot (do not "fix" back):**
- **Brand name:** replace "Askari Academy" everywhere (hero eyebrow, footer wordmark, page title).
- **Logo:** the owner's logo replaces the tank wordmark logo in the footer.
- **All copy** is the owner's own; reference text above is placeholder-length guidance only.
- **Phone, email, address, map location:** the owner's real values.
- **Footer/menu nav:** "Information" and "Commission Dates" are removed (4 links total).
- **Photo (hero) and tank/other icons:** kept as in the reference unless the owner replaces them.
- **[NEW] CTA buttons** (hero + About step 4) do not exist in the reference; keep them.
- **[NEW] Menu drawer, hover states, readable text variants** are intentional additions.

**9b. Flaws not to copy:**

| Flaw in reference | Fix |
|---|---|
| Hero H1 words collapse ("THEOFFICER", "INYOU") | Tracking −0.04em ≈ plus `word-spacing: 0.15em`; verify words read separately |
| Strip text coral on navy ≈ 3.2:1 contrast | Lighten to ≈ #FF7A70 or enlarge to 14px bold (target ≥ 4.5:1) |
| Commandant's quote 11px with 0.3em tracking, justified: unreadable | 15px, tracking 0.02em, left-aligned, line-height 1.75 |
| "UR BEST CHANCE" in heading | "YOUR BEST CHANCE" |
| "HOW AQUAINTED…" typo | "HOW ACQUAINTED…" |
| "cope up until your course completes" | "keep up until your course is complete" |
| About Q1 ("WHAT PAK ARMY WINGS…") answered with unrelated text | Answer must name the wings (Army / PAF / Navy) |
| "WHERE DO I BEGIN?" says contact via WhatsApp but there is no button | Add the CTA button [NEW] with a WhatsApp link |
| Course duration renders as "I0 DAYS", "I5 DAYS" (looks like the letter I) | Use real digits; pick a font whose "1" is legible |
| Telephone and Mobile show the same number | Show one number, or two distinct numbers; label "Phone" only once |
| Phone shown as "+92 333 3044777" with irregular spacing | Format "+92 333 3044777" consistently in all places; `tel:+923333044777` links |
| Email "example@gmail.com" placeholder | Use the real email with a `mailto:` link |
| Address lowercase and abbreviated ("hashmi garden, bwp") | Title Case, full city name |
| Map is a pin-less placeholder | Real embed or static map with a green pin |
| "Find us here" breaks the heading style (Title Case, no tracking, no ornament) | Convert to the section H2 style: "FIND US HERE" with ornament |
| Service cards: title/icon centered but body left-aligned | Observed ✓ and acceptable; [NEW] option: center the body on mobile |
| Service-card gap 6px is cramped | Keep ✓ on desktop only if matching reference; otherwise 16px |
| Wide-tracked light text in contact card hard to read | Reduce tracking to 0.15em, weight 400 |
| Footer link block has no spacing between links | Add 6px vertical gap for touch targets |

## 10. Verify before handoff

| Item | Why uncertain | How to check |
|---|---|---|
| Green #44B47F | Estimated from a downscaled PNG | Eyedropper on the "COMMANDANT'S ADDRESS" heading and the back-to-top shape |
| Navy #262E3E, footer #1F2722, map #1B2233 | Estimated | Eyedropper on each surface |
| Coral #E85D55 | Thin text, anti-aliased | Zoom to 400% and eyedropper a letter stem |
| Fonts (Lexend / Montserrat / Playfair / Inter) | Closest matches by eye | Compare glyphs: Lexend "R", Montserrat "G", Playfair italic "I". Or inspect the original site if known |
| Hero H1 size and tracking | Letters overlap, hard to measure | Overlay the screenshot at 40% opacity and tune |
| Hero height ≈ 812px | Screenshot scale assumed ×1.52 | Measure at 1440px width on the original |
| Photo treatment | Baked-in or CSS filter? | Check the original image file for color; if colored, use the CSS filter |
| "I0 DAYS" glyph | Could be font's "1" or a real "I" | Zoom on the original text |
| Ornament glyph (✥) | Small, ≈ 24px | Zoom on the original; swap for an SVG if it differs |
| Back-to-top slant (≈ 24%) | Angle estimated | Overlay and adjust `clip-path` |
| Strip behavior (static vs marquee) | Static image | Check the original in a browser |
| Menu toggle behavior | Not visible | Confirm with the owner; the drawer is [NEW] |
| Footer legal bar color | Barely distinguishable | Eyedropper |
| Icon sets (Font Awesome style) | Judged from shape | Compare with FA Free: shield, plane, anchor, graduation-cap, map-pin |

## 11. Build notes (the 5–8 decisions that make or break the look)

1. **Hero:** grayscale grainy photo plus the giant tight 3-line sage H1, bottom-left. This is the page's identity; get it right first.
2. **Wide-tracked uppercase green H2s** (≈ 0.22em) with the ornament divider above: repeated on three sections, never altered.
3. **All content on pure white** with 1px grey bordered cards and the same soft shadow. No tints, no alternating backgrounds.
4. **Course cards** with the bordered footer strip overlapping the bottom edge: price left, graduation cap right.
5. **Footer:** dark olive with cream tracked wordmark, 4 unequal columns, slanted green back-to-top shape flush top-right.
6. **Keep the navy strip** as the only dark/coral element between the hero and white content.
7. **Fix the unreadable text** (quote card, contact values) while preserving the airy, tracked feel.
8. **Mobile:** stack everything, keep H1 left-aligned, keep the hero icon buttons, and never let tracking cause horizontal scroll.