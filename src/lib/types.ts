export type UserRole = "business" | "student" | "admin";

export type TaskStatus =
  | "open"
  | "reviewing"
  | "assigned"
  | "in_progress"
  | "review"
  | "completed";

export type ApplicationStatus =
  | "pending"
  | "shortlisted"
  | "accepted"
  | "declined";

export type Student = {
  id: string;
  name: string;
  initials: string;
  course: string;
  year: string;
  rating: number;
  completedTasks: number;
  skills: string[];
  availability: string;
  location: string;
};

export type Task = {
  id: string;
  title: string;
  businessName: string;
  category: string;
  description: string;
  scopeSummary: string;
  deliverables: string[];
  acceptanceCriteria: string[];
  skills: string[];
  budget: number;
  duration: string;
  estimatedHours: number;
  status: TaskStatus;
  postedAt: string;
  location: string;
  assignedStudentId?: string;
  progress: number;
  source?: "demo" | "supabase";
};

export type Application = {
  id: string;
  taskId: string;
  studentId: string;
  pitch: string;
  availability: string;
  status: ApplicationStatus;
  appliedAt: string;
};

export type ActivityItem = {
  id: string;
  message: string;
  detail: string;
  tone: "green" | "orange" | "blue" | "neutral";
  createdAt: string;
};

export type ScopeResult = {
  summary: string;
  deliverables: string[];
  acceptanceCriteria: string[];
  skills: string[];
  estimatedHours: number;
  duration: string;
  budgetGuidance: string;
  complexity: "Starter" | "Standard" | "Advanced";
  clarifyingQuestion: string;
};

export type TaskDraft = {
  title: string;
  description: string;
  desiredOutcome: string;
  category: string;
  budget: number;
  location: string;
  scope: ScopeResult;
};
