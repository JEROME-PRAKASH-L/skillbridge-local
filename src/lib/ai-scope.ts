import type { ScopeResult } from "@/lib/types";

type ScopeInput = {
  title: string;
  description: string;
  desiredOutcome?: string;
  category?: string;
  budget?: number;
};

const keywordSkills: Array<[RegExp, string[]]> = [
  [/website|landing|web|menu|qr/i, ["Responsive design", "No-code or Next.js"]],
  [/social|instagram|post|content|caption/i, ["Canva", "Content design"]],
  [/google|seo|search|review/i, ["Local SEO", "Copywriting"]],
  [/sheet|excel|stock|data|dashboard/i, ["Google Sheets", "Data accuracy"]],
  [/video|reel|edit/i, ["Video editing", "Storytelling"]],
  [/logo|brand|poster|design/i, ["Visual design", "Brand consistency"]],
];

function sentence(value: string) {
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (!trimmed) return "Complete the requested digital task for the business.";
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function unique(values: string[]) {
  return [...new Set(values)];
}

export function generateTaskScope(input: ScopeInput): ScopeResult {
  const combined = `${input.title} ${input.description} ${input.desiredOutcome ?? ""}`;
  const skills = unique(
    keywordSkills
      .filter(([pattern]) => pattern.test(combined))
      .flatMap(([, matches]) => matches),
  );

  const wordCount = combined.trim().split(/\s+/).filter(Boolean).length;
  const complexity: ScopeResult["complexity"] =
    wordCount > 70 ? "Advanced" : wordCount > 32 ? "Standard" : "Starter";
  const estimatedHours = complexity === "Advanced" ? 16 : complexity === "Standard" ? 10 : 6;
  const duration = complexity === "Advanced" ? "8–12 days" : complexity === "Standard" ? "5–7 days" : "3–5 days";

  const outputNoun = /social|post|content/i.test(combined)
    ? "editable content pack"
    : /sheet|excel|stock|data/i.test(combined)
      ? "working tracker and handover guide"
      : /google|seo|search/i.test(combined)
        ? "profile audit and improvement checklist"
        : "working first version";

  const budget = input.budget ?? 0;
  const budgetGuidance = budget
    ? `The proposed ₹${budget.toLocaleString("en-IN")} budget is suitable for a ${complexity.toLowerCase()} student micro-task if the scope stays within ${estimatedHours} hours.`
    : `A practical local-market range is ₹${Math.max(2000, estimatedHours * 350).toLocaleString("en-IN")}–₹${(estimatedHours * 500).toLocaleString("en-IN")}.`;

  return {
    summary: `${sentence(input.description)} The student will convert this into a clearly reviewed, usable result for ${input.desiredOutcome?.trim() || "the business team"}.`,
    deliverables: [
      `One ${outputNoun}`,
      "One review round with consolidated feedback",
      "Source files plus a short owner handover note",
    ],
    acceptanceCriteria: [
      "All agreed content is complete and checked against the source material",
      "The output works on the business owner’s phone or laptop without specialist software",
      "Final files are shared in an editable format with clear naming",
    ],
    skills: skills.length ? skills.slice(0, 4) : [input.category || "Digital tools", "Clear communication"],
    estimatedHours,
    duration,
    budgetGuidance,
    complexity,
    clarifyingQuestion:
      "Who will approve the final output, and can all source content or access details be shared before work starts?",
  };
}
