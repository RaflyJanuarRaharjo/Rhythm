# Rhythm — landing page

Next.js 15 (App Router) build of the Figma file **🏀 Dribbble Shot → Frame 46**, with every motion annotation implemented.

## Run it (Windows CMD)

```
cd rhythm-landing
npm install
npm run dev
```

Open http://localhost:3000.

Production build:

```
npm run build
npm start
```

Deploy: push the folder to GitHub and import it in Vercel (no config needed).

## Stack

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS v4 (tokens in `app/globals.css` → `@theme`)
- Framer Motion (UI motion) + GSAP ticker / Lenis (smooth scroll)
- Fonts: Geist, Geist Mono (`geist` package), Hanken Grotesk (`@fontsource`)

## Structure

```
app/
  layout.tsx            fonts + Lenis smooth scroll
  page.tsx              section order
  globals.css           design tokens, keyframes, reduced-motion fallback
components/
  motion/               SmoothScroll (Lenis), Reveal helpers
  ui/                   Button, SectionHeader, Icon, DitherCanvas
  sections/
    Navbar.tsx
    hero/               Hero, AppWindow (product mockup)
    Trusted.tsx
    Manifesto.tsx
    features/           Features carousel + 6 animated illustrations
    how-it-works/       tabs, Stage (context + Ask Ritme), steps.ts (content)
    Testimonials.tsx
    Integrations.tsx    isometric hub, flowing connectors, packets
    Footer.tsx          grid footer
lib/                    useCountUp, useFitScale
public/                 assets exported from Figma
```

Content for the How it works steps lives in `components/sections/how-it-works/steps.ts`.

## Motion (from the Figma "Animation" annotations)

| Section | What moves |
|---|---|
| Global | Lenis smooth scroll; section reveal fade + 16px rise, 500ms, `cubic-bezier(0.22,1,0.36,1)`, once at 20% in view; 60–80ms stagger |
| Navbar | Sticky; blur + border after 40px; hides on scroll down, returns on scroll up; underline slides in on hover |
| Hero copy | Headline per-word mask reveal; subtitle and buttons follow; button background sweeps on hover, arrow nudges 4px |
| Hero app window | Fade + rise + scale in; widgets stagger; progress ring draws to 65%; bars grow; "Now" line drifts; parallax −40px on scroll; toast slides up at 1.2s |
| Hero dither | Canvas Bayer dither that shimmers and brightens around the cursor |
| Badges | Each floats ±4px on its own phase; 3D tilt on hover |
| Trusted | 10k+ and 4.9 count up; star pops in; logos grayscale → colour on hover |
| Manifesto | Section pins while each word's opacity follows scroll |
| Features | Drag/trackpad carousel with snap + momentum; cards rise in; hover lift; each illustration plays when visible (waveform + timer, FLIP re-rank, calendar blocks drop, bars fill, connectors draw) |
| How it works | Tabs auto-advance every 6s with the top border as progress; hover pauses; crossfade; focus card scales in; context cards un-blur; checklist ticks draw; chat shows typing then answer and evidence pill |
| Testimonials | 5s autoplay with progress bars; slide on prev/next; inactive cards at 40%; words rise in; swipe/drag |
| Integrations | Tiles rise from the hub outward then float; dashed connectors flow; packets travel to the hub; hub pulses; chips pop in; "Live" dot pulses; status text flips |
| Footer | Grid lines draw in; tiles pop after; tiles rotate on hover; arrow tile nudges; headline reveals per line |

`prefers-reduced-motion` turns off smooth scroll, loops, parallax and autoplay and keeps short fades.
