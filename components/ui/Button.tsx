import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "light";

const BASE: Record<Variant, string> = {
  primary: "bg-accent text-canvas",
  dark: "bg-ink text-canvas",
  light: "bg-offwhite text-body",
};
// Hover sweep colour (slides in from the left)
const SWEEP: Record<Variant, string> = {
  primary: "bg-[#075985]",
  dark: "bg-[#262626]",
  light: "bg-[#e6e9e1]",
};

/**
 * Ritme button (Figma "Button" component). Primary = main CTA, dark/light for nav + secondary.
 * Hover: background sweeps in from the left; optional arrow nudges 4px.
 */
export function Button({
  variant = "primary",
  href = "#",
  children,
  arrow = false,
  className = "",
  textClassName = "",
}: {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  arrow?: boolean;
  className?: string;
  textClassName?: string;
}) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden px-6 py-4 font-sans text-[16px] font-medium leading-[1.2] tracking-[-0.16px] whitespace-nowrap ${BASE[variant]} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 -translate-x-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 ${SWEEP[variant]}`}
      />
      <span className={`relative ${textClassName}`}>{children}</span>
      {arrow && (
        <svg
          aria-hidden
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="relative transition-transform duration-200 group-hover:translate-x-1"
        >
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </a>
  );
}
