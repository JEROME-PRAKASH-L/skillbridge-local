"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Compass,
  Filter,
  IndianRupee,
  MapPin,
  Search,
  Sparkles,
  Star,
  Target,
  X,
} from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { useWorkspace } from "@/components/workspace-provider";
import { formatCurrency, statusLabel, statusTone } from "@/lib/format";
import type { Task } from "@/lib/types";

export function StudentDashboard() {
  const { tasks, applications, students, applyToTask } = useWorkspace();
  const currentStudent = students[0];
  const [query, setQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [pitch, setPitch] = useState("");
  const [availability, setAvailability] = useState("Can start tomorrow · 8 hrs/week");

  const myApplications = applications.filter((application) => application.studentId === currentStudent.id);
  const myAssignedTasks = tasks.filter((task) => task.assignedStudentId === currentStudent.id);

  const recommendations = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return tasks
      .filter((task) => ["open", "reviewing"].includes(task.status))
      .filter((task) => {
        if (!normalized) return true;
        return `${task.title} ${task.category} ${task.skills.join(" ")} ${task.businessName}`.toLowerCase().includes(normalized);
      })
      .map((task) => ({
        task,
        match: task.skills.filter((skill) => currentStudent.skills.some((studentSkill) => studentSkill.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(studentSkill.toLowerCase()))).length,
      }))
      .sort((a, b) => b.match - a.match);
  }, [tasks, currentStudent.skills, query]);

  function openApplication(task: Task) {
    setSelectedTask(task);
    setPitch(`I’m interested in helping ${task.businessName}. I can use my ${currentStudent.skills.slice(0, 2).join(" and ")} experience to deliver the agreed scope and share clear progress updates.`);
  }

  function submitApplication(event: FormEvent) {
    event.preventDefault();
    if (!selectedTask) return;
    applyToTask(selectedTask.id, pitch, availability);
    setSelectedTask(null);
  }

  return (
    <>
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.65fr)]">
        <div className="rounded-[26px] border border-[#14271e] bg-[#c9f248] p-5 shadow-[4px_5px_0_#14271e] sm:p-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#14271e]/15 bg-white/45 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.13em]"><Sparkles size={13} /> Skill match active</div>
              <h2 className="mt-4 max-w-xl text-3xl font-black tracking-[-0.05em] sm:text-4xl">Build your portfolio on real local work.</h2>
              <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-[#14271e]/65">Small, scoped projects. Helpful businesses. A clear outcome you can explain in your next interview.</p>
            </div>
            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-[#14271e]/15 bg-white/60 p-3.5">
              <Avatar initials={currentStudent.initials} tone="lilac" className="size-12 text-sm" />
              <div>
                <div className="text-sm font-black">{currentStudent.name}</div>
                <div className="mt-0.5 flex items-center gap-1 text-[11px] font-bold text-[#14271e]/55"><Star size={12} fill="currentColor" /> {currentStudent.rating} · {currentStudent.completedTasks} completed</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[26px] border border-[#14271e]/10 bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.15em] text-[#1f6b4f]">Your week</div>
              <h3 className="mt-1 text-lg font-black">Momentum snapshot</h3>
            </div>
            <span className="grid size-10 place-items-center rounded-xl bg-[#e7f0e9] text-[#1f6b4f]"><Target size={18} /></span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <MiniMetric value={String(myApplications.length)} label="Applied" />
            <MiniMetric value={String(myAssignedTasks.length)} label="Active" />
            <MiniMetric value="8h" label="Available" />
          </div>
          <div className="mt-5 rounded-xl bg-[#f4f2eb] p-3 text-xs font-semibold leading-5 text-[#14271e]/58">Tip: a short pitch that names the deliverable usually beats a generic “I’m interested.”</div>
        </div>
      </section>

      <section className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.7fr)]">
        <div>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#1f6b4f]"><Compass size={14} /> Discover</div>
              <h3 className="mt-1 text-2xl font-black tracking-[-0.04em]">Recommended near you</h3>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex h-10 min-w-0 items-center gap-2 rounded-xl border border-[#14271e]/10 bg-white px-3 sm:w-64">
                <Search size={15} className="shrink-0 text-[#14271e]/35" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks or skills" className="min-w-0 flex-1 bg-transparent text-xs font-semibold outline-none placeholder:text-[#14271e]/30" />
              </label>
              <button type="button" aria-label="Filter tasks" className="grid size-10 place-items-center rounded-xl border border-[#14271e]/10 bg-white"><Filter size={15} /></button>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {recommendations.map(({ task, match }, index) => {
              const applied = myApplications.some((application) => application.taskId === task.id);
              const matchPercent = Math.min(96, 72 + match * 8 + (index === 0 ? 5 : 0));
              return (
                <article key={task.id} className="flex flex-col rounded-[22px] border border-[#14271e]/10 bg-white p-5 transition hover:-translate-y-1 hover:border-[#1f6b4f]/35 hover:shadow-[0_16px_36px_rgba(20,39,30,0.08)]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#e7f0e9] px-2.5 py-1 text-[10px] font-black text-[#1f6b4f]"><Sparkles size={11} /> {matchPercent}% match</div>
                    <span className={`rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.08em] ${statusTone(task.status)}`}>{statusLabel(task.status)}</span>
                  </div>
                  <h4 className="mt-4 text-lg font-black leading-6 tracking-[-0.03em]">{task.title}</h4>
                  <p className="mt-1 text-xs font-bold text-[#14271e]/45">{task.businessName}</p>
                  <p className="mt-3 line-clamp-3 text-xs leading-5 text-[#14271e]/55">{task.scopeSummary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {task.skills.slice(0, 3).map((skill) => <span key={skill} className="rounded-full bg-[#f4f2eb] px-2.5 py-1 text-[10px] font-bold text-[#14271e]/65">{skill}</span>)}
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#14271e]/8 pt-4 text-[10px] font-bold text-[#14271e]/48">
                    <span className="flex items-center gap-1"><IndianRupee size={12} />{formatCurrency(task.budget).replace("₹", "")}</span>
                    <span className="flex items-center gap-1"><Clock3 size={12} />{task.estimatedHours} hrs</span>
                    <span className="flex items-center gap-1"><MapPin size={12} />{task.location}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openApplication(task)}
                    disabled={applied}
                    className={`mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl text-xs font-black transition ${applied ? "cursor-default bg-[#e7f0e9] text-[#1f6b4f]" : "border border-[#14271e] bg-[#14271e] text-white hover:-translate-y-0.5"}`}
                  >
                    {applied ? <><CheckCircle2 size={15} /> Applied</> : <>View & apply <ArrowRight size={15} /></>}
                  </button>
                </article>
              );
            })}
            {!recommendations.length && (
              <div className="md:col-span-2 rounded-2xl border border-dashed border-[#14271e]/20 bg-white/50 p-10 text-center">
                <Search className="mx-auto text-[#14271e]/25" />
                <p className="mt-3 text-sm font-black">No matching tasks yet.</p>
                <p className="mt-1 text-xs text-[#14271e]/45">Try a broader skill or clear the search.</p>
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-[24px] border border-[#14271e]/10 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#1f6b4f]">My work</div>
                <h3 className="mt-1 text-lg font-black">Delivery tracker</h3>
              </div>
              <BriefcaseBusiness size={19} className="text-[#1f6b4f]" />
            </div>
            <div className="mt-4 space-y-3">
              {myAssignedTasks.length ? myAssignedTasks.map((task) => (
                <div key={task.id} className="rounded-2xl border border-[#14271e]/9 bg-[#fbfaf6] p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-black leading-5">{task.title}</div>
                      <div className="mt-1 text-[10px] font-semibold text-[#14271e]/45">{task.businessName}</div>
                    </div>
                    <span className="text-xs font-black text-[#1f6b4f]">{task.progress}%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#14271e]/8"><div className="h-full rounded-full bg-[#c9f248] ring-1 ring-inset ring-[#14271e]/10" style={{ width: `${task.progress}%` }} /></div>
                  <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-[#14271e]/45"><span>{statusLabel(task.status)}</span><span>{task.duration}</span></div>
                </div>
              )) : (
                <div className="rounded-2xl border border-dashed border-[#14271e]/15 p-5 text-center text-xs leading-5 text-[#14271e]/45">Your assigned tasks will appear here after admin confirmation.</div>
              )}
            </div>
          </div>

          <div className="rounded-[24px] border border-[#14271e] bg-[#14271e] p-5 text-white">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#c9f248]"><BadgeCheck size={14} /> Profile strength</div>
            <div className="mt-4 flex items-end justify-between"><span className="text-3xl font-black">82%</span><span className="text-xs font-semibold text-white/45">Strong start</span></div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[82%] rounded-full bg-[#c9f248]" /></div>
            <p className="mt-4 text-xs leading-5 text-white/55">Add one portfolio link to improve your chance of being shortlisted.</p>
          </div>
        </aside>
      </section>

      {selectedTask && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#14271e]/55 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-labelledby="apply-title">
          <div className="mx-auto my-3 w-full max-w-2xl overflow-hidden rounded-[26px] border border-[#14271e] bg-white shadow-[7px_8px_0_rgba(20,39,30,0.35)] sm:my-10">
            <div className="relative overflow-hidden border-b border-[#14271e]/10 bg-[#c9f248] p-5 sm:p-7">
              <button type="button" onClick={() => setSelectedTask(null)} aria-label="Close application" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-[#14271e]/15 bg-white/60"><X size={17} /></button>
              <div className="text-[10px] font-black uppercase tracking-[0.15em] text-[#1f6b4f]">{selectedTask.businessName} · {selectedTask.location}</div>
              <h2 id="apply-title" className="mt-2 max-w-lg pr-10 text-2xl font-black tracking-[-0.04em]">{selectedTask.title}</h2>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold"><span className="rounded-full bg-white/60 px-3 py-1.5">{formatCurrency(selectedTask.budget)}</span><span className="rounded-full bg-white/60 px-3 py-1.5">{selectedTask.estimatedHours} hrs</span><span className="rounded-full bg-white/60 px-3 py-1.5">{selectedTask.duration}</span></div>
            </div>
            <div className="grid gap-5 p-5 sm:p-7 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.13em] text-[#14271e]/40">What you will deliver</div>
                <ul className="mt-3 space-y-2.5">
                  {selectedTask.deliverables.map((item) => <li key={item} className="flex gap-2 text-xs font-semibold leading-5"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#1f6b4f]" />{item}</li>)}
                </ul>
                <div className="mt-5 text-[10px] font-black uppercase tracking-[0.13em] text-[#14271e]/40">Skills</div>
                <div className="mt-2 flex flex-wrap gap-1.5">{selectedTask.skills.map((skill) => <span key={skill} className="rounded-full bg-[#f4f2eb] px-2.5 py-1 text-[10px] font-bold">{skill}</span>)}</div>
              </div>
              <form onSubmit={submitApplication} className="rounded-2xl bg-[#f4f2eb] p-4">
                <label className="text-xs font-black">Your short pitch<textarea value={pitch} onChange={(event) => setPitch(event.target.value)} rows={6} required minLength={30} className="field-control mt-2 resize-none bg-white" /></label>
                <label className="mt-4 block text-xs font-black">Availability<input value={availability} onChange={(event) => setAvailability(event.target.value)} required className="field-control mt-2 bg-white" /></label>
                <button type="submit" className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#14271e] bg-[#14271e] text-sm font-black text-white transition hover:-translate-y-0.5">Send application <ArrowRight size={16} /></button>
                <p className="mt-3 text-center text-[10px] leading-4 text-[#14271e]/40">Demo only. No message leaves this workspace.</p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MiniMetric({ value, label }: { value: string; label: string }) {
  return <div className="rounded-xl bg-[#f4f2eb] p-3 text-center"><div className="text-lg font-black">{value}</div><div className="mt-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-[#14271e]/40">{label}</div></div>;
}
