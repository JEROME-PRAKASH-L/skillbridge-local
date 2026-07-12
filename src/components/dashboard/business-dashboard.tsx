"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  IndianRupee,
  Plus,
  Sparkles,
  Users,
  WandSparkles,
  X,
} from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { useWorkspace } from "@/components/workspace-provider";
import { generateTaskScope } from "@/lib/ai-scope";
import { categoryOptions } from "@/lib/demo-data";
import { formatCurrency, statusLabel, statusTone } from "@/lib/format";
import type { ScopeResult } from "@/lib/types";

type FormState = {
  title: string;
  description: string;
  desiredOutcome: string;
  category: string;
  budget: string;
  location: string;
};

const initialForm: FormState = {
  title: "",
  description: "",
  desiredOutcome: "",
  category: categoryOptions[0],
  budget: "3500",
  location: "Chennai",
};

export function BusinessDashboard() {
  const { tasks, applications, students, createTask } = useWorkspace();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [scope, setScope] = useState<ScopeResult | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const metrics = useMemo(() => {
    const active = tasks.filter((task) => task.status !== "completed");
    const newApplications = applications.filter((application) => application.status === "pending").length;
    const delivery = tasks.filter((task) => ["assigned", "in_progress", "review"].includes(task.status)).length;
    const mockReady = tasks.filter((task) => task.status === "completed").reduce((sum, task) => sum + task.budget, 0);
    return { active: active.length, newApplications, delivery, mockReady };
  }, [tasks, applications]);

  const visibleTasks = tasks.slice(0, 5);

  async function generateScope(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setGenerating(true);
    try {
      if (form.title.trim().length < 4 || form.description.trim().length < 12) {
        throw new Error("Please add a clear title and a little more detail.");
      }
      await new Promise((resolve) => window.setTimeout(resolve, 550));
      setScope(
        generateTaskScope({
          title: form.title,
          description: form.description,
          desiredOutcome: form.desiredOutcome,
          category: form.category,
          budget: Number(form.budget || 0),
        }),
      );
    } catch (scopeError) {
      setError(scopeError instanceof Error ? scopeError.message : "Could not generate the scope.");
    } finally {
      setGenerating(false);
    }
  }

  function publishTask() {
    if (!scope) return;
    createTask({
      title: form.title,
      description: form.description,
      desiredOutcome: form.desiredOutcome,
      category: form.category,
      budget: Number(form.budget || 0),
      location: form.location,
      scope,
    });
    setForm(initialForm);
    setScope(null);
    setModalOpen(false);
  }

  function closeModal() {
    setModalOpen(false);
    setScope(null);
    setError(null);
  }

  return (
    <>
      <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1f6b4f]/15 bg-[#e7f0e9] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.13em] text-[#1f6b4f]">
            <Sparkles size={13} /> Your local talent desk
          </div>
          <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.045em] sm:text-4xl">Turn that “small tech job” into a clear task.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#14271e]/60 sm:text-base">Post what you need. The scope assistant makes it student-ready, and the admin helps you choose the right local talent.</p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#14271e] bg-[#c9f248] px-5 text-sm font-black shadow-[3px_3px_0_#14271e] transition hover:-translate-y-0.5 hover:shadow-[4px_5px_0_#14271e]"
        >
          <Plus size={18} strokeWidth={2.5} /> Post a new task
        </button>
      </section>

      <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Open & active" value={String(metrics.active)} helper="Across all stages" icon={BriefcaseBusiness} tone="green" />
        <MetricCard label="New applications" value={String(metrics.newApplications)} helper="Ready to review" icon={Users} tone="orange" />
        <MetricCard label="In delivery" value={String(metrics.delivery)} helper="Tracked by admin" icon={Clock3} tone="lilac" />
        <MetricCard label="Mock ready" value={formatCurrency(metrics.mockReady)} helper="No payments processed" icon={IndianRupee} tone="cream" />
      </section>

      <section className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.75fr)]">
        <div className="rounded-[24px] border border-[#14271e]/10 bg-white p-4 shadow-[0_12px_40px_rgba(20,39,30,0.04)] sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-black tracking-[-0.025em]">Your task board</h3>
              <p className="mt-1 text-xs text-[#14271e]/50">A simple view from brief to completion.</p>
            </div>
            <button type="button" onClick={() => setModalOpen(true)} className="text-xs font-black text-[#1f6b4f] hover:underline">Add task</button>
          </div>

          <div className="mt-5 space-y-3">
            {visibleTasks.map((task) => {
              const taskApplications = applications.filter((application) => application.taskId === task.id);
              const assignedStudent = students.find((student) => student.id === task.assignedStudentId);
              return (
                <article key={task.id} className="group rounded-2xl border border-[#14271e]/10 bg-[#fbfaf6] p-4 transition hover:border-[#1f6b4f]/35 hover:bg-white hover:shadow-[0_12px_28px_rgba(20,39,30,0.06)]">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] ${statusTone(task.status)}`}>{statusLabel(task.status)}</span>
                        <span className="text-[11px] font-semibold text-[#14271e]/40">{task.category}</span>
                        {task.source === "supabase" && <span className="rounded-full bg-[#e7f0e9] px-2 py-1 text-[9px] font-black uppercase tracking-wider text-[#1f6b4f]">Live</span>}
                      </div>
                      <h4 className="mt-2.5 text-[15px] font-black tracking-[-0.02em] sm:text-base">{task.title}</h4>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold text-[#14271e]/45">
                        <span>{formatCurrency(task.budget)}</span>
                        <span>{task.duration}</span>
                        <span>{task.location}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 sm:justify-end">
                      {assignedStudent ? (
                        <>
                          <Avatar initials={assignedStudent.initials} tone="lilac" />
                          <div className="text-xs">
                            <div className="font-black">{assignedStudent.name}</div>
                            <div className="text-[#14271e]/45">{task.progress}% complete</div>
                          </div>
                        </>
                      ) : (
                        <div className="rounded-xl border border-[#14271e]/10 bg-white px-3 py-2 text-xs font-bold text-[#14271e]/60">
                          {taskApplications.length} applicant{taskApplications.length === 1 ? "" : "s"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#14271e]/8">
                    <div className="h-full rounded-full bg-[#1f6b4f] transition-all" style={{ width: `${Math.max(task.progress, 5)}%` }} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="overflow-hidden rounded-[24px] border border-[#14271e] bg-[#14271e] p-5 text-white shadow-[4px_4px_0_#c9f248]">
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-[#c9f248] text-[#14271e]"><WandSparkles size={19} /></span>
              <span className="rounded-full border border-white/15 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-white/55">Scope assist</span>
            </div>
            <h3 className="mt-5 text-xl font-black tracking-[-0.035em]">A better brief in about 60 seconds.</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">Turn a rough need into deliverables, skills, hours and acceptance checks before students apply.</p>
            <button type="button" onClick={() => setModalOpen(true)} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#c9f248]">Try the scope assistant <ArrowRight size={16} /></button>
          </div>

          <div className="rounded-[24px] border border-[#14271e]/10 bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black">What happens next</h3>
              <CheckCircle2 size={18} className="text-[#1f6b4f]" />
            </div>
            <ol className="mt-4 space-y-4">
              {[
                ["01", "Review applicants", "Admin highlights skill match and availability."],
                ["02", "Confirm assignment", "One student gets a clear start and due date."],
                ["03", "Track delivery", "Move through progress, review and completion."],
              ].map(([number, title, detail]) => (
                <li key={number} className="flex gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f4f2eb] text-[10px] font-black text-[#1f6b4f]">{number}</span>
                  <div>
                    <div className="text-sm font-black">{title}</div>
                    <div className="mt-0.5 text-xs leading-5 text-[#14271e]/50">{detail}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#14271e]/55 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-labelledby="new-task-title">
          <div className="mx-auto my-2 w-full max-w-3xl overflow-hidden rounded-[26px] border border-[#14271e] bg-[#f7f4ed] shadow-[7px_8px_0_rgba(20,39,30,0.35)] sm:my-8">
            <div className="flex items-start justify-between border-b border-[#14271e]/10 bg-white px-5 py-4 sm:px-7">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#1f6b4f]"><WandSparkles size={13} /> AI scope assistant</div>
                <h2 id="new-task-title" className="mt-1 text-xl font-black tracking-[-0.03em] sm:text-2xl">Describe the job in your own words.</h2>
              </div>
              <button type="button" onClick={closeModal} aria-label="Close task form" className="grid size-9 place-items-center rounded-full border border-[#14271e]/10 bg-[#f4f2eb] hover:bg-[#ece8dc]"><X size={17} /></button>
            </div>

            <form onSubmit={generateScope} className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[1fr_0.92fr]">
              <div className="space-y-4">
                <Field label="Task title" hint="Keep it plain and specific">
                  <input
                    value={form.title}
                    onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                    placeholder="e.g. Create a QR menu for our café"
                    maxLength={120}
                    required
                    className="field-control"
                  />
                </Field>
                <Field label="What needs to be done?" hint="12 words or more helps the assistant">
                  <textarea
                    value={form.description}
                    onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                    placeholder="We have a printed menu and want customers to scan a QR code…"
                    rows={5}
                    maxLength={1200}
                    required
                    className="field-control resize-none"
                  />
                </Field>
                <Field label="A successful result looks like" hint="Optional">
                  <input
                    value={form.desiredOutcome}
                    onChange={(event) => setForm((current) => ({ ...current, desiredOutcome: event.target.value }))}
                    placeholder="Customers can browse quickly on any phone"
                    className="field-control"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Category">
                    <select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} className="field-control">
                      {categoryOptions.map((category) => <option key={category}>{category}</option>)}
                    </select>
                  </Field>
                  <Field label="Budget (₹)">
                    <input type="number" min="0" max="100000" value={form.budget} onChange={(event) => setForm((current) => ({ ...current, budget: event.target.value }))} className="field-control" />
                  </Field>
                </div>
                <Field label="Location">
                  <input value={form.location} onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))} className="field-control" />
                </Field>
              </div>

              <div className="rounded-2xl border border-[#14271e]/10 bg-white p-4 sm:p-5">
                {!scope ? (
                  <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
                    <span className="grid size-14 place-items-center rounded-2xl bg-[#e7f0e9] text-[#1f6b4f]"><WandSparkles size={25} /></span>
                    <h3 className="mt-4 text-lg font-black">Ready when your brief is.</h3>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-[#14271e]/50">The demo assistant will suggest a practical scope, not make business decisions for you.</p>
                    {error && <p className="mt-3 rounded-xl bg-[#fff0e9] px-3 py-2 text-xs font-bold text-[#a2472d]">{error}</p>}
                    <button
                      type="submit"
                      disabled={generating}
                      className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#14271e] px-5 text-sm font-black text-white transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
                    >
                      {generating ? <><span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-[#c9f248]" /> Scoping…</> : <><Sparkles size={16} className="text-[#c9f248]" /> Generate scope</>}
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#e7f0e9] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#1f6b4f]"><CheckCircle2 size={12} /> Scope ready</div>
                      <button type="button" onClick={() => setScope(null)} className="text-[11px] font-black text-[#14271e]/45 hover:text-[#14271e]">Edit brief</button>
                    </div>
                    <h3 className="mt-4 text-base font-black">{scope.complexity} micro-task · {scope.estimatedHours} hrs</h3>
                    <p className="mt-2 text-xs leading-5 text-[#14271e]/58">{scope.summary}</p>

                    <div className="mt-4">
                      <div className="text-[10px] font-black uppercase tracking-[0.12em] text-[#14271e]/40">Deliverables</div>
                      <ul className="mt-2 space-y-2">
                        {scope.deliverables.map((deliverable) => (
                          <li key={deliverable} className="flex gap-2 text-xs font-semibold leading-5"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#1f6b4f]" /> {deliverable}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {scope.skills.map((skill) => <span key={skill} className="rounded-full bg-[#f4f2eb] px-2.5 py-1 text-[10px] font-bold">{skill}</span>)}
                    </div>
                    <div className="mt-4 rounded-xl bg-[#fff5d9] p-3 text-[11px] font-semibold leading-5 text-[#714d12]">{scope.budgetGuidance}</div>
                    <button type="button" onClick={publishTask} className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#14271e] bg-[#c9f248] text-sm font-black shadow-[2px_2px_0_#14271e] transition hover:-translate-y-0.5">
                      Publish task <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function MetricCard({ label, value, helper, icon: Icon, tone }: { label: string; value: string; helper: string; icon: typeof BriefcaseBusiness; tone: "green" | "orange" | "lilac" | "cream" }) {
  const tones = {
    green: "bg-[#e2f1e4] text-[#1f6b4f]",
    orange: "bg-[#ffe8df] text-[#a2472d]",
    lilac: "bg-[#eee8ff] text-[#6042a6]",
    cream: "bg-[#fff3d6] text-[#8a5c13]",
  };
  return (
    <div className="rounded-[20px] border border-[#14271e]/10 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold text-[#14271e]/45">{label}</div>
          <div className="mt-1 text-2xl font-black tracking-[-0.04em]">{value}</div>
          <div className="mt-1 text-[10px] font-semibold text-[#14271e]/40">{helper}</div>
        </div>
        <span className={`grid size-10 place-items-center rounded-xl ${tones[tone]}`}><Icon size={18} /></span>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3 text-xs font-black">
        {label}
        {hint && <span className="text-[9px] font-semibold text-[#14271e]/35">{hint}</span>}
      </span>
      <span className="mt-1.5 block">{children}</span>
    </label>
  );
}
