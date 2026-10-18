"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import DitherCanvas, { type DitherLayer } from "@/components/ui/DitherCanvas";
import { EASE } from "@/components/motion/Reveal";
import Stage from "./Stage";
import { STEPS } from "./steps";

const DURATION = 6000; // auto-advance every 6s

const clamp = (v: number) => Math.max(0, Math.min(1, v));
// Same recipe as the Figma "Background (dither)": neutral at the edges, sky pooled under the cards
const DITHER: DitherLayer[] = [
  {
    color: "#c4c4c4",
    alpha: 0.55,
    intensity: (u, v) => {
      const nx = (u - 0.5) / 0.5,
        ny = (v - 0.45) / 0.5;
      return clamp((Math.sqrt(nx * nx * 0.9 + ny * ny * 0.6) - 0.55) / 0.75) * 0.85;
    },
  },
  {
    color: "#7cb9e0",
    alpha: 0.45,
    intensity: (u, v) => {
      const g1 = Math.exp(-(((u - 0.5) / 0.42) ** 2 + ((v - 1.02) / 0.28) ** 2));
      const g2 = Math.exp(-(((u - 0.08) / 0.16) ** 2 + ((v - 0.92) / 0.3) ** 2));
      const g3 = Math.exp(-(((u - 0.92) / 0.16) ** 2 + ((v - 0.15) / 0.28) ** 2));
      return clamp(0.75 * g1 + 0.5 * g2 + 0.4 * g3);
    },
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { amount: 0.35 });
  const elapsed = useRef(0);

  // Auto-advance; hover pauses, leaving the viewport pauses, clicking resets the timer.
  useEffect(() => {
    if (paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      if (elapsed.current >= DURATION) {
        elapsed.current = 0;
        setActive((a) => (a + 1) % STEPS.length);
      }
      setProgress(elapsed.current / DURATION);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, inView]);

  const select = (i: number) => {
    elapsed.current = 0;
    setProgress(0);
    setActive(i);
  };

  return (
    <section id="how-it-works" className="bg-white pb-20 pt-20">
      <div className="container-page flex flex-col gap-12">
        <SectionHeader
          align="center"
          eyebrow="How it works"
          title="From scattered to in rhythm."
          subtitle="Your work already has the answers. Ritme brings them together, turns them into clear priorities, and helps your team focus on what comes next."
        />

        <motion.div
          ref={box}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: EASE }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="border border-line bg-white"
        >
          {/* Tabs */}
          <div role="tablist" aria-label="How it works steps" className="grid grid-cols-1 md:grid-cols-3">
            {STEPS.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.key}
                  role="tab"
                  aria-selected={on}
                  aria-controls="hiw-panel"
                  onClick={() => select(i)}
                  className={`relative flex flex-col gap-2 px-7 pb-7 pt-[28px] text-left transition-colors duration-300 ${
                    on ? "bg-white" : "bg-canvas hover:bg-[#f5f5f5]"
                  } ${i < STEPS.length - 1 ? "md:border-r md:border-line" : ""} ${on ? "" : "border-b border-line"}`}
                >
                  <span className="absolute inset-x-0 top-0 h-0.5 overflow-hidden" aria-hidden>
                    {on && (
                      <span
                        className="block h-full origin-left bg-accent"
                        style={{ transform: `scaleX(${paused || !inView ? Math.max(progress, 0.02) : progress})` }}
                      />
                    )}
                  </span>
                  <span className={`text-[19px] font-medium transition-colors duration-300 ${on ? "text-ink" : "text-body"}`}>{s.tab.title}</span>
                  <span className={`text-[15px] leading-[1.55] transition-colors duration-300 ${on ? "text-[#6b6b6b]" : "text-faint"}`}>{s.tab.desc}</span>
                </button>
              );
            })}
          </div>

          {/* Preview */}
          <div id="hiw-panel" role="tabpanel" className="relative overflow-hidden bg-[linear-gradient(180deg,#fafafa,#efefef)] md:h-[540px]">
            <DitherCanvas layers={DITHER} cell={6} pixel={3} shimmer={false} className="opacity-55" />
            <AnimatePresence mode="wait">
              <motion.div
                key={STEPS[active].key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="relative h-full"
              >
                <Stage step={STEPS[active]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
