"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Feature", href: "#feature" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Testimonial", href: "#testimonial" },
];

/**
 * Sticky nav. At the top it sits over the hero (white links on the blue panel);
 * after 40px it gets a blurred white background + bottom border. Hides on scroll down,
 * reappears on scroll up.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 240 && y > last.current);
      last.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <>
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: hidden && !open ? "-100%" : 0, opacity: 1 }}
      transition={{ duration: hidden ? 0.25 : 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-200 ${
          scrolled || open
            ? "border-b border-line bg-white/80 backdrop-blur-[12px]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-[1440px] items-center justify-between px-[clamp(20px,5.7vw,82px)] transition-[padding] duration-200 ${
            scrolled ? "py-3" : "pt-[35px] pb-3"
          }`}
          aria-label="Main"
        >
          <a href="#top" className="flex items-center gap-4" aria-label="Rhythm home">
            <Image src="/img/mark.png" alt="" width={48} height={48} priority className={scrolled ? "size-10" : "size-12"} />
            <span className="font-display text-[20px] font-semibold italic leading-[36px] tracking-[-0.4px] text-ink">
              Rhythm
            </span>
          </a>

          <div className="flex items-center gap-8">
            <ul
              className={`hidden items-center gap-8 font-display text-[20px] leading-[36px] tracking-[-0.4px] transition-colors duration-200 lg:flex ${
                scrolled ? "text-ink" : "text-canvas"
              }`}
            >
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-slide">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="hidden items-center gap-2 lg:flex">
              <Button variant="dark" href="#docs">
                Docs
              </Button>
              <Button variant="light" href="#signup" textClassName="text-ink-950">
                Sign Up
              </Button>
            </div>
            {/* Hamburger (below lg) */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-[60] flex size-11 items-center justify-center bg-ink text-white lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <motion.span className="absolute left-0 top-0 h-[2px] w-5 bg-current" animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }} transition={{ duration: 0.25 }} />
                <motion.span className="absolute left-0 top-[6px] h-[2px] w-5 bg-current" animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.15 }} />
                <motion.span className="absolute left-0 top-3 h-[2px] w-5 bg-current" animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }} transition={{ duration: 0.25 }} />
              </span>
            </button>
          </div>
        </nav>
      </div>
    </motion.header>

    {/* Mobile menu */}
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex flex-col bg-white px-[clamp(20px,5.7vw,82px)] pb-8 pt-28 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.ul
            className="flex flex-col"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
          >
            {LINKS.map((l) => (
              <motion.li
                key={l.href}
                className="border-b border-line"
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } } }}
              >
                <a href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-5 font-display text-[28px] font-medium tracking-[-0.02em] text-ink">
                  {l.label}
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden className="text-muted">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            className="mt-auto grid grid-cols-2 gap-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.25 }}
            onClick={() => setOpen(false)}
          >
            <Button variant="dark" href="#docs">
              Docs
            </Button>
            <Button variant="light" href="#signup" textClassName="text-ink-950">
              Sign Up
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
