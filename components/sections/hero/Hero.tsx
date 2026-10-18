"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import AppWindow from "./AppWindow";
import DitherCanvas, { type DitherLayer } from "@/components/ui/DitherCanvas";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/components/motion/Reveal";

const HEADLINE = "Your team, in Rhythm";

// White dither over the gradient: denser towards the top-right and bottom edges
const HERO_DITHER: DitherLayer[] = [
  {
    color: "#ffffff",
    alpha: 0.28,
    intensity: (u, v) => {
      const corner = Math.max(0, 1 - Math.hypot(u - 1, v) / 1.05);
      const bottom = Math.max(0, (v - 0.55) / 0.45) * 0.6;
      return 0.18 + corner * 0.7 + bottom;
    },
  },
];

const BADGES = [
  { src: "/img/badges/badge-1.png", alt: "Figma partner badge", x: 0, y: 0, w: 94, h: 102 },
  { src: "/img/badges/badge-iso.png", alt: "ISO 27001 certified", x: 113, y: 1, w: 100, h: 100 },
  { src: "/img/badges/badge-2.png", alt: "Framer partner badge", x: 232, y: 0, w: 94, h: 102 },
];

function Badges() {
  // Badges stay still; they tilt slightly on hover.
  return (
    <div className="relative h-[102px] w-[326px] [perspective:600px]">
      {BADGES.map((b) => (
        <div
          key={b.src}
          className="absolute"
          style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
        >
          <motion.div className="size-full" whileHover={{ rotateX: 8, rotateY: -8, scale: 1.05 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
            <Image src={b.src} alt={b.alt} width={b.w * 2} height={b.h * 2} className="size-full" />
          </motion.div>
        </div>
      ))}
    </div>
  );
}

function Toast() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 1.2 }}
      className="absolute bottom-6 left-6 z-10 flex items-center gap-3 rounded-[12px] border border-soft bg-white py-2.5 pl-2.5 pr-3 shadow-[0_12px_32px_rgba(0,13,31,0.18)]"
    >
      <span className="flex size-9 items-center justify-center rounded-[9px] bg-[#fef6e7]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
          <rect x="2" y="6" width="14" height="12" rx="2" />
        </svg>
      </span>
      <div className="flex flex-col gap-0.5 whitespace-nowrap">
        <p className="text-[13px] font-medium text-ink">Product sync captured</p>
        <p className="text-[11px] text-sub">3 decisions · 5 action items</p>
      </div>
      <span className="ml-2 rounded-[7px] bg-ink px-3 py-1.5 text-[12px] font-medium text-white">Review</span>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const winY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section id="top" ref={ref} className="relative flex flex-col overflow-hidden bg-white lg:block lg:h-[840px]">
      {/* Right panel: gradient + dither + app window */}
      <div className="relative order-2 h-[620px] overflow-hidden bg-navy lg:order-none lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:left-[max(44.65%,calc(50%-77px))]">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 55% at 50% 50%, rgba(255,255,255,0.18), rgba(255,255,255,0) 100%), linear-gradient(150.6deg, #0369a1 7.4%, #70afd6 40.7%, #36e69a 81.5%)",
          }}
        />
        <DitherCanvas layers={HERO_DITHER} cell={4} pixel={1.5} cursorGlow glowRadius={240} />
        <motion.div style={{ y: winY }} className="absolute left-5 top-[120px] origin-top-left scale-[0.62] sm:scale-75 lg:left-16 lg:top-[182px] lg:scale-100">
          <AppWindow />
        </motion.div>
        <Toast />
      </div>

      {/* Left copy */}
      <div className="relative mx-auto max-w-[1440px] px-[clamp(20px,5.7vw,82px)] pb-16 pt-32 lg:h-full lg:pb-0 lg:pt-0">
        <div className="flex max-w-[512px] flex-col gap-6 lg:absolute lg:top-[265px]">
          <h1 className="font-display text-[clamp(36px,4.4vw,48px)] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
            {HEADLINE.split(" ").map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.04 }}
                >
                  {w}
                  {i < HEADLINE.split(" ").length - 1 ? " " : ""}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
            className="font-display text-[clamp(18px,1.9vw,24px)] leading-[1.5] tracking-[-0.02em] text-body"
          >
            Your meetings, chats, and documents hold the answers. Ritme brings them together into clear priorities and a focused plan for the
            week ahead.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
            className="flex flex-wrap gap-2"
          >
            <Button variant="primary" href="#signup" arrow>
              Get Started Free
            </Button>
            <Button variant="light" href="#how-it-works">
              See how it works
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-14 lg:absolute lg:top-[681px] lg:mt-0"
        >
          <Badges />
        </motion.div>
      </div>
    </section>
  );
}
