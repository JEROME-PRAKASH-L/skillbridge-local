import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/database.types";
import type { Task, TaskStatus } from "@/lib/types";

export function createPublicSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) return null;

  return createClient<Database>(url, publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

type PublicTaskRow = {
  id: string;
  title: string;
  business_name_snapshot: string;
  category: string;
  description: string;
  scope_summary: string;
  deliverables: string[];
  acceptance_criteria: string[];
  skills: string[];
  budget_amount: number;
  duration_label: string;
  estimated_hours: number;
  status: TaskStatus;
  location: string;
  progress: number;
  created_at: string;
};

function toTask(row: PublicTaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    businessName: row.business_name_snapshot,
    category: row.category,
    description: row.description,
    scopeSummary: row.scope_summary,
    deliverables: row.deliverables,
    acceptanceCriteria: row.acceptance_criteria,
    skills: row.skills,
    budget: Number(row.budget_amount),
    duration: row.duration_label,
    estimatedHours: row.estimated_hours,
    status: row.status,
    postedAt: "From the local network",
    location: row.location,
    progress: row.progress,
    source: "supabase",
  };
}

export async function fetchPublicTasks() {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return { source: "demo" as const, tasks: [] as Task[] };

  const { data, error } = await supabase
    .from("tasks")
    .select(
      "id,title,business_name_snapshot,category,description,scope_summary,deliverables,acceptance_criteria,skills,budget_amount,duration_label,estimated_hours,status,location,progress,created_at",
    )
    .eq("visibility", "public")
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) throw error;
  return { source: "supabase" as const, tasks: (data as PublicTaskRow[]).map(toTask) };
}
