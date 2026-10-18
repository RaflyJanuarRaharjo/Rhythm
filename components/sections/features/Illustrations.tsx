"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import { useCountUp } from "@/lib/useCountUp";

const CARD = "absolute flex flex-col overflow-hidden border border-line bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),0px_8px_24px_0px_rgba(0,0,0,0.08)]";
const ISO = "rotate(-16.7deg) scaleY(0.98) skewX(12.47deg)";

/** Tilted stage used by cards 1 and 5 (Figma: rotate -16.7°, skewX 12.47°). */
function TiltStage({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-[-24px] top-[-0.35px] flex h-[321.92px] w-[491.48px] items-center justify-center">
      <div className="relative h-[240px] w-[391px] flex-none" style={{ transform: ISO }}>
        {children}
      </div>
    </div>
  );
}

/* ---------------- 01 · AI Meeting Capture ---------------- */
const WAVE = [6, 12, 18, 10, 22, 14, 8, 16, 24, 12, 6, 18, 10, 20, 14, 8, 12, 22, 16, 10, 6, 14, 20, 12, 8, 16, 10, 6, 12, 18, 8, 14, 10, 6, 8];

function useTimer(active: boolean, startSec: number) {
  const [s, setS] = useState(startSec);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, [active]);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export function MeetingCapture({ active }: { active: boolean }) {
  const time = useTimer(active, 32 * 60 + 14);
  const items = [
    { a: "AR", t: "Draft release notes", d: "Thu" },
    { a: "BK", t: "Update help center", d: "Fri" },
  ];
  return (
    <TiltStage>
      <div className={`${CARD} left-6 top-[22px] w-[300px] gap-3 rounded-[14px] px-3.5 py-3 opacity-85`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative size-2">
              <span className="absolute inset-0 rounded-full bg-[#ef4444]" />
              {active && <span className="absolute inset-0 rounded-full bg-[#ef4444] [animation:live-ring_1.6s_ease-out_infinite]" />}
            </span>
            <p className="text-[13px] font-medium text-ink">Weekly product sync</p>
          </div>
          <p className="font-mono text-[13px] text-[#6b6b6b] tabular-nums">{time}</p>
        </div>
        <div className="flex h-6 items-center gap-[3px]">
          {WAVE.map((h, i) => (
            <span
              key={i}
              className="w-[3px] rounded-[1.5px]"
              style={{
                height: h,
                background: i < 20 ? "#171717" : "#d4d4d4",
                animation: active && i < 20 ? `wave ${420 + ((i * 37) % 360)}ms ease-in-out ${(i * 120) % 600}ms infinite` : undefined,
                ["--lo" as string]: 0.3 + ((i * 13) % 5) / 10,
              }}
            />
          ))}
        </div>
      </div>
      <motion.div
        className={`${CARD} left-14 top-[112px] w-[312px] gap-2.5 rounded-[14px] px-3.5 py-3`}
        initial={{ opacity: 0, y: 40 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 1 }}
      >
        <p className="text-[12px] font-medium text-faint">AI summary</p>
        <div className="flex items-center gap-2">
          <span className="rounded-[6px] bg-accent-50 px-2 py-0.5 text-[12px] font-medium text-accent">Decision</span>
          <p className="text-[13px] text-ink">Ship onboarding v2 on Friday</p>
        </div>
        {items.map((it, i) => (
          <motion.div
            key={it.t}
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -8 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, ease: EASE, delay: 1.5 + i * 0.25 }}
          >
            <div className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-[#e5e5e5] text-[9px] font-medium text-[#404040]">{it.a}</span>
              <p className="text-[13px] text-ink">{it.t}</p>
            </div>
            <p className="font-mono text-[12px] text-[#6b6b6b]">{it.d}</p>
          </motion.div>
        ))}
      </motion.div>
    </TiltStage>
  );
}

/* ---------------- 02 · Smart Priorities (FLIP reorder) ---------------- */
type Task = { id: string; title: string; tag: string; tagCls: string };
const T: Record<string, Task> = {
  fix: { id: "fix", title: "Fix checkout bug", tag: "Urgent", tagCls: "bg-[#fee2e2] text-[#b91c1c]" },
  q3: { id: "q3", title: "Q3 roadmap review", tag: "High impact", tagCls: "bg-[#fef3c7] text-[#a16207]" },
  pricing: { id: "pricing", title: "Refresh pricing page", tag: "Due Fri", tagCls: "bg-chip text-body" },
  backlog: { id: "backlog", title: "Tidy backlog labels", tag: "Later", tagCls: "bg-chip text-muted" },
};
const ROW_FX = [
  { opacity: 1, blur: 0 },
  { opacity: 0.7, blur: 0 },
  { opacity: 0.4, blur: 0.75 },
  { opacity: 0.4, blur: 1.5 },
];

export function SmartPriorities({ active }: { active: boolean }) {
  const [ranked, setRanked] = useState(false);
  useEffect(() => {
    if (!active) return;
    const id = setTimeout(() => setRanked(true), 700);
    return () => clearTimeout(id);
  }, [active]);
  const order = ranked ? ["fix", "q3", "pricing", "backlog"] : ["q3", "fix", "pricing", "backlog"];

  return (
    <div className="absolute left-[-0.88px] top-7 h-[268.8px] w-[437.92px]">
      <div className={`${CARD} left-[26.88px] top-[29.12px] w-[384.16px] gap-[13.44px] rounded-[15.68px] p-[15.68px]`}>
        <div className="flex items-center justify-between opacity-55 blur-[0.75px]">
          <p className="text-[14.56px] font-medium text-ink">Today&apos;s priorities</p>
          <motion.span
            className="rounded-[6.72px] bg-accent-50 px-[8.96px] py-[2.24px] text-[13.44px] font-medium text-accent"
            animate={ranked ? { scale: [1, 1.12, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            AI ranked
          </motion.span>
        </div>
        <LayoutGroup>
          {order.map((id, i) => {
            const t = T[id];
            const top = ranked && i === 0;
            const fx = ROW_FX[i];
            return (
              <motion.div
                key={id}
                layout
                transition={{ layout: { type: "spring", stiffness: 260, damping: 28, duration: 0.5 } }}
                animate={{ opacity: top ? 1 : fx.opacity, filter: `blur(${top ? 0 : fx.blur}px)` }}
                className={`flex w-full items-center justify-between rounded-[10px] ${
                  top ? "bg-ink p-2.5 shadow-[0px_10px_24px_0px_rgba(0,0,0,0.18)]" : "bg-transparent px-0 py-0"
                }`}
              >
                <div className="flex items-center gap-[11.2px]">
                  <span
                    className={`flex size-[24.64px] items-center justify-center rounded-[6.72px] font-mono text-[13.44px] font-medium ${
                      top ? "bg-white text-ink" : "bg-chip text-body"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <p className={`text-[14.56px] ${top ? "text-white" : "text-ink"}`}>{t.title}</p>
                </div>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={`${id}-${top}`}
                    initial={top ? { scale: 0.8, opacity: 0 } : false}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 16, delay: top ? 0.25 : 0 }}
                    className={`rounded-[6.72px] px-[8.96px] py-[2.24px] text-[13.44px] font-medium ${t.tagCls}`}
                  >
                    {t.tag}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            );
          })}
        </LayoutGroup>
      </div>
    </div>
  );
}

/* ---------------- 03 · Weekly Focus Plan ---------------- */
type Blk = { l: string; h: number; k: "focus" | "meet" | "due" };
const WEEK: { d: string; b: Blk[] }[] = [
  { d: "Mon", b: [{ l: "Focus", h: 48.4, k: "focus" }, { l: "Standup", h: 19.8, k: "meet" }, { l: "Focus", h: 37.4, k: "focus" }] },
  { d: "Tue", b: [{ l: "Sync", h: 28.6, k: "meet" }, { l: "Focus", h: 57.2, k: "focus" }, { l: "1:1", h: 19.8, k: "meet" }] },
  { d: "Wed", b: [{ l: "Focus", h: 66, k: "focus" }, { l: "Review", h: 33, k: "meet" }] },
  { d: "Thu", b: [{ l: "Standup", h: 19.8, k: "meet" }, { l: "Deadline", h: 26.4, k: "due" }, { l: "Focus", h: 48.4, k: "focus" }] },
  { d: "Fri", b: [{ l: "Focus", h: 44, k: "focus" }, { l: "Demo", h: 28.6, k: "meet" }, { l: "Wrap-up", h: 22, k: "meet" }] },
];
const BLK: Record<Blk["k"], string> = {
  focus: "bg-accent-50 border-l-[2.2px] border-accent text-accent",
  meet: "bg-chip text-body",
  due: "bg-[#fee2e2] text-[#b91c1c]",
};

export function WeeklyFocus({ active }: { active: boolean }) {
  const hours = useCountUp(18, active, 1200);
  return (
    <div className="absolute left-[14.37px] top-5 h-[264px] w-[430.1px]">
      <div className={`${CARD} left-[26.4px] top-[24.2px] w-[377.3px] gap-[13.2px] rounded-[15.4px] p-[15.4px]`}>
        <div className="flex items-center justify-between font-medium">
          <p className="text-[14.3px] text-ink">This week</p>
          <p className="font-mono text-[13.2px] text-accent tabular-nums">{hours}h focus</p>
        </div>
        <div className="flex w-full gap-[6.6px]">
          {WEEK.map((day, di) => (
            <div key={day.d} className="flex min-w-0 flex-1 flex-col gap-[4.4px]">
              <p className="font-mono text-[12.1px] text-faint">{day.d}</p>
              {day.b.map((b, bi) => (
                <motion.div
                  key={bi}
                  className={`w-full overflow-hidden rounded-[5.5px] pl-[6.6px] pr-[4.4px] pt-[4.4px] ${BLK[b.k]}`}
                  style={{ height: b.h }}
                  initial={{ opacity: 0, y: -12 }}
                  animate={active ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.2 + di * 0.07 + bi * 0.05 }}
                >
                  <p className="text-[9.9px] font-medium whitespace-nowrap">{b.l}</p>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- 04 · Pulse Updates ---------------- */
const ic = (d: string, color: string) => (
  <svg width="15.4" height="15.4" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden dangerouslySetInnerHTML={{ __html: d }} />
);

export function PulseUpdates({ active }: { active: boolean }) {
  const rows = [
    { bg: "#dcfce7", icon: ic('<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>', "#15803d"), t: "12 tasks completed", op: 1 },
    { bg: "#fef3c7", icon: ic('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>', "#a16207"), t: "2 blockers need review", op: 1 },
    { bg: "#f4f4f5", icon: ic('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="m14 14-4 4"/><path d="m10 14 4 4"/>', "#737373"), t: "No meeting needed", op: 0.5 },
  ];
  return (
    <div className="absolute left-[7.7px] top-5 h-[264px] w-[430.1px]">
      <div className={`${CARD} left-[26.4px] top-[26.4px] w-[352px] gap-[13.2px] rounded-[15.4px] p-[15.4px] opacity-85`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[6.6px] text-[14.3px]">
            <p className="font-medium text-ink">Pulse</p>
            <p className="text-faint">· Friday</p>
          </div>
          <span className="rounded-[6.6px] bg-accent-50 px-[8.8px] py-[2.2px] text-[13.2px] font-medium text-accent">Auto</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[13.2px] text-body">Sprint 14</p>
          <div className="flex items-center gap-[11px]">
            <div className="h-[6.6px] w-[165px] overflow-hidden rounded-[3.3px] bg-soft">
              <motion.div className="h-full rounded-[3.3px] bg-ink" initial={{ width: 0 }} animate={active ? { width: 118.8 } : {}} transition={{ duration: 1, ease: EASE, delay: 0.2 }} />
            </div>
            <p className="font-mono text-[13.2px] font-medium text-ink">72%</p>
          </div>
        </div>
      </div>
      <div className={`${CARD} left-[72.6px] top-[143px] w-[330px] gap-[11px] rounded-[15.4px] px-[15.4px] py-[13.2px]`}>
        {rows.map((r, i) => (
          <motion.div
            key={r.t}
            className="flex items-center gap-[11px]"
            initial={{ opacity: 0, x: -8 }}
            animate={active ? { opacity: r.op, x: 0 } : {}}
            transition={{ duration: 0.4, ease: EASE, delay: 0.5 + i * 0.15 }}
          >
            <span className="flex size-[26.4px] items-center justify-center rounded-[7.7px]" style={{ background: r.bg }}>
              {r.icon}
            </span>
            <p className="text-[14.3px] text-ink">{r.t}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- 05 · Team Workload ---------------- */
const TEAM = [
  { i: "AN", n: "Alya", p: 64 },
  { i: "BM", n: "Bima", p: 82 },
  { i: "CT", n: "Citra", p: 112, over: true },
  { i: "DM", n: "Dimas", p: 45 },
];

export function TeamWorkload({ active }: { active: boolean }) {
  return (
    <TiltStage>
      <div className={`${CARD} left-6 top-[22px] w-[343px] gap-3 rounded-[14px] p-3.5`}>
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-medium text-ink">Team capacity</p>
          <p className="text-[12px] text-faint">This week</p>
        </div>
        {TEAM.map((m, i) => (
          <div key={m.i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`flex size-[22px] items-center justify-center rounded-full text-[9px] font-medium ${m.over ? "bg-[#fee2e2] text-[#b91c1c]" : "bg-chip text-[#404040]"}`}>{m.i}</span>
              <p className="text-[13px] text-ink">{m.n}</p>
              {m.over && <span className="rounded-[6px] bg-[#fee2e2] px-2 py-0.5 text-[12px] font-medium text-[#b91c1c]">Over</span>}
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-1.5 w-[130px] overflow-hidden rounded-[3px] bg-soft">
                <motion.div
                  className={`h-full rounded-[3px] ${m.over ? "bg-[#dc2626]" : "bg-ink"}`}
                  initial={{ width: 0 }}
                  animate={active ? { width: (Math.min(m.p, 112) / 120) * 130 } : {}}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.1 }}
                />
              </div>
              <p className={`w-8 font-mono text-[12px] ${m.over ? "text-[#b91c1c]" : "text-body"}`}>{m.p}%</p>
            </div>
          </div>
        ))}
      </div>
    </TiltStage>
  );
}

/* ---------------- 06 · Connected Context ---------------- */
const SRC = [
  { k: "Meeting", s: "· Apr 12", x: 19.8, y: 19.8, icon: '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>' },
  { k: "Doc", s: "· Launch brief", x: 239.07, y: 33, icon: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/>' },
  { k: "Chat", s: "· #product", x: 72.6, y: 202.4, icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' },
];

export function ConnectedContext({ active }: { active: boolean }) {
  const paths = ["M99.55 41.8 C 150 41.8, 170 136.4, 215.6 136.4", "M215.6 136.4 C 260 136.4, 290 55, 324.87 55", "M215.6 136.4 C 200 190, 160 200, 149.05 224.4"];
  return (
    <div className="absolute left-[14.37px] top-5 h-[264px] w-[430.1px]">
      <svg className="absolute inset-0 overflow-visible" width="430" height="264" fill="none" aria-hidden>
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="#d4d4d4"
            strokeWidth="1.1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={active ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.15 }}
          />
        ))}
      </svg>
      <motion.div
        className={`${CARD} left-[107.8px] top-[89.1px] w-[215.6px] gap-[6.6px] rounded-[15.4px] px-[15.4px] py-[13.2px] opacity-85`}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={active ? { scale: 1, opacity: 0.85 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <p className="font-mono text-[12.1px] text-faint">Task</p>
        <p className="text-[15.4px] font-medium text-ink">Launch onboarding v2</p>
        <div className="flex items-center gap-[6.6px]">
          <span className="size-[6.6px] rounded-full bg-accent" />
          <p className="text-[13.2px] text-accent">3 linked sources</p>
        </div>
      </motion.div>
      {SRC.map((s, i) => (
        <motion.div
          key={s.k}
          className={`${CARD} flex-row items-center gap-[8.8px] rounded-[13.2px] py-[7.7px] pl-[8.8px] pr-[13.2px]`}
          style={{ left: s.x, top: s.y }}
          initial={{ opacity: 0, y: 8 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: EASE, delay: 0.5 + i * 0.12 }}
        >
          <span className="flex size-[26.4px] items-center justify-center rounded-[7.7px] bg-chip">
            <svg width="15.4" height="15.4" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden dangerouslySetInnerHTML={{ __html: s.icon }} />
          </span>
          <div className="flex items-center gap-[4.4px] text-[13.2px] whitespace-nowrap">
            <p className="font-medium text-ink">{s.k}</p>
            <p className="text-faint">{s.s}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
