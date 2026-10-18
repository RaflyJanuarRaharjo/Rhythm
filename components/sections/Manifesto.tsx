"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const TEXT =
  "At rhythm, we believe better work starts with better alignment. We bring meetings, conversations, and tasks together in one intelligent workspace, helping teams cut through the noise, find clarity, and focus on what truly matters. By turning scattered information into meaningful action, Ritme empowers teams to work smarter, collaborate seamlessly, and find their rhythm.";

function Word({ children, progress, range }: { children: React.ReactNode; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}
    </motion.span>
  );
}

/**
 * Scroll-linked word reveal. The section is ~2 screens tall and its content is sticky,
 * which pins the quote while each word's opacity follows scroll progress (scrub).
 */
export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = TEXT.split(" ");
  const n = words.length;

  return (
    <section id="about" ref={ref} className="relative h-[180vh] bg-white">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="container-page">
          <p className="text-center font-display text-[clamp(24px,2.5vw,36px)] leading-[1.67] tracking-[-0.02em] text-body">
            <Word progress={scrollYProgress} range={[0, 0.04]}>
              <span className="font-black italic">“</span>{" "}
            </Word>
            {words.map((w, i) => {
              const start = 0.04 + (i / n) * 0.8;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, start + 0.8 / n + 0.02]}>
                  {w}
                  {i < n - 1 ? " " : ""}
                </Word>
              );
            })}
            <Word progress={scrollYProgress} range={[0.84, 0.88]}>
              <span className="font-black italic">“</span>
            </Word>
          </p>
        </div>
      </div>
    </section>
  );
}
