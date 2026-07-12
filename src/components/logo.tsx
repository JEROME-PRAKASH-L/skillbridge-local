import Link from "next/link";
import { Waypoints } from "lucide-react";

type LogoProps = {
  compact?: boolean;
  href?: string;
  inverted?: boolean;
};

export function Logo({ compact = false, href = "/", inverted = false }: LogoProps) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2.5" aria-label="SkillBridge Local home">
      <span className="grid size-9 place-items-center rounded-xl border border-[#14271e] bg-[#c9f248] text-[#14271e] shadow-[2px_2px_0_#14271e] transition-transform group-hover:-rotate-3">
        <Waypoints size={20} strokeWidth={2.3} />
      </span>
      {!compact && (
        <span className={`text-[17px] font-black tracking-[-0.04em] ${inverted ? "text-white" : "text-[#14271e]"}`}>
          SkillBridge <span className={inverted ? "text-[#c9f248]" : "text-[#1f6b4f]"}>Local</span>
        </span>
      )}
    </Link>
  );
}
