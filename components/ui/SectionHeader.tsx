"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerParent } from "@/components/motion/Reveal";

/** Eyebrow (blue square + label), large title and optional right-aligned subtitle. */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "split",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "split" | "center";
}) {
  const center = align === "center";
  return (
    <motion.div
      variants={staggerParent(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className={`flex w-full gap-6 ${center ? "flex-col items-center text-center" : "flex-col items-start lg:flex-row lg:items-end lg:justify-between"}`}
    >
      <div className={`flex flex-col gap-3.5 ${center ? "items-center" : "items-start"}`}>
        <motion.div variants={fadeUp(10)} className="flex items-center gap-2.5">
          <span className="size-2 bg-accent" />
          <p className="font-display text-[clamp(18px,1.7vw,24px)] font-medium leading-[36px] tracking-[-0.02em] text-body uppercase">{eyebrow}</p>
        </motion.div>
        <motion.h2
          variants={fadeUp(16)}
          className="max-w-[760px] font-display text-[clamp(32px,3.1vw,44px)] font-medium leading-[1.18] tracking-[-0.02em] text-ink"
        >
          {title}
        </motion.h2>
      </div>
      {subtitle && (
        <motion.p
          variants={fadeUp(16)}
          className={`font-display text-[18px] leading-[28px] text-[#6b6b6b] ${center ? "max-w-[620px]" : "max-w-[405px] lg:text-right"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
