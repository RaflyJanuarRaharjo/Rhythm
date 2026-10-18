"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { EASE } from "@/components/motion/Reveal";
import { useFitScale } from "@/lib/useFitScale";

// Figma "Footer (grid)": 1392×696 grid, 116px cells, 64px tiles, left column 464px wide.
const CELL = 116;
const TILE = 64;
const GW = 1392;
const GH = 696;
const LW = 464;

type Line = { x: number; y: number; len: number; dir: "h" | "v" };
const LINES: Line[] = [
  { x: LW, y: 0, len: GH, dir: "v" },
  ...[1, 2, 3].map((k) => ({ x: k * CELL, y: 0, len: 2 * CELL, dir: "v" as const })),
  { x: 0, y: CELL, len: LW, dir: "h" },
  { x: 0, y: 2 * CELL, len: LW, dir: "h" },
  { x: LW, y: 4 * CELL, len: GW - LW, dir: "h" },
  { x: LW, y: 5 * CELL, len: GW - LW, dir: "h" },
  ...[1, 2, 3, 4, 5, 6, 7].map((k) => ({ x: LW + k * CELL, y: 4 * CELL, len: CELL, dir: "v" as const })),
  ...[4, 5, 6, 7].map((k) => ({ x: LW + k * CELL, y: 5 * CELL, len: CELL, dir: "v" as const })),
];

type Tile = { col: number; row: number; bg: string; border?: boolean; content: React.ReactNode; label: string; nudge?: boolean };
const TILES: Tile[] = [
  { col: 0, row: 0, bg: "transparent", label: "Rhythm", content: <Image src="/img/mark.png" alt="" width={64} height={64} className="size-16" /> },
  { col: 1, row: 1, bg: "#0369a1", label: "Plan", content: <Icon name="calCheck" size={30} color="#fff" stroke={2} /> },
  { col: 3, row: 1, bg: "#f59e0b", label: "Spark", content: <Icon name="burst" size={32} color="#fff" stroke={2.2} /> },
  { col: 8, row: 4, bg: "#fff", border: true, label: "Figma", content: <Image src="/img/footer/figma.png" alt="" width={34} height={34} /> },
  { col: 10, row: 4, bg: "#fff", border: true, label: "GitHub", content: <Image src="/img/footer/github.png" alt="" width={34} height={34} /> },
  { col: 11, row: 5, bg: "#10b981", label: "Get started", nudge: true, content: <Icon name="arrowUpRight" size={30} color="#fff" stroke={2.4} /> },
];

const COLS = [
  { h: "Product", items: [["Features", "#feature"], ["How it works", "#how-it-works"], ["Integrations", "#integrations"], ["Pricing", "#pricing"]] },
  { h: "Company", items: [["About", "#about"], ["Careers", "#"], ["Blog", "#"], ["Contact", "#"]] },
  { h: "Resources", items: [["Help center", "#"], ["API docs", "#docs"], ["Status", "#"], ["Changelog", "#"]] },
  { h: "Social", items: [["X / Twitter", "#"], ["LinkedIn", "#"], ["Discord", "#"], ["Dribbble", "#"]] },
];

const HEADLINE = ["Plan calmly. Let AI", "handle the rest."];

function TileBox({ t, delay, show }: { t: Tile; delay: number; show: boolean }) {
  return (
    <motion.a
      href={t.nudge ? "#signup" : "#top"}
      aria-label={t.label}
      className="absolute flex items-center justify-center"
      style={{
        left: t.col * CELL + (CELL - TILE) / 2,
        top: t.row * CELL + (CELL - TILE) / 2,
        width: TILE,
        height: TILE,
        background: t.bg,
        border: t.border ? "1px solid #e4e4e4" : undefined,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={show ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: "spring", stiffness: 380, damping: 18, delay }}
      whileHover={{ rotate: 6, boxShadow: "0 10px 24px rgba(0,0,0,0.12)" }}
    >
      <motion.span className="flex" whileHover={t.nudge ? { x: 4, y: -4 } : undefined}>
        {t.content}
      </motion.span>
    </motion.a>
  );
}

function LinkColumns({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-y-10 sm:grid-cols-4 ${className}`}>
      {COLS.map((c) => (
        <div key={c.h} className="flex flex-col gap-3.5">
          <p className="pb-1 text-[15px] text-sub">{c.h}</p>
          {c.items.map(([label, href]) => (
            <a key={label} href={href} className="link-slide self-start font-mono text-[14px] text-ink transition-colors duration-200 hover:text-accent">
              {label}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}

function Legal() {
  return (
    <div className="flex flex-wrap items-center gap-6 text-[14px] text-sub">
      <span>© 2026 Rhythm</span>
      <a href="#" className="link-slide hover:text-ink">
        Terms &amp; Conditions
      </a>
      <a href="#" className="link-slide hover:text-ink">
        Privacy Policy
      </a>
    </div>
  );
}

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const fit = useRef<HTMLDivElement>(null);
  const scale = useFitScale(fit, GW);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const linesDone = 0.6 + LINES.length * 0.04;

  return (
    <footer className="bg-canvas p-6">
      {/* Desktop: the Figma grid */}
      <div ref={fit} className="mx-auto hidden max-w-[1392px] lg:block" style={{ height: GH * scale }}>
      <div ref={ref} className="relative origin-top-left border border-line" style={{ width: GW, height: GH, transform: `scale(${scale})` }}>
        <div className="absolute inset-0">
          {LINES.map((l, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute bg-line"
              style={{
                left: l.x,
                top: l.y,
                width: l.dir === "h" ? l.len : 1,
                height: l.dir === "v" ? l.len : 1,
                transformOrigin: l.dir === "h" ? "left" : "top",
              }}
              initial={l.dir === "h" ? { scaleX: 0 } : { scaleY: 0 }}
              animate={inView ? (l.dir === "h" ? { scaleX: 1 } : { scaleY: 1 }) : {}}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.04 }}
            />
          ))}

          {TILES.map((t, i) => (
            <TileBox key={t.label} t={t} show={inView} delay={linesDone + i * 0.06} />
          ))}

          <h2 className="absolute bottom-10 left-10 w-[380px] font-display text-[46px] font-semibold leading-[1.08] tracking-[-0.01em] text-ink">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.1 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.div
            className="absolute"
            style={{ left: LW + 40, top: 44, width: 4 * 212 }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
          >
            <LinkColumns className="!grid-cols-4" />
          </motion.div>

          <div className="absolute" style={{ left: LW + 40, top: 5 * CELL, height: CELL }}>
            <div className="flex h-full items-end pb-10">
              <Legal />
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Mobile / tablet: stacked version of the same content */}
      <div className="flex flex-col gap-12 border border-line p-6 lg:hidden">
        <div className="flex gap-3">
          {TILES.map((t) => (
            <span
              key={t.label}
              className="flex size-12 items-center justify-center [&_img]:max-h-7 [&_img]:w-auto [&_svg]:size-6"
              style={{ background: t.bg, border: t.border ? "1px solid #e4e4e4" : undefined }}
            >
              {t.content}
            </span>
          ))}
        </div>
        <LinkColumns />
        <h2 className="font-display text-[36px] font-semibold leading-[1.08] text-ink">Plan calmly. Let AI handle the rest.</h2>
        <Legal />
      </div>
    </footer>
  );
}
