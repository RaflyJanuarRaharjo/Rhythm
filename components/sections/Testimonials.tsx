"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EASE } from "@/components/motion/Reveal";

const ITEMS = [
  {
    tag: "Planning time",
    quote: "“Our Monday planning used to eat the whole morning. Now Sync hands us clear priorities before the first coffee.”",
    company: "Dyer",
    logo: "/img/testi/logo-dyer.png",
    name: "Nadia Putri",
    role: "Head of Product, Dyer",
    avatar: "/img/testi/nadia.png",
  },
  {
    tag: "Team focus",
    quote: "“We stopped digging through chats for decisions. Everything we agreed on is already in this week’s plan.”",
    company: "Northwind",
    logo: "/img/testi/logo-northwind.png",
    name: "Raka Pratama",
    role: "Engineering Lead, Northwind",
    avatar: "/img/testi/raka.png",
  },
  {
    tag: "Meeting overload",
    quote: "“Fewer status meetings, more actual work. Sync keeps everyone aligned without the noise.”",
    company: "Kitebase",
    logo: "/img/testi/logo-kitebase.png",
    name: "Sarah Lim",
    role: "Ops Manager, Kitebase",
    avatar: "/img/testi/sarah.png",
  },
];

const AUTOPLAY = 5000;
const CARD_W = 560;

function Quote({ text, play }: { text: string; play: boolean }) {
  const words = text.split(" ");
  return (
    <p className="font-display text-[clamp(20px,1.7vw,24px)] font-medium leading-[1.4] text-ink">
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className="inline-block"
          initial={false}
          animate={play ? { opacity: [0, 1], y: [10, 0] } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: play ? i * 0.02 : 0 }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </p>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={dir === "left" ? "rotate-180" : ""}>
      <path d="M3.33 8h9.34M8.67 4l4 4-4 4" stroke="#171717" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { amount: 0.4 });
  const elapsed = useRef(0);
  const [cardW, setCardW] = useState(CARD_W);
  const [viewW, setViewW] = useState(CARD_W * 2);

  useEffect(() => {
    const onResize = () => {
      const w = (box.current?.clientWidth ?? CARD_W) - 2;
      setCardW(Math.min(CARD_W, w));
      setViewW(w);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0,
      last = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      if (elapsed.current >= AUTOPLAY) {
        elapsed.current = 0;
        setIndex((i) => (i + 1) % ITEMS.length);
      }
      setProgress(elapsed.current / AUTOPLAY);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, inView]);

  // Stop when the last card sits flush with the right edge (no empty space after it)
  const maxShift = Math.max(0, ITEMS.length * cardW - viewW);

  const go = (i: number) => {
    elapsed.current = 0;
    setProgress(0);
    setIndex((i + ITEMS.length) % ITEMS.length);
  };

  return (
    <section id="testimonial" className="bg-white py-20">
      <div className="container-page flex flex-col gap-10">
        <SectionHeader
          eyebrow="Testimonial"
          title="Better work starts with better rhythm"
          subtitle="See how teams can spend less time managing work and more time making meaningful progress."
        />
        <motion.div
          ref={box}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="overflow-hidden border border-[#ebebeb] bg-white"
          aria-roledescription="carousel"
        >
          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            animate={{ x: -Math.min(index * cardW, maxShift) }}
            transition={{ duration: 0.5, ease: [0.45, 0, 0.55, 1] }}
            drag="x"
            dragConstraints={{ left: -maxShift, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(index + 1);
              else if (info.offset.x > 60) go(index - 1);
            }}
          >
            {ITEMS.map((t, i) => {
              const on = i === index;
              return (
                <article
                  key={t.name}
                  aria-hidden={!on}
                  className="flex h-[320px] shrink-0 flex-col justify-between border-r border-[#ebebeb] bg-white p-6 last:border-r-0 sm:p-10"
                  style={{ width: cardW }}
                >
                  <motion.div animate={{ opacity: on ? 1 : 0.4 }} transition={{ duration: 0.4 }} className="flex flex-col gap-7">
                    <span className="self-start rounded-[6px] bg-[#f2f2f2] px-2.5 py-[5px] text-[12px] font-medium text-body">{t.tag}</span>
                    <Quote key={`${t.name}-${on}`} text={t.quote} play={on && inView} />
                  </motion.div>
                  <motion.div animate={{ opacity: on ? 1 : 0.4 }} transition={{ duration: 0.4 }} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Image src={t.logo} alt="" width={22} height={22} className="size-[22px] rounded-[6px]" />
                      <span className="font-display text-[20px] font-bold tracking-[-0.02em] text-ink">{t.company}</span>
                    </div>
                    <div className="flex items-center gap-3.5">
                      <div className="hidden flex-col items-end gap-0.5 text-right whitespace-nowrap sm:flex">
                        <span className="font-display text-[16px] font-semibold text-ink">{t.name}</span>
                        <span className="text-[13px] text-faint">{t.role}</span>
                      </div>
                      <Image src={t.avatar} alt={t.name} width={56} height={56} className="size-14 rounded-[8px] object-cover" />
                    </div>
                  </motion.div>
                </article>
              );
            })}
          </motion.div>

          <div className="flex items-center gap-4 border-t border-[#ebebeb] bg-white px-4 py-6 sm:px-12">
            <button onClick={() => go(index - 1)} className="flex items-center gap-2 rounded-[8px] border border-[#e5e5e5] bg-white px-3.5 py-2.5 text-[14px] font-medium text-ink transition hover:bg-chip">
              <Arrow dir="left" />
              Prev
            </button>
            <div className="flex flex-1 items-center gap-3">
              {ITEMS.map((t, i) => (
                <button key={t.name} onClick={() => go(i)} aria-label={`Show testimonial ${i + 1}`} className="h-1 flex-1 overflow-hidden rounded-[2px] bg-[#e5e5e5]">
                  <span
                    className="block h-full origin-left rounded-[2px] bg-accent"
                    style={{ transform: `scaleX(${i < index ? 1 : i === index ? Math.max(progress, 0.02) : 0})` }}
                  />
                </button>
              ))}
            </div>
            <button onClick={() => go(index + 1)} className="flex items-center gap-2 rounded-[8px] border border-[#e5e5e5] bg-white px-3.5 py-2.5 text-[14px] font-medium text-ink transition hover:bg-chip">
              Next
              <Arrow dir="right" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
