import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock3,
  Code2,
  GraduationCap,
  IndianRupee,
  MapPin,
  MessageCircleMore,
  Palette,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { Avatar } from "@/components/ui/avatar";
import { initialTasks } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/format";

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#f7f4ed] text-[#14271e]">
      <header className="relative z-40 border-b border-[#14271e]/10 bg-[#f7f4ed]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-7 text-xs font-bold text-[#14271e]/60 md:flex" aria-label="Main navigation">
            <a href="#how-it-works" className="transition hover:text-[#14271e]">How it works</a>
            <a href="#open-tasks" className="transition hover:text-[#14271e]">Open tasks</a>
            <a href="#for-everyone" className="transition hover:text-[#14271e]">For communities</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/student" className="hidden px-3 py-2 text-xs font-black text-[#14271e]/60 hover:text-[#14271e] sm:block">Browse work</Link>
            <Link href="/dashboard/business" className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#14271e] bg-[#14271e] px-4 text-xs font-black text-white shadow-[2px_2px_0_#c9f248] transition hover:-translate-y-0.5">
              Open live demo <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative border-b border-[#14271e]/10">
          <div className="absolute -left-36 top-28 size-80 rounded-full bg-[#c9f248]/25 blur-3xl" />
          <div className="absolute -right-36 top-0 size-96 rounded-full bg-[#f49a78]/18 blur-3xl" />
          <div className="relative mx-auto grid min-h-[680px] max-w-[1240px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#14271e]/12 bg-white/70 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] shadow-sm">
                <span className="grid size-5 place-items-center rounded-full bg-[#c9f248]"><Sparkles size={11} /></span>
                Local work, structured simply
              </div>
              <h1 className="mt-6 max-w-[690px] text-[clamp(3.1rem,7.4vw,6.7rem)] font-black leading-[0.88] tracking-[-0.072em]">
                Small tech tasks.<br /><span className="relative text-[#1f6b4f]">Real local</span> impact.
              </h1>
              <p className="mt-7 max-w-xl text-base font-medium leading-7 text-[#14271e]/62 sm:text-lg sm:leading-8">SkillBridge Local connects neighborhood businesses that need practical digital help with students ready to build experience that matters.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/dashboard/business" className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-[#14271e] bg-[#c9f248] px-6 text-sm font-black shadow-[4px_4px_0_#14271e] transition hover:-translate-y-1 hover:shadow-[5px_6px_0_#14271e]">
                  Post a task in the demo <ArrowRight size={17} />
                </Link>
                <Link href="/dashboard/student" className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-[#14271e]/15 bg-white/70 px-6 text-sm font-black transition hover:border-[#14271e] hover:bg-white">
                  I’m a student <GraduationCap size={17} />
                </Link>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] font-bold text-[#14271e]/50">
                <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#1f6b4f]" /> Clear micro-scopes</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#1f6b4f]" /> Admin-supported matching</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#1f6b4f]" /> No real payments yet</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[570px] lg:mx-0">
              <div className="absolute -left-8 -top-7 hidden rotate-[-8deg] rounded-xl border border-[#14271e] bg-[#fff3d6] px-4 py-3 text-xs font-black shadow-[3px_3px_0_#14271e] sm:block">
                <span className="block text-[9px] uppercase tracking-[0.13em] text-[#8a5c13]">Local signal</span>
                4 students nearby
              </div>
              <div className="absolute -bottom-7 -right-5 z-10 hidden rotate-[5deg] rounded-xl border border-[#14271e] bg-[#f49a78] px-4 py-3 text-xs font-black shadow-[3px_3px_0_#14271e] sm:block">
                <span className="flex items-center gap-1.5"><BadgeCheck size={15} /> Scope ready to post</span>
              </div>

              <div className="rounded-[28px] border border-[#14271e] bg-[#14271e] p-2 shadow-[10px_12px_0_rgba(31,107,79,0.18)]">
                <div className="overflow-hidden rounded-[21px] bg-[#f5f2ea]">
                  <div className="flex items-center justify-between border-b border-[#14271e]/10 bg-white px-4 py-3.5">
                    <div className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-[#f49a78]" /><span className="size-2.5 rounded-full bg-[#f3d46a]" /><span className="size-2.5 rounded-full bg-[#c9f248]" /></div>
                    <div className="rounded-full bg-[#f4f2eb] px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#14271e]/45">Business dashboard</div>
                    <div className="size-7 rounded-full bg-[#d8c9ff]" />
                  </div>
                  <div className="grid gap-3 p-4 sm:grid-cols-[1fr_0.72fr]">
                    <div>
                      <div className="rounded-2xl border border-[#14271e]/10 bg-white p-4">
                        <div className="flex items-center justify-between"><div><div className="text-[9px] font-black uppercase tracking-[0.14em] text-[#1f6b4f]">Active task</div><h3 className="mt-1 text-base font-black tracking-[-0.03em]">QR menu for our café</h3></div><span className="grid size-9 place-items-center rounded-xl bg-[#e7f0e9] text-[#1f6b4f]"><Code2 size={17} /></span></div>
                        <div className="mt-4 flex items-center justify-between text-[9px] font-bold text-[#14271e]/45"><span>Scope reviewed</span><span>3 applicants</span></div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#14271e]/8"><div className="h-full w-[58%] rounded-full bg-[#c9f248] ring-1 ring-inset ring-[#14271e]/10" /></div>
                        <div className="mt-4 flex -space-x-2"><Avatar initials="AR" tone="lilac" /><Avatar initials="KM" tone="orange" /><Avatar initials="VS" tone="cream" /><span className="grid size-9 place-items-center rounded-full border-2 border-white bg-[#14271e] text-[9px] font-black text-white">+2</span></div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {[['8','hrs scoped'],['₹3.5k','mock budget'],['5d','delivery']].map(([value,label]) => <div key={label} className="rounded-xl border border-[#14271e]/8 bg-white p-3"><div className="text-sm font-black">{value}</div><div className="mt-1 text-[7px] font-black uppercase tracking-[0.08em] text-[#14271e]/35">{label}</div></div>)}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-[#14271e]/10 bg-[#14271e] p-4 text-white">
                      <span className="grid size-9 place-items-center rounded-xl bg-[#c9f248] text-[#14271e]"><WandSparkles size={17} /></span>
                      <div className="mt-4 text-[9px] font-black uppercase tracking-[0.14em] text-[#c9f248]">AI scope</div>
                      <h3 className="mt-1 text-sm font-black leading-5">Brief turned into three clear deliverables.</h3>
                      <div className="mt-4 space-y-2.5">
                        {["Mobile-first menu", "Editable content", "Print-ready QR"].map((item) => <div key={item} className="flex items-center gap-2 text-[9px] font-semibold text-white/60"><CheckCircle2 size={12} className="text-[#c9f248]" />{item}</div>)}
                      </div>
                      <div className="mt-5 rounded-lg bg-white/8 p-2.5 text-[8px] font-semibold leading-4 text-white/45">Owner approves one review round before completion.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#14271e]/10 bg-white/55">
            <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-y-6 px-4 py-7 sm:grid-cols-4 sm:px-6">
              <TrustStat value="60 sec" label="to shape a rough brief" icon={WandSparkles} />
              <TrustStat value="3 roles" label="one shared workflow" icon={Users} />
              <TrustStat value="₹0" label="real payments in MVP" icon={IndianRupee} />
              <TrustStat value="100%" label="built for local action" icon={MapPin} />
            </div>
          </div>
        </section>

        <section id="open-tasks" className="mx-auto max-w-[1240px] px-4 py-20 sm:px-6 sm:py-24">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.17em] text-[#1f6b4f]">A better first project</div>
              <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-[-0.055em] sm:text-5xl">Useful work, sized for a student schedule.</h2>
            </div>
            <Link href="/dashboard/student" className="inline-flex items-center gap-2 text-sm font-black text-[#1f6b4f]">Browse as a student <ArrowRight size={16} /></Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {initialTasks.map((task, index) => (
              <article key={task.id} className={`group flex min-h-[320px] flex-col rounded-[24px] border border-[#14271e] p-5 transition hover:-translate-y-1 hover:shadow-[5px_6px_0_#14271e] ${index === 0 ? "bg-[#c9f248]" : index === 1 ? "bg-[#fff3d6]" : index === 2 ? "bg-[#dfe8ff]" : "bg-[#ffe5db]"}`}>
                <div className="flex items-start justify-between gap-3"><span className="rounded-full border border-[#14271e]/15 bg-white/50 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.09em]">{task.category}</span><ArrowUpRight size={17} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></div>
                <h3 className="mt-5 text-xl font-black leading-6 tracking-[-0.035em]">{task.title}</h3>
                <p className="mt-2 text-xs font-bold text-[#14271e]/50">{task.businessName}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">{task.skills.slice(0, 2).map((skill) => <span key={skill} className="rounded-full bg-white/55 px-2.5 py-1 text-[9px] font-bold">{skill}</span>)}</div>
                <div className="mt-auto grid grid-cols-2 gap-2 border-t border-[#14271e]/12 pt-4 text-[10px] font-black"><span className="flex items-center gap-1.5"><IndianRupee size={13} />{formatCurrency(task.budget).replace("₹", "")}</span><span className="flex items-center justify-end gap-1.5"><Clock3 size={13} />{task.estimatedHours} hrs</span></div>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="border-y border-[#14271e]/10 bg-[#14271e] text-white">
          <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-6 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.17em] text-[#c9f248]">One bridge, three views</div>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.055em] sm:text-5xl">Simple enough to use today.</h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/55">The MVP keeps coordination visible. Everyone knows the brief, the owner, the next step and the current status.</p>
                <Link href="/dashboard/admin" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#c9f248]">See the full admin flow <ArrowRight size={16} /></Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <HowCard number="01" icon={Building2} title="Business posts" description="Describe the need in plain language. Scope assist turns it into a student-ready brief." accent="bg-[#c9f248] text-[#14271e]" />
                <HowCard number="02" icon={GraduationCap} title="Student applies" description="Students see deliverables, skills, hours and mock budget before making a short pitch." accent="bg-[#f49a78] text-[#14271e]" />
                <HowCard number="03" icon={ShieldCheck} title="Admin assigns" description="A community admin reviews fit, confirms the match and keeps delivery moving." accent="bg-[#d8c9ff] text-[#14271e]" />
              </div>
            </div>
          </div>
        </section>

        <section id="for-everyone" className="mx-auto max-w-[1240px] px-4 py-20 sm:px-6 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.88fr] lg:items-center">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.17em] text-[#1f6b4f]">Made for everyday digital gaps</div>
              <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-[-0.055em] sm:text-5xl">From “we should fix that” to done.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#14271e]/58">Not every business needs an agency. Not every student needs another tutorial. SkillBridge creates a practical middle ground.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Category icon={Code2} title="Web & no-code" detail="Menus, forms, simple pages" />
                <Category icon={Palette} title="Design & content" detail="Post kits, flyers, templates" />
                <Category icon={BarChart3} title="Data & automation" detail="Trackers, dashboards, clean-up" />
                <Category icon={Zap} title="Local tech support" detail="Profiles, setup, small fixes" />
              </div>
            </div>
            <div className="relative rounded-[28px] border border-[#14271e] bg-[#fff3d6] p-5 shadow-[7px_8px_0_#14271e] sm:p-7">
              <div className="absolute -right-4 -top-5 rotate-6 rounded-xl border border-[#14271e] bg-[#c9f248] px-3 py-2 text-[10px] font-black shadow-[2px_2px_0_#14271e]">Fair match, human check ✓</div>
              <div className="flex items-center justify-between"><div><div className="text-[9px] font-black uppercase tracking-[0.15em] text-[#8a5c13]">Match preview</div><h3 className="mt-1 text-xl font-black">QR menu · Mylapore</h3></div><span className="grid size-11 place-items-center rounded-xl bg-[#14271e] text-[#c9f248]"><Sparkles size={20} /></span></div>
              <div className="mt-6 space-y-3">
                {[
                  ["AR", "Ananya Rao", "96%", "React · Canva · can start tomorrow", "lilac"],
                  ["KM", "Kavin M", "91%", "Next.js · Supabase · 12 hrs/week", "orange"],
                  ["VS", "Vikram Selvan", "84%", "WordPress · SEO · 6 hrs/week", "cream"],
                ].map(([initials, name, match, detail, tone], index) => (
                  <div key={name} className={`flex items-center gap-3 rounded-2xl border p-3.5 ${index === 0 ? "border-[#1f6b4f]/35 bg-white" : "border-[#14271e]/8 bg-white/55"}`}>
                    <Avatar initials={initials} tone={tone as "lilac" | "orange" | "cream"} />
                    <div className="min-w-0 flex-1"><div className="flex items-center gap-1.5 text-xs font-black">{name}{index === 0 && <BadgeCheck size={13} className="text-[#1f6b4f]" />}</div><div className="mt-1 truncate text-[9px] font-semibold text-[#14271e]/45">{detail}</div></div>
                    <div className="text-sm font-black text-[#1f6b4f]">{match}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between rounded-xl bg-[#14271e] px-4 py-3 text-white"><span className="text-[10px] font-semibold text-white/55">Admin recommendation</span><span className="flex items-center gap-1.5 text-xs font-black text-[#c9f248]"><Star size={13} fill="currentColor" /> Ananya is the best fit</span></div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 sm:pb-24">
          <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[30px] border border-[#14271e] bg-[#c9f248] px-5 py-12 text-center shadow-[7px_8px_0_#14271e] sm:px-10 sm:py-16">
            <div className="absolute -left-12 -top-20 size-48 rounded-full border-[30px] border-white/25" /><div className="absolute -bottom-20 -right-10 size-56 rounded-full border-[36px] border-[#14271e]/8" />
            <div className="relative"><div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#14271e]/15 bg-white/45 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em]"><MessageCircleMore size={13} /> The MVP is ready to explore</div><h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black tracking-[-0.06em] sm:text-6xl">Give one small task a clear next step.</h2><p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-6 text-[#14271e]/60">Switch between all three demo roles and test the full local matching workflow.</p><Link href="/dashboard/business" className="mt-7 inline-flex h-12 items-center gap-2 rounded-xl border border-[#14271e] bg-[#14271e] px-6 text-sm font-black text-white transition hover:-translate-y-1">Launch SkillBridge demo <ArrowRight size={17} /></Link></div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#14271e]/10 bg-white/55">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between"><Logo /><p className="text-xs font-semibold text-[#14271e]/40">MVP demo · Built with Next.js, Tailwind, Supabase & Netlify.</p><div className="flex items-center gap-4 text-xs font-bold text-[#14271e]/50"><Link href="/dashboard/business" className="hover:text-[#14271e]">Business</Link><Link href="/dashboard/student" className="hover:text-[#14271e]">Student</Link><Link href="/dashboard/admin" className="hover:text-[#14271e]">Admin</Link></div></div>
      </footer>
    </div>
  );
}

function TrustStat({ value, label, icon: Icon }: { value: string; label: string; icon: typeof Users }) {
  return <div className="flex items-center justify-center gap-3 border-[#14271e]/10 px-3 sm:border-r sm:last:border-r-0"><span className="grid size-9 place-items-center rounded-xl bg-[#e7f0e9] text-[#1f6b4f]"><Icon size={16} /></span><div><div className="text-lg font-black tracking-[-0.035em]">{value}</div><div className="text-[9px] font-black uppercase tracking-[0.08em] text-[#14271e]/35">{label}</div></div></div>;
}

function HowCard({ number, icon: Icon, title, description, accent }: { number: string; icon: typeof Building2; title: string; description: string; accent: string }) {
  return <article className="rounded-[22px] border border-white/12 bg-white/[0.06] p-5"><div className="flex items-center justify-between"><span className={`grid size-10 place-items-center rounded-xl ${accent}`}><Icon size={18} /></span><span className="text-xs font-black text-white/25">{number}</span></div><h3 className="mt-6 text-lg font-black">{title}</h3><p className="mt-2 text-xs leading-6 text-white/48">{description}</p></article>;
}

function Category({ icon: Icon, title, detail }: { icon: typeof Code2; title: string; detail: string }) {
  return <div className="flex items-center gap-3 rounded-2xl border border-[#14271e]/10 bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#1f6b4f]/30"><span className="grid size-10 place-items-center rounded-xl bg-[#e7f0e9] text-[#1f6b4f]"><Icon size={18} /></span><div><div className="text-sm font-black">{title}</div><div className="mt-0.5 text-[10px] font-semibold text-[#14271e]/42">{detail}</div></div></div>;
}
