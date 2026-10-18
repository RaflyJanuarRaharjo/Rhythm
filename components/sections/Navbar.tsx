"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: hidden ? "-100%" : 0, opacity: 1 }}
      transition={{ duration: hidden ? 0.25 : 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-200 ${
          scrolled
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
            <div className="flex items-center gap-2">
              <Button variant="dark" href="#docs" className="hidden sm:inline-flex">
                Docs
              </Button>
              <Button variant="light" href="#signup" textClassName="text-ink-950">
                Sign Up
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
