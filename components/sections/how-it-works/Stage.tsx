"use client";

import { motion, type Transition } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { EASE } from "@/components/motion/Reveal";
import type { Step } from "./steps";

const t = (delay: number, duration = 0.45): Transition => ({ duration, ease: EASE, delay });

function Pill({ children, tone = "gray", dot }: { children: React.ReactNode; tone?: "gray" | "accent" | "red" | "green"; dot?: boolean }) {
  const cls = {
    gray: "bg-chip text-body",
    accent: "bg-accent-50 text-accent",
    red: "bg-[#fee2e2] text-[#b91c1c]",
    green: "bg-[#dcfce7] text-[#15803d]",
  }[tone];
  return (
    <span className={`inline-flex items-center gap-[5px] rounded-[5px] px-[7px] py-[2px] text-[11px] font-medium whitespace-nowrap ${cls}`}>
      {dot && <span className="size-[5px] rounded-full bg-[#16a34a]" />}
      {children}
    </span>
  );
}

function Tag({ children, icon }: { children: React.ReactNode; icon?: string }) {
  return (
    <span className="inline-flex items-center gap-[5px] rounded-[6px] border border-line bg-white px-[7px] py-[3px] text-[11px] text-body whitespace-nowrap">
      {icon && <Icon name={icon} size={11} color="#737373" />}
      {children}
    </span>
  );
}

function SideCard({ d, className }: { d: Step["side"][number]; className: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 0.5, filter: "blur(1.6px)" }}
      transition={t(0.1, 0.6)}
      className={`absolute top-[140px] flex w-[240px] flex-col gap-2 rounded-[12px] border border-line bg-white p-3.5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-[10.5px] text-muted">{d.meta}</span>
        <Pill>{d.pill}</Pill>
      </div>
      <p className="text-[13.5px] font-medium text-ink">{d.title}</p>
      <p className="text-[11.5px] leading-4 text-sub">{d.desc}</p>
      <div>
        <Tag>{d.tag}</Tag>
      </div>
    </motion.div>
  );
}

function FocusCard({ f }: { f: Step["focus"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={t(0.05, 0.5)}
      className="relative z-10 flex w-[280px] flex-col gap-2.5 rounded-[12px] border border-line bg-white px-4 py-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-center justify-between">
        <span className="flex size-6 items-center justify-center rounded-[6px] border border-line bg-white">
          <Icon name={f.icon} size={13} color="#171717" />
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10.5px] text-muted">{f.meta}</span>
          <Pill tone={f.badge.tone}>{f.badge.label}</Pill>
        </div>
      </div>
      <p className="text-[15px] font-semibold text-ink">{f.title}</p>
      <p className="text-[12px] leading-[17px] text-sub">{f.desc}</p>
      <div className="flex flex-wrap items-center gap-1.5">
        {f.tags.map((g) => (
          <Tag key={g.label} icon={g.icon}>
            {g.label}
          </Tag>
        ))}
        <Pill tone="green" dot>
          {f.status}
        </Pill>
      </div>
      <div className="h-px w-full bg-soft" />
      <div className="flex items-center justify-between font-mono text-[10.5px] text-sub">
        <span className="flex items-center gap-1.5">
          <Icon name="list" size={12} color="#737373" />
          {f.footL}
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="user" size={12} color="#737373" />
          {f.footR}
        </span>
      </div>
    </motion.div>
  );
}

function RelatedCard({ r }: { r: Step["related"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={t(0.25)}
      className="relative z-10 flex w-[236px] flex-col gap-[9px] rounded-[10px] border-[1.5px] border-[#86efac] bg-white px-3.5 pb-[13px] pt-3 shadow-[0_6px_16px_rgba(0,0,0,0.06)]"
    >
      <p className="text-[13px] font-semibold text-ink">{r.title}</p>
      {r.items.map((it, i) => (
        <div key={it} className="flex items-center gap-2">
          <motion.span
            className="flex size-[15px] items-center justify-center rounded-[4px] bg-[#22c55e]"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 22, delay: 0.45 + i * 0.15 }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
              <motion.path
                d="M20 6 9 17l-5-5"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: 0.55 + i * 0.15 }}
              />
            </svg>
          </motion.span>
          <span className="text-[12px] text-ink">{it}</span>
        </div>
      ))}
    </motion.div>
  );
}

function AppBackground({ a }: { a: Step["app"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 0.5, filter: "blur(1.8px)" }}
      transition={t(0.05, 0.6)}
      className="absolute left-[26px] top-[122px] flex h-[380px] w-[470px] flex-col gap-4 rounded-[12px] border border-line bg-white px-[18px] pb-[18px] pt-4"
    >
      <div className="flex items-center gap-2">
        <span className="size-[18px] rounded-[5px] bg-ink" />
        <span className="text-[12px] font-medium text-ink">Ritme</span>
        <span className="text-[12px] text-muted">/ &nbsp;{a.crumb}</span>
      </div>
      <div className="flex items-center gap-2.5">
        <Icon name={a.icon} size={18} color="#171717" />
        <span className="text-[18px] font-medium text-ink">{a.ctx}</span>
      </div>
      <div className="flex gap-1.5">
        {a.chips.map((c) => (
          <Tag key={c}>{c}</Tag>
        ))}
      </div>
      <div className="flex gap-9">
        {a.fields.map(([k, v]) => (
          <div key={k} className="flex flex-col gap-1">
            <span className="font-mono text-[10.5px] text-muted">{k}</span>
            <span className="text-[12px] text-ink">{v}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col rounded-[8px] border border-soft">
        {a.rows.map(([l, s], i) => (
          <div key={l} className={`flex items-center justify-between px-3 py-2.5 ${i ? "border-t border-soft" : ""}`}>
            <span className="text-[12px] text-ink">{l}</span>
            <Pill>{s}</Pill>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Typing() {
  return (
    <span className="flex items-center gap-1 px-1 py-1.5" aria-label="Ritme is typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-muted"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
        />
      ))}
    </span>
  );
}

function ChatWidget({ c }: { c: Step["chat"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={t(0.1, 0.5)}
      className="absolute right-10 top-[114px] z-10 flex w-[290px] flex-col gap-2.5 rounded-[12px] border border-line bg-white p-3 shadow-[0_18px_44px_rgba(0,0,0,0.14),0_1px_2px_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold text-ink">Ritme Assistant</span>
        <span className="flex items-center gap-2.5">
          <Icon name="max" size={12} color="#a3a3a3" />
          <Icon name="x" size={13} color="#a3a3a3" />
        </span>
      </div>
      <div className="flex gap-1.5">
        <Tag icon="msg">Chat</Tag>
        <span className="inline-flex items-center gap-[5px] rounded-[6px] border border-line bg-white px-[7px] py-[3px] text-[11px] text-body whitespace-nowrap">
          <span className="size-1.5 rounded-full bg-accent" />
          {c.ctx}
        </span>
      </div>
      {/* user */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={t(0.3, 0.35)} className="flex flex-col items-end gap-[5px]">
        <span className="flex items-center gap-1.5">
          <span className="font-mono text-[10.5px] text-muted">Nadia</span>
          <span className="flex size-4 items-center justify-center rounded-full bg-[#f59e0b] text-[8.5px] font-semibold text-white">N</span>
        </span>
        <span className="rounded-[10px] rounded-tr-[3px] bg-accent px-[11px] py-2 text-[12px] font-medium text-white">{c.ask}</span>
      </motion.div>
      {/* assistant */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(0.55, 0.3)} className="flex flex-col gap-1.5">
        <span className="flex items-center gap-1.5">
          <Icon name="spark" size={12} color="#0369a1" />
          <span className="text-[10.5px] font-medium text-sub">Ritme AI</span>
        </span>
        <div className="relative grid">
          {/* typing indicator for 600ms, then the answer */}
          <motion.div
            className="col-start-1 row-start-1 self-start justify-self-start rounded-[10px] rounded-tl-[3px] border border-line bg-canvas px-2"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.15, delay: 1.2 }}
          >
            <Typing />
          </motion.div>
          <motion.div
            className="col-start-1 row-start-1 flex flex-col gap-2 rounded-[10px] rounded-tl-[3px] border border-line bg-canvas px-[11px] py-2.5"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(1.25, 0.35)}
          >
            <p className="text-[12px] leading-[17px] text-ink">{c.answer}</p>
            <span className="font-mono text-[10px] text-muted">Evidence</span>
            <motion.div
              className="flex items-center justify-between gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 18, delay: 1.55 }}
            >
              <span className="flex items-center gap-1.5">
                <Pill tone="green" dot>
                  {c.evidence[0]}
                </Pill>
                <span className="font-mono text-[10.5px] whitespace-nowrap text-sub">{c.evidence[1]}</span>
              </span>
              <Pill tone="accent">{c.link}</Pill>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <div className="flex items-center gap-2 rounded-[8px] border border-line bg-white py-1.5 pl-2.5 pr-1.5">
        <span className="flex-1 text-[11.5px] text-muted">Ask a question</span>
        <span className="flex size-6 items-center justify-center rounded-[6px] bg-accent">
          <Icon name="up" size={13} color="#fff" stroke={2.2} />
        </span>
      </div>
    </motion.div>
  );
}

function PanelTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={t(0)} className="absolute inset-x-0 top-10 z-10 text-center text-[17px] font-medium text-ink">
      {children}
    </motion.p>
  );
}

/** One step preview: left "context + focus" panel and right "Ask Ritme" panel. */
export default function Stage({ step }: { step: Step }) {
  return (
    <div className="relative grid h-full grid-cols-1 md:grid-cols-2">
      <div aria-hidden className="absolute inset-y-0 left-1/2 hidden w-px bg-line md:block" />
      {/* Left */}
      <div className="relative h-[540px] overflow-hidden">
        <PanelTitle>{step.leftTitle}</PanelTitle>
        <SideCard d={step.side[0]} className="-left-[112px]" />
        <SideCard d={step.side[1]} className="-right-[112px]" />
        <div className="absolute inset-x-0 top-[114px] flex flex-col items-center gap-[22px]">
          <FocusCard f={step.focus} />
          <RelatedCard r={step.related} />
        </div>
      </div>
      {/* Right */}
      <div className="relative h-[540px] overflow-hidden border-t border-line md:border-t-0">
        <PanelTitle>Ask Ritme</PanelTitle>
        <AppBackground a={step.app} />
        <ChatWidget c={step.chat} />
      </div>
    </div>
  );
}

