"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Building2,
  Check,
  GraduationCap,
  LayoutDashboard,
  RotateCcw,
  ShieldCheck,
  X,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { Avatar } from "@/components/ui/avatar";
import { useWorkspace } from "@/components/workspace-provider";

const roleNavigation = [
  {
    label: "Business",
    detail: "Post & review",
    href: "/dashboard/business",
    icon: Building2,
  },
  {
    label: "Student",
    detail: "Discover & deliver",
    href: "/dashboard/student",
    icon: GraduationCap,
  },
  {
    label: "Admin",
    detail: "Assign & support",
    href: "/dashboard/admin",
    icon: ShieldCheck,
  },
];

const pageCopy: Record<string, { eyebrow: string; title: string }> = {
  "/dashboard/business": { eyebrow: "Business workspace", title: "Good morning, Priya" },
  "/dashboard/student": { eyebrow: "Student workspace", title: "Good morning, Ananya" },
  "/dashboard/admin": { eyebrow: "Admin workspace", title: "Community operations" },
};

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { backend, notice, dismissNotice, resetWorkspace } = useWorkspace();
  const copy = pageCopy[pathname] ?? pageCopy["/dashboard/business"];

  return (
    <div className="min-h-screen bg-[#f4f2eb] text-[#14271e]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[252px] flex-col border-r border-[#14271e]/10 bg-[#14271e] px-4 py-5 text-white lg:flex">
        <div className="px-2">
          <Logo href="/" inverted />
        </div>

        <div className="mt-9 px-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/45">Demo roles</div>
        <nav className="mt-3 space-y-1.5" aria-label="Demo role navigation">
          {roleNavigation.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-2xl border px-3 py-3 transition ${
                  active
                    ? "border-[#c9f248]/60 bg-[#c9f248] text-[#14271e] shadow-[0_8px_26px_rgba(201,242,72,0.12)]"
                    : "border-transparent text-white/70 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span className={`grid size-9 place-items-center rounded-xl ${active ? "bg-[#14271e] text-[#c9f248]" : "bg-white/10"}`}>
                  <Icon size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold">{item.label}</span>
                  <span className={`block text-[11px] ${active ? "text-[#14271e]/60" : "text-white/40"}`}>{item.detail}</span>
                </span>
                {active && <Check size={15} strokeWidth={3} />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-7 border-t border-white/10 pt-6">
          <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/60 hover:bg-white/[0.06] hover:text-white">
            <LayoutDashboard size={17} />
            Public marketplace
          </Link>
          <button
            type="button"
            onClick={resetWorkspace}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-white/60 hover:bg-white/[0.06] hover:text-white"
          >
            <RotateCcw size={17} />
            Reset demo data
          </button>
        </div>

        <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.06] p-3.5">
          <div className="flex items-center gap-2.5">
            <Avatar initials="PJ" tone="orange" />
            <div className="min-w-0">
              <div className="truncate text-sm font-bold">Priya Jayaraman</div>
              <div className="truncate text-[11px] text-white/45">Demo account</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 text-[11px] text-white/50">
            <span className={`size-2 rounded-full ${backend === "supabase" ? "bg-[#c9f248]" : "bg-[#f5a57d]"}`} />
            {backend === "checking" ? "Checking workspace…" : backend === "supabase" ? "Supabase connected" : "Local demo mode"}
          </div>
        </div>
      </aside>

      <div className="lg:pl-[252px]">
        <header className="sticky top-0 z-20 border-b border-[#14271e]/10 bg-[#f4f2eb]/90 backdrop-blur-xl">
          <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="lg:hidden"><Logo compact /></div>
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#1f6b4f]">{copy.eyebrow}</div>
                <h1 className="mt-0.5 text-lg font-black tracking-[-0.03em] sm:text-xl">{copy.title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-full border border-[#14271e]/10 bg-white px-3 py-2 text-xs font-bold text-[#14271e]/60 sm:flex">
                <span className="size-2 rounded-full bg-[#c9f248] ring-2 ring-[#14271e]/10" />
                Mock payments only
              </div>
              <button type="button" aria-label="Notifications" className="relative grid size-10 place-items-center rounded-full border border-[#14271e]/10 bg-white transition hover:-translate-y-0.5 hover:shadow-sm">
                <Bell size={17} />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-[#f2835e] ring-2 ring-white" />
              </button>
              <Avatar initials="PJ" tone="orange" className="size-10" />
            </div>
          </div>

          <nav className="flex gap-1 overflow-x-auto px-4 pb-3 lg:hidden" aria-label="Mobile demo roles">
            {roleNavigation.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold ${active ? "border-[#14271e] bg-[#14271e] text-white" : "border-[#14271e]/10 bg-white text-[#14271e]/60"}`}
                >
                  <Icon size={14} /> {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>

      {notice && (
        <div className="fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl border border-[#14271e]/15 bg-[#14271e] p-4 text-white shadow-2xl lg:left-auto lg:right-6 lg:translate-x-0">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#c9f248] text-[#14271e]"><Check size={14} strokeWidth={3} /></span>
          <p className="flex-1 text-sm font-semibold leading-5">{notice}</p>
          <button type="button" onClick={dismissNotice} aria-label="Dismiss notification" className="text-white/50 hover:text-white"><X size={17} /></button>
        </div>
      )}
    </div>
  );
}
