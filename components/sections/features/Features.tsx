"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EASE } from "@/components/motion/Reveal";
import { ConnectedContext, MeetingCapture, PulseUpdates, SmartPriorities, TeamWorkload, WeeklyFocus } from "./Illustrations";

const CARDS = [
  { label: "AI Meeting Capture", title: "Never lose the thread.", desc: "Turn conversations into searchable summaries, key decisions, and assigned action items without the manual follow-up.", Art: MeetingCapture },
  { label: "Smart Priorities", title: "Focus on what moves you forward.", desc: "Let AI organize tasks around urgency, impact, and deadlines so your team knows where to start.", Art: SmartPriorities },
  { label: "Weekly Focus Plan", title: "Make time for meaningful work.", desc: "Transform your priorities into a realistic weekly schedule that balances meetings, deadlines, and uninterrupted focus.", Art: WeeklyFocus },
  { label: "Pulse Updates", title: "Stay informed, without the interruptions.", desc: "Get concise updates on progress, blockers, and completed work without another status meeting.", Art: PulseUpdates },
  { label: "Team Workload", title: "Better balance. Better outcomes.", desc: "See how work is distributed across your team and identify bottlenecks before they slow everyone down.", Art: TeamWorkload },
  { label: "Connected Context", title: "Every task has a story.", desc: "Trace tasks back to the conversations, decisions, and documents behind them, all in one connected workspace.", Art: ConnectedContext },
];

function FeatureCard({ c, index }: { c: (typeof CARDS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const Art = c.Art;
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01 }}
      transition={{ duration: 0.5, ease: EASE, delay: Math.min(index, 3) * 0.08 }}
      whileHover={{ y: -4, boxShadow: "0px 1px 2px rgba(0,0,0,0.04), 0px 18px 40px rgba(0,0,0,0.08)" }}
      className="relative flex h-[464px] w-[min(422.83px,86vw)] shrink-0 snap-start flex-col overflow-hidden rounded-[16px] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)]"
    >
      <div className="flex flex-col gap-2 px-8 pb-2 pt-8">
        <p className="font-mono text-[12px] text-muted">{c.label}</p>
        <h3 className="text-[18px] font-medium text-ink">{c.title}</h3>
        <p className="text-[15px] leading-[1.5] text-sub">{c.desc}</p>
      </div>
      <div className="pointer-events-none relative mt-auto h-[300px] w-full overflow-hidden">
        <Art active={inView} />
        <div className="absolute inset-x-0 top-[160px] h-[140px] bg-gradient-to-b from-white/0 to-white" />
      </div>
    </motion.article>
  );
}

/** Drag-to-scroll with momentum for mouse users; trackpad/touch use native inertia + snap. */
function useDragScroll(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false,
      startX = 0,
      startLeft = 0,
      lastX = 0,
      lastT = 0,
      v = 0,
      raf = 0,
      moved = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      moved = false;
      startX = lastX = e.clientX;
      startLeft = el.scrollLeft;
      lastT = performance.now();
      v = 0;
      cancelAnimationFrame(raf);
      el.style.scrollSnapType = "none";
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      el.scrollLeft = startLeft - dx;
      const now = performance.now();
      v = (e.clientX - lastX) / Math.max(1, now - lastT);
      lastX = e.clientX;
      lastT = now;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      el.style.cursor = "";
      let vel = v * 16;
      const glide = () => {
        el.scrollLeft -= vel;
        vel *= 0.94;
        if (Math.abs(vel) > 0.5) raf = requestAnimationFrame(glide);
        else el.style.scrollSnapType = "";
      };
      raf = requestAnimationFrame(glide);
    };
    const onClick = (e: MouseEvent) => {
      if (moved) e.preventDefault();
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, [ref]);
}

const GUTTER = "max(clamp(20px,5.5vw,80px),calc((100vw - 1440px) / 2 + 80px))";

/**
 * Scroll-driven horizontal carousel.
 * md+ : the section pins (sticky) and vertical scroll moves the cards sideways —
 *       scroll down → cards slide left, scroll up → back. Section height = 100vh + overflow distance.
 * mobile / reduced motion : native horizontal swipe with snap (+ mouse drag).
 */
export default function Features() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [distance, setDistance] = useState(0);
  useDragScroll(viewport);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const measure = () => {
      setPinned(mq.matches);
      if (rail.current && viewport.current) setDistance(Math.max(0, rail.current.scrollWidth - viewport.current.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (rail.current) ro.observe(rail.current);
    if (viewport.current) ro.observe(viewport.current);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => (pinned ? -v * distance : 0));

  return (
    <section id="feature" ref={section} className="relative bg-canvas" style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}>
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-10" : "py-20"}>
        <div className="container-page flex flex-col gap-10">
          <SectionHeader
            eyebrow="Feature"
            title="Everything clicks into place."
            subtitle="Less busywork. Fewer loose ends. One intelligent workspace that helps your team do its best work."
          />
        </div>

        <div
          ref={viewport}
          className={`no-scrollbar mt-10 select-none ${pinned ? "overflow-hidden" : "cursor-grab snap-x snap-mandatory overflow-x-auto"}`}
          style={pinned ? undefined : { scrollPaddingLeft: GUTTER }}
          aria-label="Features"
        >
          <motion.div ref={rail} style={{ x, paddingLeft: GUTTER, paddingRight: GUTTER }} className="flex w-max gap-4 pb-6 will-change-transform">
            {CARDS.map((c, i) => (
              <FeatureCard key={c.label} c={c} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Scroll progress (replaces the prev/next buttons) */}
        {pinned && (
          <div className="container-page mt-4">
            <div className="ml-auto h-1 w-[180px] overflow-hidden rounded-full bg-line">
              <motion.div className="h-full origin-left rounded-full bg-accent" style={{ scaleX: scrollYProgress }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
