"use client";

import { useEffect, useRef } from "react";

export type DitherLayer = {
  color: string; // css colour of the pixel
  alpha?: number; // max alpha of the layer
  /** intensity 0..1 at normalised coords (u,v in 0..1) — compared to a 4x4 Bayer threshold */
  intensity: (u: number, v: number) => number;
};

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((r) => r.map((v) => (v + 0.5) / 16));

/**
 * Ordered (Bayer) pixel dither drawn on a canvas.
 * - shimmer: each pixel's opacity drifts randomly (0.4–1, 3–5s loops)
 * - cursorGlow: pixels near the pointer get boosted (lerp 0.08)
 * Static under prefers-reduced-motion; paused when off-screen.
 */
export default function DitherCanvas({
  layers,
  cell = 6,
  pixel = 3,
  shimmer = true,
  cursorGlow = false,
  glowRadius = 220,
  className = "",
}: {
  layers: DitherLayer[];
  cell?: number;
  pixel?: number;
  shimmer?: boolean;
  cursorGlow?: boolean;
  glowRadius?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0,
      h = 0,
      dpr = 1,
      raf = 0,
      visible = true;
    type Px = { x: number; y: number; t: number; phase: number; speed: number; li: number };
    let pixels: Px[] = [];
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const build = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      pixels = [];
      for (let gy = 0; gy * cell < h; gy++) {
        for (let gx = 0; gx * cell < w; gx++) {
          const x = gx * cell,
            y = gy * cell;
          const t = BAYER[gy % 4][gx % 4];
          for (let li = 0; li < layers.length; li++) {
            pixels.push({ x, y, t, li, phase: Math.random() * Math.PI * 2, speed: (Math.PI * 2) / (3000 + Math.random() * 2000) });
          }
        }
      }
    };

    const draw = (time: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      for (let li = 0; li < layers.length; li++) {
        const L = layers[li];
        ctx.fillStyle = L.color;
        const maxA = L.alpha ?? 1;
        for (const p of pixels) {
          if (p.li !== li) continue;
          let I = L.intensity((p.x + cell / 2) / w, (p.y + cell / 2) / h);
          if (cursorGlow) {
            const dx = p.x - pointer.x,
              dy = p.y - pointer.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < glowRadius * glowRadius) I += 0.45 * (1 - Math.sqrt(d2) / glowRadius);
          }
          if (I <= p.t) continue;
          const a = shimmer && !reduced ? 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(time * p.speed + p.phase)) : 1;
          ctx.globalAlpha = a * maxA;
          ctx.fillRect(p.x, p.y, pixel, pixel);
        }
      }
      ctx.globalAlpha = 1;
    };

    let lastFrame = 0;
    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || time - lastFrame < 33) return; // ~30fps is plenty for a shimmer
      lastFrame = time;
      draw(time);
    };

    build();
    draw(0);
    const animated = !reduced && (shimmer || cursorGlow);
    if (animated) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      build();
      draw(performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const host = canvas.parentElement!;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
      if (pointer.x < -9000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    };
    const onLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };
    if (cursorGlow && !reduced) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
    // layers are static per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell, pixel, shimmer, cursorGlow, glowRadius]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 size-full ${className}`} />;
}
