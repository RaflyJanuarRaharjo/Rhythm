"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

/** Default section reveal: fade + translateY 16px → 0, 500ms, once at 20% in view. */
export function Reveal({
  delay = 0,
  y = 16,
  amount = 0.2,
  children,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number; y?: number; amount?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export const staggerParent = (stagger = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const fadeUp = (y = 16, duration = 0.5): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
});
