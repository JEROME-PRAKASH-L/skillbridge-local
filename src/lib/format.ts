import type { TaskStatus } from "@/lib/types";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function statusLabel(status: TaskStatus) {
  const labels: Record<TaskStatus, string> = {
    open: "Open",
    reviewing: "Reviewing",
    assigned: "Assigned",
    in_progress: "In progress",
    review: "Ready for review",
    completed: "Completed",
  };
  return labels[status];
}

export function statusTone(status: TaskStatus) {
  const tones: Record<TaskStatus, string> = {
    open: "bg-[#e8f7e8] text-[#1f6b4f] border-[#b9ddc4]",
    reviewing: "bg-[#fff1d9] text-[#955311] border-[#f1d09a]",
    assigned: "bg-[#e8efff] text-[#31579b] border-[#bdcdf1]",
    in_progress: "bg-[#e9e2ff] text-[#6042a6] border-[#cfc0f5]",
    review: "bg-[#ffe7df] text-[#a2472d] border-[#efb9a9]",
    completed: "bg-[#14271e] text-white border-[#14271e]",
  };
  return tones[status];
}
