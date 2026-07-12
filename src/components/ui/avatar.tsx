type AvatarProps = {
  initials: string;
  tone?: "green" | "orange" | "lilac" | "cream";
  className?: string;
};

const tones = {
  green: "bg-[#c9f248] text-[#14271e]",
  orange: "bg-[#f49a78] text-[#4f1e10]",
  lilac: "bg-[#d8c9ff] text-[#3a2470]",
  cream: "bg-[#f4e9d8] text-[#5f4935]",
};

export function Avatar({ initials, tone = "green", className = "" }: AvatarProps) {
  return (
    <span
      className={`inline-grid size-9 shrink-0 place-items-center rounded-full border border-black/10 text-xs font-black ${tones[tone]} ${className}`}
      aria-label={initials}
    >
      {initials}
    </span>
  );
}
