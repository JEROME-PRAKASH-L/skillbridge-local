import Link from "next/link";
import { ArrowRight, Building2, GraduationCap, ShieldCheck } from "lucide-react";

const roles = [
  { label: "Business", detail: "Post and scope a task", href: "/dashboard/business", icon: Building2 },
  { label: "Student", detail: "Find work and apply", href: "/dashboard/student", icon: GraduationCap },
  { label: "Admin", detail: "Match and track", href: "/dashboard/admin", icon: ShieldCheck },
];

export default function DashboardPage() {
  return (
    <section className="mx-auto max-w-3xl py-12 text-center">
      <div className="text-[10px] font-black uppercase tracking-[0.15em] text-[#1f6b4f]">Choose a demo role</div>
      <h2 className="mt-3 text-4xl font-black tracking-[-0.05em]">See every side of the bridge.</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#14271e]/55">Each view shares the same persistent demo workspace, so an action in one role appears in the others.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {roles.map(({ label, detail, href, icon: Icon }) => (
          <Link key={href} href={href} className="group rounded-2xl border border-[#14271e]/10 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-[#14271e] hover:shadow-[3px_4px_0_#14271e]">
            <span className="grid size-10 place-items-center rounded-xl bg-[#e7f0e9] text-[#1f6b4f]"><Icon size={18} /></span>
            <span className="mt-4 block text-base font-black">{label}</span>
            <span className="mt-1 block text-xs text-[#14271e]/45">{detail}</span>
            <span className="mt-4 flex items-center gap-1 text-[10px] font-black text-[#1f6b4f]">Open view <ArrowRight size={13} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
