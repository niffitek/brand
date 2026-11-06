# niffi brand

One place for the fonts, colors and marks used by [niffi.dev](https://niffi.dev), dailies and icke cup.
Consumers pin a tag and update with one bump, so the three never drift apart again.

```
tokens.css      palette and font stacks as --niffi-* custom properties
theme.css       the same as a Tailwind v4 @theme (bg-night, text-lavender, font-display, ...)
fonts.css       @font-face for the four faces, files in fonts/
react/          Comet, NiffiLogo, DailiesWordmark, IckeCupLogo, BRAND, ICKE
html/           marks.css + marks.html, the same marks for plain HTML
icons/          favicon.svg (rounded) and icon-512.svg (maskable)
```

## Using it

**Next.js / Vite** (dailies, icke-scores):

```sh
pnpm add github:niffitek/brand#v0.1.1
```

```css
/* app/globals.css */
@import "tailwindcss";
@import "@niffi/brand/fonts.css";
@import "@niffi/brand/theme.css";
```

```ts
// next.config.ts: the React marks ship as plain .tsx
const nextConfig = { transpilePackages: ["@niffi/brand"] };
```

```tsx
import { DailiesWordmark, NiffiLogo } from "@niffi/brand/react";
<DailiesWordmark className="text-[24px] md:text-[34px]" />
```

**Plain HTML** (niffi.dev, no build step), from the jsDelivr GitHub CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/niffitek/brand@v0.1.1/fonts.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/niffitek/brand@v0.1.1/html/marks.css">
```

Then paste the gradient `<defs>` and the mark you need from `html/marks.html`.

## Colors

| Token | Hex | Role |
| --- | --- | --- |
| Night | `#16121F` | main background |
| Dusk | `#231D33` | panels, cards, hover on Night |
| Deep | `#1C1729` | deeper panels, the ring around the dailies comet head |
| Stardust | `#F6F4FA` | text and borders on Night |
| Mist | `#A8A1B8` | secondary text |
| Lavender | `#C4A7F0` | the brand color: comet head, primary buttons, shadows |
| Violet | `#7C5CC4` | icons, Lavender's stand-in on light backgrounds |
| Ember | `#F4B183` | the niffi comet tail, highlights, accents |
| Mint | `#9EE0C4` | links, success, calls to action, the dailies comet tail |

Stardust on Night is the default pairing. Lavender, Ember and Mint are accents: one per surface,
never all three. On a light background use Violet instead of Lavender for anything that must be read.

## Type

| Role | Face | Where |
| --- | --- | --- |
| Display, wordmarks | Bricolage Grotesque, variable (weight 200-800, width 75-100, optical size 12-96) | headlines, the marks |
| Body | Outfit, variable | running text and UI in the apps |
| Mono | JetBrains Mono, variable | meta lines, code, data; DM Mono 400/500 is the softer alternative |

Headlines are Bricolage 800 with letter-spacing between -0.03em and -0.05em. For condensed
headlines use `font-stretch: 75%`, the way niffi.dev sets its section titles.

## The comet

Every mark is the same construction: a dotless i (`ı`, U+0131) with the comet replacing its dot.

- Type: Bricolage Grotesque 800, `letter-spacing: -0.05em`, `font-variant-ligatures: none`,
  `font-variation-settings: 'opsz' 96` at every size. Without the fixed optical size the browser
  picks a looser text cut below about 34px and the mark stops looking like the logo.
- The comet is a 64x32 SVG, `width: 1.2em; height: 0.6em; left: calc(50% - 1.04em); top: -0.17em`,
  absolutely positioned over the `ı`, which is `position: relative; margin-left: 0.03em`.
- Tail: polygon `56.8,19.3 51.2,28.7 14,0`, gradient from the head color to the tail color fading
  to transparent. Head: circle at (54, 24), r 5.5, with a 3px ring in the background color
  (`paint-order: stroke`), so it reads as sitting on top of the stem.
- Size with `font-size` only. Reference sizes: niffi.dev nav 26px, hero `clamp(96px, 17vw, 260px)`;
  dailies 34px desktop, 24px mobile; icke cup `clamp(48px, 7vw, 72px)` on the project card.

| Mark | Letters | Head | Tail | Which i |
| --- | --- | --- | --- | --- |
| niffi | Stardust, `ff` at -0.06em | Lavender | Ember | the last |
| dailies | inherits the text color | Lavender, Deep ring | Mint | the last (5th letter) |
| icke cup | icke red `#DA333C`, cup green `#149567` | a volleyball | green | the first |

The Mint tail is what tells dailies apart from the main logo. icke cup keeps its own colors and a
wider comet (1.3em, `top: -0.3em`), with `padding-left: 0.9em` for the tail.

## Do / don't

- Do keep the marks lowercase; "niffi", "dailies" and "icke cup" are never capitalised.
- Do put the marks on Night or on the app's own dark surface. The niffi logo is always Stardust.
- Don't scale the comet separately from the letters, add a glow by default, or move the head off the stem.
- Don't recolor the niffi comet; a new product gets its own tail color, like dailies got Mint.
- Don't use Lavender for text on light backgrounds; that is what Violet is for.
- Don't load the display face from Google Fonts in apps; ship the file from this package so every
  consumer renders the same cut.

## Releasing

Bump `version` in package.json, commit, tag `vX.Y.Z`, push with tags. Consumers update the ref in
their package.json and lockfile; a fix here reaches no app until its consumer bumps.
