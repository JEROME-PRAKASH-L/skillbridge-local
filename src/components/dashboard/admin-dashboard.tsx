"use client";

import { useMemo } from "react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { useWorkspace } from "@/components/workspace-provider";
import { formatCurrency, statusLabel, statusTone } from "@/lib/format";
import type { ActivityItem, Student } from "@/lib/types";

export function AdminDashboard() {
  const { tasks, applications, students, activity, assignTask, advanceTask } = useWorkspace();

  const queue = useMemo(() => {
    return tasks
      .filter((task) => ["open", "reviewing"].includes(task.status))
      .map((task) => {
        const taskApplications = applications.filter((application) => application.taskId === task.id && application.status !== "declined");
        const ranked = taskApplications
          .map((application) => {
            const student = students.find((item) => item.id === application.studentId);
            const skillMatch = student ? task.skills.filter((skill) => student.skills.some((studentSkill) => studentSkill.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(studentSkill.toLowerCase()))).length : 0;
            return { application, student, score: (student?.rating ?? 0) * 10 + skillMatch * 8 };
          })
          .filter((item): item is typeof item & { student: Student } => Boolean(item.student))
          .sort((a, b) => b.score - a.score);
        return { task, applicants: ranked, recommended: ranked[0]?.student };
      });
  }, [tasks, applications, students]);

  const activeDelivery = tasks.filter((task) => ["assigned", "in_progress", "review"].includes(task.status));
  const completed = tasks.filter((task) => task.status === "completed");
  const pendingApplications = applications.filter((application) => ["pending", "shortlisted"].includes(application.status));

  return (
    <>
      <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1f6b4f]/15 bg-[#e7f0e9] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#1f6b4f]"><ShieldCheck size={13} /> Community control room</div>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-4xl">Keep every small promise moving.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#14271e]/58">Review the queue, make a fair assignment and step in before a local task gets stuck.</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-[#14271e]/10 bg-white px-4 py-3">
          <span className="relative flex size-3"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[#1f6b4f] opacity-30" /><span className="relative inline-flex size-3 rounded-full bg-[#1f6b4f]" /></span>
          <div><div className="text-xs font-black">Marketplace healthy</div><div className="text-[10px] text-[#14271e]/40">No blocked tasks detected</div></div>
        </div>
      </section>

      <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AdminMetric icon={Users} label="Applicants to review" value={String(pendingApplications.length)} helper={`${queue.length} open task${queue.length === 1 ? "" : "s"}`} tone="green" />
        <AdminMetric icon={BadgeCheck} label="Active assignments" value={String(activeDelivery.length)} helper="Across local businesses" tone="blue" />
        <AdminMetric icon={Clock3} label="Median task time" value="6.2d" helper="Demo delivery estimate" tone="orange" />
        <AdminMetric icon={CircleDollarSign} label="Mock completed value" value={formatCurrency(completed.reduce((sum, task) => sum + task.budget, 0))} helper="No funds moved" tone="cream" />
      </section>

      <section className="mt-7 rounded-[24px] border border-[#14271e]/10 bg-white p-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div><h3 className="text-lg font-black">Marketplace pipeline</h3><p className="mt-1 text-xs text-[#14271e]/45">Current task count at every delivery stage.</p></div>
          <span className="rounded-full bg-[#f4f2eb] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-[#14271e]/50">Live demo state</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {(["open", "reviewing", "assigned", "in_progress", "review", "completed"] as const).map((status) => {
            const count = tasks.filter((task) => task.status === status).length;
            return (
              <div key={status} className="relative overflow-hidden rounded-2xl border border-[#14271e]/8 bg-[#fbfaf6] p-3.5">
                <div className="text-2xl font-black tracking-[-0.04em]">{count}</div>
                <div className="mt-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#14271e]/40">{statusLabel(status)}</div>
                <div className={`absolute bottom-0 left-0 h-1 ${count ? "bg-[#c9f248]" : "bg-[#14271e]/5"}`} style={{ width: count ? `${Math.min(100, 35 + count * 22)}%` : "100%" }} />
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.65fr)]">
        <div className="rounded-[24px] border border-[#14271e]/10 bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#1f6b4f]"><Sparkles size={13} /> Smart match queue</div><h3 className="mt-1 text-xl font-black tracking-[-0.03em]">Assignments needing attention</h3></div>
            <span className="grid size-10 place-items-center rounded-xl bg-[#e7f0e9] text-[#1f6b4f]"><Users size={18} /></span>
          </div>
          <div className="mt-5 space-y-3">
            {queue.map(({ task, applicants, recommended }) => (
              <article key={task.id} className="rounded-2xl border border-[#14271e]/10 bg-[#fbfaf6] p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2"><span className={`rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.08em] ${statusTone(task.status)}`}>{statusLabel(task.status)}</span><span className="text-[10px] font-bold text-[#14271e]/40">{task.businessName} · {formatCurrency(task.budget)}</span></div>
                    <h4 className="mt-2 text-[15px] font-black tracking-[-0.02em]">{task.title}</h4>
                    <div className="mt-2 flex flex-wrap gap-1.5">{task.skills.slice(0, 3).map((skill) => <span key={skill} className="rounded-full bg-white px-2 py-1 text-[9px] font-bold text-[#14271e]/55 ring-1 ring-[#14271e]/8">{skill}</span>)}</div>
                  </div>
                  {recommended ? (
                    <div className="flex min-w-0 flex-col gap-3 rounded-xl border border-[#1f6b4f]/15 bg-[#e7f0e9] p-3 sm:flex-row sm:items-center lg:w-[365px]">
                      <div className="flex min-w-0 flex-1 items-center gap-2.5">
                        <Avatar initials={recommended.initials} tone="lilac" />
                        <div className="min-w-0"><div className="truncate text-xs font-black">{recommended.name}</div><div className="mt-0.5 flex items-center gap-1 text-[9px] font-bold text-[#14271e]/45"><Star size={10} fill="currentColor" /> {recommended.rating} · top match</div></div>
                      </div>
                      <button type="button" onClick={() => assignTask(task.id, recommended.id)} className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#14271e] bg-[#14271e] px-3 text-[10px] font-black text-white transition hover:-translate-y-0.5">Assign <ArrowRight size={13} /></button>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-[#14271e]/15 px-4 py-3 text-center text-[10px] font-semibold text-[#14271e]/40 lg:w-[365px]">Waiting for the first application</div>
                  )}
                </div>
                {applicants.length > 1 && <div className="mt-3 text-[9px] font-semibold text-[#14271e]/35">{applicants.length - 1} more candidate{applicants.length === 2 ? "" : "s"} available for review</div>}
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-[24px] border border-[#14271e]/10 bg-white p-5">
          <div className="flex items-center justify-between"><div><div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#1f6b4f]">Network pulse</div><h3 className="mt-1 text-lg font-black">Recent activity</h3></div><Activity size={18} className="text-[#1f6b4f]" /></div>
          <div className="mt-5 space-y-4">
            {activity.slice(0, 6).map((item, index) => <ActivityRow key={item.id} item={item} last={index === Math.min(activity.length, 6) - 1} />)}
          </div>
        </aside>
      </section>

      <section className="mt-7 rounded-[24px] border border-[#14271e]/10 bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3"><div><h3 className="text-xl font-black tracking-[-0.03em]">Active delivery</h3><p className="mt-1 text-xs text-[#14271e]/45">Advance a task to simulate the full tracking flow.</p></div><CheckCircle2 size={19} className="text-[#1f6b4f]" /></div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left">
            <thead><tr className="text-[9px] font-black uppercase tracking-[0.11em] text-[#14271e]/35"><th className="px-3 py-1">Task</th><th className="px-3 py-1">Student</th><th className="px-3 py-1">Status</th><th className="px-3 py-1">Progress</th><th className="px-3 py-1">Mock payment</th><th className="px-3 py-1 text-right">Action</th></tr></thead>
            <tbody>
              {activeDelivery.map((task) => {
                const student = students.find((item) => item.id === task.assignedStudentId);
                return (
                  <tr key={task.id} className="bg-[#fbfaf6] text-xs font-semibold">
                    <td className="rounded-l-xl px-3 py-3.5"><div className="max-w-[250px] truncate font-black">{task.title}</div><div className="mt-0.5 text-[9px] text-[#14271e]/40">{task.businessName}</div></td>
                    <td className="px-3 py-3.5">{student ? <div className="flex items-center gap-2"><Avatar initials={student.initials} tone="lilac" className="size-7 text-[9px]" /><span>{student.name}</span></div> : "—"}</td>
                    <td className="px-3 py-3.5"><span className={`rounded-full border px-2.5 py-1 text-[9px] font-black uppercase ${statusTone(task.status)}`}>{statusLabel(task.status)}</span></td>
                    <td className="px-3 py-3.5"><div className="flex items-center gap-2"><div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#14271e]/8"><div className="h-full rounded-full bg-[#1f6b4f]" style={{ width: `${task.progress}%` }} /></div><span className="text-[10px] text-[#14271e]/45">{task.progress}%</span></div></td>
                    <td className="px-3 py-3.5"><span className="rounded-full bg-[#fff1d9] px-2.5 py-1 text-[9px] font-black text-[#8a5c13]">Held · mock</span></td>
                    <td className="rounded-r-xl px-3 py-3.5 text-right"><button type="button" onClick={() => advanceTask(task.id)} className="inline-flex items-center gap-1 text-[10px] font-black text-[#1f6b4f] hover:underline">Advance <ArrowRight size={13} /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function AdminMetric({ icon: Icon, label, value, helper, tone }: { icon: typeof Users; label: string; value: string; helper: string; tone: "green" | "blue" | "orange" | "cream" }) {
  const tones = { green: "bg-[#e7f0e9] text-[#1f6b4f]", blue: "bg-[#e8efff] text-[#31579b]", orange: "bg-[#ffe8df] text-[#a2472d]", cream: "bg-[#fff3d6] text-[#8a5c13]" };
  return <div className="rounded-[20px] border border-[#14271e]/10 bg-white p-4"><div className="flex items-start justify-between gap-3"><div><div className="text-[10px] font-bold text-[#14271e]/45">{label}</div><div className="mt-1 text-2xl font-black tracking-[-0.04em]">{value}</div><div className="mt-1 text-[9px] font-semibold text-[#14271e]/38">{helper}</div></div><span className={`grid size-10 place-items-center rounded-xl ${tones[tone]}`}><Icon size={18} /></span></div></div>;
}

function ActivityRow({ item, last }: { item: ActivityItem; last: boolean }) {
  const tones = { green: "bg-[#c9f248]", orange: "bg-[#f49a78]", blue: "bg-[#a9c2ff]", neutral: "bg-[#d8d4c8]" };
  return <div className="relative flex gap-3"><div className="relative flex flex-col items-center"><span className={`mt-1 size-2.5 rounded-full ring-4 ring-white ${tones[item.tone]}`} />{!last && <span className="mt-1 w-px flex-1 bg-[#14271e]/10" />}</div><div className="pb-4"><div className="text-xs font-black leading-5">{item.message}</div><div className="mt-0.5 text-[9px] font-semibold leading-4 text-[#14271e]/40">{item.detail}</div></div></div>;
}
