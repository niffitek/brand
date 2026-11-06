// The niffi marks as React components. Plain TSX, no build step: add "@niffi/brand" to
// `transpilePackages` in next.config. Load "@niffi/brand/fonts.css" once on the page.
//
// Every mark is Bricolage Grotesque 800 at optical size 96, letter-spacing -0.05em, ligatures off,
// sized with font-size (dailies: 34px desktop, 24px mobile; niffi.dev nav: 26px). The comet
// replaces the dot of a dotless i (U+0131): head centre about 0.55em above the baseline, slightly
// left of the stem, covering its end.
import { type CSSProperties, type ReactNode, useId } from "react";

export const BRAND = {
  night: "#16121F",
  dusk: "#231D33",
  deep: "#1C1729",
  stardust: "#F6F4FA",
  mist: "#A8A1B8",
  lavender: "#C4A7F0",
  violet: "#7C5CC4",
  ember: "#F4B183",
  mint: "#9EE0C4",
} as const;

/** icke cup colors: volleyball red and green, ink for outlines. */
export const ICKE = { red: "#DA333C", green: "#149567", ink: "#1C1917" } as const;

const markStyle: CSSProperties = {
  fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
  fontWeight: 800,
  letterSpacing: "-0.05em",
  lineHeight: 1,
  fontVariantLigatures: "none",
  // always the display cut: with optical sizing on auto, small sizes switch to a looser text cut
  fontVariationSettings: "'opsz' 96",
  whiteSpace: "nowrap",
  display: "inline-flex",
  alignItems: "baseline",
};

const cometStyle: CSSProperties = {
  position: "absolute",
  width: "1.2em",
  height: "0.6em",
  left: "calc(50% - 1.04em)",
  top: "-0.17em",
  overflow: "visible",
  pointerEvents: "none",
};

export interface CometProps {
  /** Head color, also the start of the tail gradient. */
  head?: string;
  /** Tail color, fading to transparent. */
  tail?: string;
  /** Ring around the head, normally the background color. */
  ring?: string;
  /** Replaces the default round head (same 64x32 viewBox, head centre at 54,24). */
  children?: ReactNode;
  /** Tail polygon, default is the niffi comet. */
  points?: string;
  style?: CSSProperties;
}

/** The comet alone, absolutely positioned over a relatively positioned dotless i. */
export function Comet({
  head = BRAND.lavender,
  tail = BRAND.ember,
  ring = BRAND.night,
  children,
  points = "56.8,19.3 51.2,28.7 14,0",
  style,
}: CometProps) {
  const id = `comet${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg aria-hidden viewBox="0 0 64 32" style={{ ...cometStyle, ...style }}>
      <defs>
        <linearGradient id={id} x1="1" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={head} />
          <stop offset="0.5" stopColor={tail} stopOpacity="0.6" />
          <stop offset="1" stopColor={tail} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={points} fill={`url(#${id})`} />
      {children ?? (
        <circle cx="54" cy="24" r="5.5" fill={head} stroke={ring} strokeWidth="3" paintOrder="stroke" />
      )}
    </svg>
  );
}

function CometI(props: CometProps) {
  return (
    <span style={{ position: "relative", marginLeft: "0.03em" }}>
      ı<Comet {...props} />
    </span>
  );
}

interface MarkProps {
  className?: string;
  /** Letter color. Defaults to the surrounding text color. */
  color?: string;
  style?: CSSProperties;
}

function Mark({
  label,
  className,
  color,
  style,
  children,
}: MarkProps & { label: string; children: ReactNode }) {
  return (
    <span role="img" aria-label={label} className={className} style={{ ...markStyle, color, ...style }}>
      <span aria-hidden style={{ display: "contents" }}>
        {children}
      </span>
    </span>
  );
}

/** The main niffi logo: Stardust letters, Lavender head, Ember tail. */
export function NiffiLogo({ color = BRAND.stardust, ...props }: MarkProps) {
  return (
    <Mark label="niffi" color={color} {...props}>
      ni<span style={{ letterSpacing: "-0.06em" }}>ff</span>
      <CometI head={BRAND.lavender} tail={BRAND.ember} ring={BRAND.night} />
    </Mark>
  );
}

/** dailies: the comet on the last i with a Mint tail, so it stays in the family but never reads as the main logo. */
export function DailiesWordmark(props: MarkProps) {
  return (
    <Mark label="dailies" {...props}>
      dail
      <CometI head={BRAND.lavender} tail={BRAND.mint} ring={BRAND.deep} />
      es
    </Mark>
  );
}

const SEAMS =
  "M32 32 C 44 28, 44 10, 30 4.2 M32 32 C 29.5 44.4, 45.1 53.4, 57.1 44.2 M32 32 C 22.5 23.6, 6.9 32.6, 8.9 47.6";

/** icke cup: red "icke" with a volleyball comet on the i, green "cup". The tail sticks out to the left, hence the padding. */
export function IckeCupLogo({ className, style }: Omit<MarkProps, "color">) {
  return (
    <span
      role="img"
      aria-label="icke cup"
      className={className}
      style={{ ...markStyle, letterSpacing: "-0.04em", paddingLeft: "0.9em", ...style }}
    >
      <span aria-hidden style={{ display: "contents" }}>
        <span style={{ position: "relative", color: ICKE.red }}>
          ı
          <Comet
            head={ICKE.green}
            tail={ICKE.green}
            points="58.5,17 49.5,30.5 8,0"
            style={{ width: "1.3em", height: "0.65em", left: "calc(50% - 1.12em)", top: "-0.3em" }}
          >
            <g transform="translate(54 24) scale(0.3393) translate(-32 -32)">
              <circle cx="32" cy="32" r="28" fill="#fff" />
              <path
                d="M32 32 C 44 28, 44 10, 30 4.2 A 28 28 0 0 1 57.1 44.2 C 45.1 53.4, 29.5 44.4, 32 32 Z"
                fill={ICKE.red}
              />
              <path
                d="M32 32 C 22.5 23.6, 6.9 32.6, 8.9 47.6 A 28 28 0 0 1 30 4.2 C 44 10, 44 28, 32 32 Z"
                fill={ICKE.green}
              />
              <path d={SEAMS} fill="none" stroke={ICKE.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="32" cy="32" r="28" fill="none" stroke={ICKE.ink} strokeWidth="4" />
            </g>
          </Comet>
        </span>
        <span style={{ color: ICKE.red }}>cke</span>
        <span style={{ color: ICKE.green, marginLeft: "0.22em" }}>cup</span>
      </span>
    </span>
  );
}
