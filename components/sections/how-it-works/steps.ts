export type IconName = "video" | "alert" | "clock" | "hash" | "doc" | "list";

export type Step = {
  key: string;
  tab: { title: string; desc: string };
  leftTitle: string;
  side: { meta: string; pill: string; title: string; desc: string; tag: string }[];
  focus: {
    icon: IconName;
    meta: string;
    badge: { label: string; tone: "accent" | "red" };
    title: string;
    desc: string;
    tags: { label: string; icon?: IconName }[];
    status: string;
    footL: string;
    footR: string;
  };
  related: { title: string; items: string[] };
  app: { crumb: string; icon: IconName; ctx: string; chips: string[]; fields: [string, string][]; rows: [string, string][] };
  chat: { ctx: string; ask: string; answer: string; evidence: [string, string]; link: string };
};

export const STEPS: Step[] = [
  {
    key: "capture",
    tab: {
      title: "Every conversation has a next step.",
      desc: "Ritme transforms meetings, messages, and shared documents into meaningful summaries, decisions, and actionable tasks.",
    },
    leftTitle: "Every conversation, captured",
    side: [
      { meta: "48 new", pill: "Chat", title: "#product", desc: "Can we push pricing to Q3? QA needs the onboarding flow first.", tag: "Slack" },
      { meta: "Edited 2h ago", pill: "Doc", title: "Launch brief", desc: "Scope, owners and checklist for the onboarding v2 launch.", tag: "Docs" },
    ],
    focus: {
      icon: "video",
      meta: "2 min ago · 32 min",
      badge: { label: "Meeting", tone: "accent" },
      title: "Weekly product sync",
      desc: "Ritme turned the discussion into one decision and three clear action items.",
      tags: [
        { label: "#product", icon: "hash" },
        { label: "Launch brief", icon: "doc" },
      ],
      status: "Captured",
      footL: "3 sources",
      footR: "3 owners",
    },
    related: { title: "Next steps created", items: ["Pricing moves to Q3", "Draft release notes · Thu", "QA onboarding flow · Wed"] },
    app: {
      crumb: "Meetings",
      icon: "video",
      ctx: "Weekly product sync",
      chips: ["Meeting", "32 min", "6 people"],
      fields: [
        ["Date", "Thu, Oct 22"],
        ["Owner", "Nadia"],
        ["Status", "Summarized"],
      ],
      rows: [
        ["Pricing moves to Q3", "Decision"],
        ["Draft release notes", "Thu"],
        ["QA onboarding flow", "Wed"],
        ["Update help center", "Fri"],
      ],
    },
    chat: {
      ctx: "Weekly product sync",
      ask: "What did we decide in the sync?",
      answer: "Pricing moves to Q3, and onboarding v2 still ships on Friday.",
      evidence: ["Synced", "sync · 12:40"],
      link: "Open summary",
    },
  },
  {
    key: "prioritize",
    tab: {
      title: "Know what matters most.",
      desc: "AI connects the dots between deadlines, goals, and team capacity to surface the work that deserves your attention.",
    },
    leftTitle: "Ranked by what matters",
    side: [
      { meta: "Priority 2", pill: "Impact", title: "Q3 roadmap review", desc: "High impact on the Q3 plan, no hard deadline yet.", tag: "Roadmap" },
      { meta: "Priority 3", pill: "Due Fri", title: "Refresh pricing page", desc: "Waits on the pricing decision from Thursday.", tag: "Web" },
    ],
    focus: {
      icon: "alert",
      meta: "Ranked #1 · 24 tasks",
      badge: { label: "Urgent", tone: "red" },
      title: "Fix checkout bug",
      desc: "Blocks Friday's launch and keeps users from reaching the activation goal.",
      tags: [{ label: "Launch · Fri" }, { label: "+15% goal" }],
      status: "#1",
      footL: "3 signals",
      footR: "Owner · AR",
    },
    related: { title: "Signals weighed", items: ["Deadline · Launch Friday", "Goal · Activation +15%", "Capacity · Team at 78%"] },
    app: {
      crumb: "Priorities",
      icon: "list",
      ctx: "Top priorities",
      chips: ["AI ranked", "24 tasks", "This week"],
      fields: [
        ["Deadline", "Launch · Fri"],
        ["Goal", "Activation +15%"],
        ["Capacity", "78%"],
      ],
      rows: [
        ["Fix checkout bug", "Urgent"],
        ["Q3 roadmap review", "Impact"],
        ["Refresh pricing page", "Fri"],
        ["Tidy backlog labels", "Later"],
      ],
    },
    chat: {
      ctx: "Top priorities",
      ask: "Why is the checkout bug first?",
      answer: "It blocks Friday's launch, and checkout drop-off is hurting activation.",
      evidence: ["Verified", "launch plan"],
      link: "See ranking",
    },
  },
  {
    key: "focus",
    tab: {
      title: "Turn priorities into progress.",
      desc: "Build a realistic weekly plan, protect time for deep work, and give everyone a clearer path forward.",
    },
    leftTitle: "A week built for focus",
    side: [
      { meta: "10:00 – 10:30", pill: "Sync", title: "Mon · Team sync", desc: "Batched with standup to keep the morning clear.", tag: "Meeting" },
      { meta: "14:00 – 15:00", pill: "Review", title: "Wed · Roadmap review", desc: "Q3 roadmap review with product leads.", tag: "Meeting" },
    ],
    focus: {
      icon: "clock",
      meta: "Tue · 09:00 – 12:00",
      badge: { label: "Focus", tone: "accent" },
      title: "Fix checkout bug",
      desc: "A 3h deep-work block with notifications paused and meetings moved.",
      tags: [{ label: "Priority 1" }, { label: "Due Thu" }],
      status: "Protected",
      footL: "18h focus",
      footR: "5 days",
    },
    related: { title: "Week protected", items: ["18h of focus time", "Meetings batched", "Plan shared with the team"] },
    app: {
      crumb: "Plan",
      icon: "clock",
      ctx: "This week",
      chips: ["18h focus", "5 days", "Shared"],
      fields: [
        ["Focus", "18h"],
        ["Meetings", "7"],
        ["Deadlines", "1"],
      ],
      rows: [
        ["Mon · Focus, Sync", "Mon"],
        ["Tue · Focus, 1:1", "Tue"],
        ["Wed · Focus, Review", "Wed"],
        ["Thu · Standup, Due", "Thu"],
      ],
    },
    chat: {
      ctx: "This week",
      ask: "Can you move my 1:1 to Thursday?",
      answer: "Done. Your 1:1 is now Thu 15:00, and Tuesday's focus block stays protected.",
      evidence: ["Updated", "Thu 15:00"],
      link: "View week",
    },
  },
];
