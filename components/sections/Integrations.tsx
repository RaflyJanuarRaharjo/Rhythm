"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { EASE, fadeUp, staggerParent } from "@/components/motion/Reveal";
import { useFitScale } from "@/lib/useFitScale";

// Artboard = the Figma illustration area (1100×720) — everything below is positioned in its coordinates.
const W = 1100;
const H = 720;
const HUB = { x: 557, y: 318 };

const TILES = [
  { k: "figma", x: 68, y: 71, w: 183, h: 141 },
  { k: "sketch", x: 476, y: 56, w: 133, h: 103 },
  { k: "jira", x: 847, y: 56, w: 183, h: 142 },
  { k: "vs", x: 157, y: 304, w: 133, h: 103 },
  { k: "ps", x: 902, y: 294, w: 133, h: 103 },
  { k: "github", x: 69, y: 526, w: 183, h: 141 },
  { k: "html5", x: 476, y: 568, w: 133, h: 103 },
  { k: "js", x: 802, y: 524, w: 183, h: 141 },
];

// Dashed connectors, outer end → hub (from the Figma "Connectors" vectors)
const LINES: [number, number][] = [
  [188, 147],
  [565.1, 120],
  [967.4, 132],
  [244, 367.3],
  [988.5, 357.8],
  [188, 601],
  [559.8, 631.4],
  [922.6, 600],
];

const CHIPS = [
  { x: 29, y: 27, dot: "#16a34a", label: "Design files synced", meta: "· 2m ago", delay: 0.9 },
  { x: 877, y: 13, dot: "#f59e0b", label: "Sprint board updated", delay: 1.0 },
  { x: 40, y: 661, dot: "#0369a1", label: "12 PRs linked", delay: 1.1 },
  { x: 842, y: 659, dot: "#16a34a", label: "Scripts deployed", meta: "· v2.4", delay: 1.2 },
];

/** Status text that occasionally flips (e.g. "· 2m ago" → "· just now") with a slide-up. */
function FlipMeta({ values, every = 5200 }: { values: string[]; every?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (values.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % values.length), every);
    return () => clearInterval(id);
  }, [values, every]);
  return (
    <span className="relative inline-flex h-4 overflow-hidden">
      <motion.span key={values[i]} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.35, ease: EASE }} className="text-faint">
        {values[i]}
      </motion.span>
    </span>
  );
}

export default function Integrations() {
  const wrap = useRef<HTMLDivElement>(null);
  const scale = useFitScale(wrap, W);
  const inView = useInView(wrap, { once: true, amount: 0.25 });
  const [pulse, setPulse] = useState(0);

  // Hub flashes when a packet arrives (packets loop every 2.4s with staggered offsets)
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setPulse((p) => p + 1), 800);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section id="integrations" className="relative overflow-hidden bg-white pb-16 pt-[144px]">
      {/* Backdrop glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[428px] h-[720px] w-[1100px] -translate-x-1/2"
        style={{ background: "radial-gradient(50% 50% at 50% 50%, #eef4f8 0%, rgba(255,255,255,0) 100%)" }}
      />

      <motion.div
        variants={staggerParent(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="container-page relative flex flex-col items-center text-center"
      >
        <motion.h2 variants={fadeUp(16)} className="max-w-[980px] font-display text-[clamp(32px,3.4vw,48px)] font-medium leading-[1.15] tracking-[-0.02em] text-ink">
          Plug rhythm into the tools you already use.
        </motion.h2>
        <motion.p variants={fadeUp(16)} className="mt-4 max-w-[620px] text-[18px] leading-[1.55] text-[#6b6b6b]">
          Design files, code, docs, and chats flow into one clear plan. Connect your stack in minutes, no migration needed.
        </motion.p>
        <motion.div variants={fadeUp(16)} className="mt-6">
          <Button variant="primary" href="#signup" arrow>
            Get Started Free
          </Button>
        </motion.div>
      </motion.div>

      {/* Illustration */}
      <div ref={wrap} className="relative mx-auto mt-[107px] w-full max-w-[1100px] px-4" style={{ height: H * scale }}>
        <div className="absolute left-1/2 top-0 origin-top" style={{ width: W, height: H, transform: `translateX(-50%) scale(${scale})` }}>
          {/* The whole scene floats as one piece so tiles, shadows, connectors and chips stay attached */}
          <div className="absolute inset-0" style={{ animation: inView ? "scene-float 6s ease-in-out infinite" : undefined }}>
          {/* Connectors: flowing dashes */}
          <svg className="absolute inset-0" width={W} height={H} fill="none" aria-hidden>
            {LINES.map(([x, y], i) => (
              <motion.line
                key={i}
                x1={x}
                y1={y}
                x2={HUB.x}
                y2={HUB.y}
                stroke="#8a8a8a"
                strokeWidth="1.5"
                strokeDasharray="5 6"
                style={{ animation: inView ? "dash-flow 1.2s linear infinite" : undefined }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.05 }}
              />
            ))}
          </svg>

          {/* Static hub body, beams and tile shadows */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src="/img/integrations/base.png"
            alt=""
            width={W}
            height={H}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          />

          {/* Packets travelling outer → hub */}
          {inView &&
            LINES.map(([x, y], i) => (
              <motion.span
                key={`p${i}`}
                className="absolute size-[9px] rounded-full bg-[#525252] shadow-[0_0_0_4px_rgba(238,244,248,0.95),0_1px_3px_rgba(0,0,0,0.15)]"
                style={{ left: -4.5, top: -4.5 }}
                initial={{ x, y, opacity: 0 }}
                animate={{ x: [x, HUB.x], y: [y, HUB.y], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, delay: 1 + ((i * 0.37) % 2.4), times: [0, 0.15, 0.85, 1] } as never}
              />
            ))}

          {/* Hub mark with glow pulse */}
          <motion.div
            className="absolute"
            style={{ left: 505, top: 206, width: 104, height: 104 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            <motion.span
              key={pulse}
              aria-hidden
              className="absolute -inset-3 rounded-[10px]"
              initial={{ opacity: 0.55, boxShadow: "0 0 0px 0px rgba(3,105,161,0.45)" }}
              animate={{ opacity: 0, boxShadow: "0 0 36px 14px rgba(3,105,161,0.0)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.span
              aria-hidden
              className="absolute -inset-6 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.35),transparent)]"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/integrations/hub.jpg" alt="Rhythm hub" width={104} height={104} className="relative size-full border-[3px] border-white shadow-[0_8px_24px_rgba(0,0,0,0.25)]" />
          </motion.div>

          {/* Tiles: rise in from the hub outward, then idle float */}
          {TILES.map((t) => {
            const cx = t.x + t.w / 2,
              cy = t.y + t.h / 2;
            const dist = Math.hypot(cx - HUB.x, cy - HUB.y);
            return (
              <motion.div
                key={t.k}
                className="absolute"
                style={{ left: t.x, top: t.y, width: t.w, height: t.h }}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 + dist / 900 }}
              >
                <div className="size-full">
                  <motion.div className="size-full" whileHover={{ y: -4, scale: 1.03 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/img/integrations/tile-${t.k}.png`} alt={t.k} width={t.w} height={t.h} className="size-full" draggable={false} />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}

          {/* Status chips */}
          {CHIPS.map((c) => (
            <motion.div
              key={c.label}
              className="absolute flex h-8 items-center gap-1.5 rounded-[10px] border border-line bg-white pl-[11px] pr-3 text-[12px] whitespace-nowrap"
              style={{ left: c.x, top: c.y }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 380, damping: 20, delay: c.delay }}
            >
              <span className="size-[7px] rounded-full" style={{ background: c.dot }} />
              <span className="font-medium text-ink">{c.label}</span>
              {c.meta && (c.meta === "· 2m ago" ? <FlipMeta values={["· 2m ago", "· just now"]} /> : <span className="text-faint">{c.meta}</span>)}
            </motion.div>
          ))}

          {/* Hub chip */}
          <motion.div
            className="absolute flex h-8 items-center gap-2 rounded-full bg-ink pl-3 pr-3.5 text-[12px] whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]"
            style={{ left: 469, top: 524 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 380, damping: 20, delay: 0.8 }}
          >
            <span className="relative size-2">
              <span className="absolute inset-0 rounded-full bg-[#22c55e]" />
              <span className="absolute inset-0 rounded-full bg-[#22c55e] [animation:live-ring_1.6s_ease-out_infinite]" />
            </span>
            <span className="font-medium text-white">Live</span>
            <span className="text-muted">· 8 tools connected</span>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
