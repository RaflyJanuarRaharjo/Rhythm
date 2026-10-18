"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/lib/useCountUp";
import { EASE } from "@/components/motion/Reveal";

// Figma CompanyLogo instances (logomark + logotext), height 48
const LOGOS = [
  [
    { name: "Leapyear", w: 163 },
    { name: "Clandestine", w: 203 },
  ],
  [
    { name: "EasyTax", w: 158 },
    { name: "Prometheus", w: 206 },
  ],
  [
    { name: "Foresight", w: 163 },
    { name: "Nietzsche", w: 168 },
  ],
];

export default function Trusted() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const teams = useCountUp(10, inView, 1200);
  const rating = useCountUp(4.9, inView, 1200, 1);

  return (
    <section className="bg-white py-20">
      <div className="container-page flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex max-w-[512px] flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex">
              {[1, 2, 3].map((i) => (
                <Image key={i} src={`/img/trusted-${i}.png`} alt="" width={42} height={43} className="h-[43px] w-[42px] object-cover" style={{ marginRight: i < 3 ? -19 : 0 }} />
              ))}
            </div>
            <p className="font-display text-[clamp(18px,1.7vw,24px)] leading-[36px] tracking-[-0.02em] text-body tabular-nums" aria-label="Trusted by 10k+ teams, rated 4.9 out of 5">
              Trusted by {teams}k+ Teams |{" "}
              <motion.span
                className="inline-block text-[#eab308]"
                initial={{ opacity: 0, scale: 0.4, rotate: -40 }}
                animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ type: "spring", stiffness: 500, damping: 14, delay: 0.25 }}
              >
                ★
              </motion.span>{" "}
              {rating.toFixed(1)} / 5
            </p>
          </div>
          <p className="font-display text-[clamp(18px,1.7vw,24px)] leading-[1.5] tracking-[-0.02em] text-ink">
            Automate complex your workflows, and deliver better result faster with ai handling the heavy lifting behind the scenes
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:w-[706px] lg:gap-x-[26px]">
          {LOGOS.flatMap((col, ci) =>
            col.map((l, ri) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, ease: EASE, delay: (ci + ri) * 0.05 }}
                className="flex h-12 items-center"
                style={{ order: ri * 3 + ci }}
              >
                <Image
                  src={`/logos/${l.name.toLowerCase()}.png`}
                  alt={l.name}
                  width={l.w}
                  height={48}
                  className="h-10 w-auto grayscale transition-[filter] duration-200 hover:grayscale-0 sm:h-12"
                />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
