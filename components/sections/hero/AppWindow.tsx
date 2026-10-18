"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { EASE, EASE_EXPO } from "@/components/motion/Reveal";

const widget: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function Icon({ src, size, alt = "" }: { src: string; size: number; alt?: string }) {
  return <Image src={src} alt={alt} width={size} height={size} className="shrink-0" style={{ width: size, height: size }} unoptimized />;
}

function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-[6px] px-[7px] py-[3px] text-[11px] font-medium leading-none whitespace-nowrap ${className}`}>
      {children}
    </span>
  );
}

const HOURS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

function Schedule() {
  return (
    <motion.div variants={widget} className="flex w-full flex-col gap-3 rounded-[12px] border border-soft bg-white p-[14px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon src="/icons/cal.svg" size={14} />
          <p className="text-[14px] font-medium text-ink">Schedule</p>
        </div>
        <p className="font-mono text-[11px] text-faint">Thu, Oct 22</p>
      </div>
      <div className="relative h-[300px] w-full">
        {HOURS.map((h, i) => (
          <div key={h}>
            <p className="absolute left-0 font-mono text-[10px] text-muted" style={{ top: -6 + i * 58 }}>
              {h}
            </p>
            <div className="absolute left-[46px] right-0 h-px bg-[#f0f0f0]" style={{ top: i * 58 }} />
          </div>
        ))}
        <Block top={2} h={83} bg="#e6f3fb" border="#0369a1">
          <p className="text-[12px] font-medium text-ink">Deep work · Q3 roadmap</p>
          <p className="text-[11px] text-sub">Notifications paused</p>
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent" />
            <p className="text-[11px] font-medium text-accent">Now · 42m left</p>
          </div>
        </Block>
        <Block top={89} h={26} bg="#f4f4f5" border="#a3a3a3">
          <p className="text-[12px] font-medium text-ink">Standup</p>
        </Block>
        <Block top={118} h={54} bg="#fef6e7" border="#d97706">
          <p className="text-[12px] font-medium text-ink">Product sync</p>
          <p className="text-[11px] text-sub">6 people · Video call</p>
          <div className="flex items-center gap-1.5">
            <Icon src="/icons/spark-amber.svg" size={11} />
            <p className="text-[11px] font-medium text-[#b45309]">Ritme is taking notes</p>
          </div>
        </Block>
        <Block top={205} h={59.8} bg="#e6f3fb" border="#7cb9e0">
          <p className="text-[12px] font-medium text-ink">Focus · Pricing page</p>
          <p className="text-[11px] text-sub">Suggested by Ritme</p>
        </Block>
      </div>
    </motion.div>
  );
}

function Block({ top, h, bg, border, children }: { top: number; h: number; bg: string; border: string; children: React.ReactNode }) {
  return (
    <div
      className="absolute left-[50px] right-0 flex flex-col gap-[3px] overflow-hidden rounded-[8px] border-l-[3px] py-[7px] pl-3 pr-2.5 whitespace-nowrap"
      style={{ top, height: h, background: bg, borderColor: border }}
    >
      {children}
    </div>
  );
}

function Pulse() {
  return (
    <motion.div variants={widget} className="flex w-full flex-col gap-3 rounded-[12px] border border-soft bg-white p-[14px]">
      <div className="flex items-center justify-between font-medium">
        <p className="text-[14px] text-ink">Sprint 14 pulse</p>
        <p className="font-mono text-[12px] text-accent">72%</p>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-[3px] bg-[#edf2f6]">
        <motion.div
          className="h-full rounded-[3px] bg-accent"
          initial={{ width: 0 }}
          animate={{ width: "72%" }}
          transition={{ duration: 1, ease: EASE, delay: 0.9 }}
        />
      </div>
      <div className="flex gap-1.5">
        <Chip className="bg-[#ecfdf3] text-[#15803d]">12 done</Chip>
        <Chip className="bg-[#fffbeb] text-[#b45309]">2 blockers</Chip>
        <Chip className="bg-chip text-body">No status meeting</Chip>
      </div>
    </motion.div>
  );
}

const PRIORITIES = [
  { rank: 1, title: "Ship onboarding v2", due: { label: "Due Fri", cls: "bg-chip text-body" }, src: { icon: "/icons/video-blue.svg", label: "from Weekly sync" }, impact: ["#0369a1", "#0369a1", "#0369a1"], active: true },
  { rank: 2, title: "Fix checkout bug", due: { label: "Due today", cls: "bg-[#fee2e2] text-[#b91c1c]" }, src: { icon: "/icons/spark-blue.svg", label: "from #support" }, impact: ["#dc2626", "#dc2626", "#dc2626"] },
  { rank: 3, title: "Q3 roadmap review", due: { label: "Due Mon", cls: "bg-chip text-body" }, src: { icon: "/icons/cal-blue.svg", label: "from Launch brief" }, impact: ["#0369a1", "#0369a1", "#e5e5e5"] },
];

function AiPriorities() {
  return (
    <motion.div variants={widget} className="flex w-full flex-col gap-2.5 rounded-[12px] border border-soft bg-white p-[14px]">
      <div className="flex items-center gap-2">
        <span className="flex size-6 items-center justify-center rounded-[7px] bg-[linear-gradient(135deg,#38bdf8_25%,#0369a1_75%)]">
          <Icon src="/icons/spark-white.svg" size={13} />
        </span>
        <p className="text-[14px] font-medium text-ink">AI priorities</p>
        <Chip className="bg-chip text-sub">Re-ranked 2m ago</Chip>
      </div>
      {PRIORITIES.map((p) => (
        <div
          key={p.rank}
          className={`flex w-full items-center gap-3 rounded-[10px] border py-2.5 pl-2.5 pr-3 ${
            p.active ? "border-[#cfe6f5] bg-[#f5fafe]" : "border-[#f0f0f0] bg-white"
          }`}
        >
          <span
            className={`flex size-6 items-center justify-center rounded-[7px] font-mono text-[11px] font-medium ${
              p.active ? "bg-accent text-white" : "bg-chip text-body"
            }`}
          >
            {p.rank}
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
            <p className="text-[13px] font-medium text-ink">{p.title}</p>
            <div className="flex gap-1.5">
              <Chip className={p.due.cls}>{p.due.label}</Chip>
              <Chip className="bg-accent-25 text-accent">
                <Icon src={p.src.icon} size={11} />
                {p.src.label}
              </Chip>
            </div>
          </div>
          <div className="flex items-end gap-[3px]">
            {p.impact.map((c, i) => (
              <motion.span
                key={i}
                className="w-1 origin-bottom rounded-[1.5px]"
                style={{ height: 8 + i * 4, background: c }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.8 + p.rank * 0.08 + i * 0.05 }}
              />
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function Ring() {
  const r = 26,
    c = 2 * Math.PI * r;
  return (
    <div className="relative size-[60px] shrink-0">
      <svg width="60" height="60" viewBox="0 0 60 60" className="-rotate-90">
        <circle cx="30" cy="30" r={r} fill="none" stroke="#edf2f6" strokeWidth="6" />
        <motion.circle
          cx="30"
          cy="30"
          r={r}
          fill="none"
          stroke="#0369a1"
          strokeWidth="6"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - 0.65) }}
          transition={{ duration: 1.2, ease: EASE_EXPO, delay: 0.9 }}
        />
      </svg>
      <p className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-ink">65%</p>
    </div>
  );
}

const BARS = [
  { d: "M", h: 26 },
  { d: "T", h: 38 },
  { d: "W", h: 20 },
  { d: "T", h: 44, on: true },
  { d: "F", h: 30 },
];

function Minis() {
  return (
    <motion.div variants={widget} className="flex w-full gap-4">
      <div className="flex flex-1 items-center gap-3.5 rounded-[12px] border border-soft bg-white py-3.5 pl-3.5 pr-4">
        <Ring />
        <div className="flex flex-col gap-[3px] whitespace-nowrap">
          <p className="text-[12px] text-sub">Weekly progress</p>
          <p className="text-[15px] font-medium text-ink">13 of 20 done</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 rounded-[12px] border border-soft bg-white px-4 py-3.5">
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-sub">Focus time</p>
          <p className="text-[15px] font-medium text-ink">18.5h</p>
        </div>
        <div className="flex items-end gap-2.5">
          {BARS.map((b, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.div
                className="w-3.5 origin-bottom rounded-[3px]"
                style={{ height: b.h, background: b.on ? "#0369a1" : "#cfe3f1" }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 1 + i * 0.06 }}
              />
              <p className="font-mono text-[10px] text-muted">{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Decisions() {
  const items = [
    { t: "Pricing page moves to Q3", s: "Product sync · today" },
    { t: "Onboarding v2 ships Friday", s: "Weekly sync · Mon" },
  ];
  return (
    <motion.div variants={widget} className="flex w-full flex-col gap-2.5 rounded-[12px] border border-soft bg-white p-[14px]">
      <div className="flex items-center justify-between font-medium">
        <p className="text-[14px] text-ink">Recent decisions</p>
        <p className="text-[12px] text-accent">View all</p>
      </div>
      {items.map((d) => (
        <div key={d.t} className="flex items-center gap-2.5">
          <span className="flex size-5 items-center justify-center rounded-full bg-accent">
            <Icon src="/icons/check-white.svg" size={12} />
          </span>
          <div className="flex flex-col gap-px whitespace-nowrap">
            <p className="text-[13px] font-medium text-ink">{d.t}</p>
            <p className="text-[11px] text-faint">{d.s}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

const TABS = ["Today", "Plan", "Meetings", "Pulse"];
const AVATARS = [
  { i: "AR", c: "#0ea5e9" },
  { i: "BK", c: "#f59e0b" },
  { i: "CT", c: "#10b981" },
];

/** The product window in the hero (Figma "App Window", 900×734). */
export default function AppWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.2 }}
      className="flex h-[734px] w-[900px] flex-col overflow-hidden bg-white shadow-[0px_30px_70px_0px_rgba(0,13,31,0.45)]"
    >
      {/* Top bar */}
      <div className="flex w-full items-center gap-6 border-b border-soft px-5 py-3">
        <div className="flex items-center gap-2">
          <Image src="/img/mark.png" alt="" width={24} height={24} className="size-6" />
          <p className="text-[14px] font-semibold text-ink">Ritme</p>
          <p className="text-[14px] text-[#d4d4d4]">/</p>
          <span className="flex items-center gap-1 rounded-[6px] bg-chip py-1 pl-2 pr-1.5">
            <span className="text-[13px] font-medium text-[#404040]">Product team</span>
            <Icon src="/icons/chev.svg" size={13} />
          </span>
        </div>
        <div className="flex items-center gap-1">
          {TABS.map((t, i) => (
            <span
              key={t}
              className={`rounded-[8px] px-3 py-1.5 text-[13px] ${i === 0 ? "bg-ink font-medium text-white" : "text-sub"}`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Icon src="/icons/search.svg" size={16} />
          <div className="flex">
            {AVATARS.map((a, i) => (
              <span
                key={a.i}
                className="flex size-[22px] items-center justify-center rounded-full border-2 border-white text-[8px] font-semibold text-white"
                style={{ background: a.c, marginRight: i < 2 ? -6 : 0 }}
              >
                {a.i}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Body */}
      <motion.div
        className="flex min-h-0 flex-1 items-start gap-[18px] bg-canvas p-[22px]"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.45 } } }}
      >
        <div className="flex w-[360px] shrink-0 flex-col gap-[18px]">
          <motion.div variants={widget} className="flex flex-col gap-1 whitespace-nowrap">
            <p className="text-[22px] font-semibold text-ink">Good morning, Nadia</p>
            <p className="text-[13px] text-sub">4 priorities and 3h of protected focus time today.</p>
          </motion.div>
          <Schedule />
          <Pulse />
        </div>
        <div className="flex w-[460px] shrink-0 flex-col gap-4">
          <AiPriorities />
          <Minis />
          <Decisions />
        </div>
      </motion.div>
    </motion.div>
  );
}
