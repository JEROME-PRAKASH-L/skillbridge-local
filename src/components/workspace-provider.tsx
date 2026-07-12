"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import { initialActivity, initialApplications, initialTasks, students } from "@/lib/demo-data";
import { fetchPublicTasks } from "@/lib/supabase/client";
import type { ActivityItem, Application, Student, Task, TaskDraft, TaskStatus } from "@/lib/types";

type BackendState = "checking" | "supabase" | "demo";

type WorkspaceContextValue = {
  tasks: Task[];
  applications: Application[];
  students: Student[];
  activity: ActivityItem[];
  backend: BackendState;
  notice: string | null;
  createTask: (draft: TaskDraft) => void;
  applyToTask: (taskId: string, pitch: string, availability: string) => void;
  assignTask: (taskId: string, studentId: string) => void;
  advanceTask: (taskId: string) => void;
  resetWorkspace: () => void;
  dismissNotice: () => void;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);
const storageKey = "skillbridge-local-workspace-v1";

type PersistedWorkspace = {
  tasks: Task[];
  applications: Application[];
  activity: ActivityItem[];
};

function makeId(prefix: string) {
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Date.now().toString(36);
  return `${prefix}-${id}`;
}

function nextStatus(status: TaskStatus): TaskStatus {
  const flow: TaskStatus[] = ["assigned", "in_progress", "review", "completed"];
  const index = flow.indexOf(status);
  if (index < 0) return "in_progress";
  return flow[Math.min(index + 1, flow.length - 1)];
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [activity, setActivity] = useState<ActivityItem[]>(initialActivity);
  const [backend, setBackend] = useState<BackendState>("checking");
  const [notice, setNotice] = useState<string | null>(null);
  const hydrated = useRef(false);

  const addActivity = useCallback((message: string, detail: string, tone: ActivityItem["tone"] = "green") => {
    setActivity((current) => [
      {
        id: makeId("activity"),
        message,
        detail,
        tone,
        createdAt: "Now",
      },
      ...current,
    ]);
  }, []);

  useEffect(() => {
    const hydrateTimer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved) as PersistedWorkspace;
          setTasks(parsed.tasks);
          setApplications(parsed.applications);
          setActivity(parsed.activity);
        }
      } catch {
        localStorage.removeItem(storageKey);
      } finally {
        hydrated.current = true;
      }
    }, 0);

    fetchPublicTasks()
      .then((payload) => {
        if (payload.source === "supabase") {
          setBackend("supabase");
          if (payload.tasks.length) {
            setTasks((current) => {
              const remoteKeys = new Set(payload.tasks.map((task) => `${task.businessName}:${task.title}`));
              return [...payload.tasks, ...current.filter((task) => !remoteKeys.has(`${task.businessName}:${task.title}`))];
            });
          }
        } else {
          setBackend("demo");
        }
      })
      .catch(() => setBackend("demo"));

    return () => window.clearTimeout(hydrateTimer);
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    localStorage.setItem(storageKey, JSON.stringify({ tasks, applications, activity } satisfies PersistedWorkspace));
  }, [tasks, applications, activity]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 4200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const createTask = useCallback(
    (draft: TaskDraft) => {
      const newTask: Task = {
        id: makeId("task"),
        title: draft.title,
        businessName: "Your local business",
        category: draft.category,
        description: draft.description,
        scopeSummary: draft.scope.summary,
        deliverables: draft.scope.deliverables,
        acceptanceCriteria: draft.scope.acceptanceCriteria,
        skills: draft.scope.skills,
        budget: draft.budget,
        duration: draft.scope.duration,
        estimatedHours: draft.scope.estimatedHours,
        status: "open",
        postedAt: "Just now",
        location: draft.location,
        progress: 5,
        source: "demo",
      };
      setTasks((current) => [newTask, ...current]);
      addActivity(`New task posted: ${draft.title}`, "Business dashboard · Just now", "green");
      setNotice("Task posted. It is now visible to students in this demo workspace.");
    },
    [addActivity],
  );

  const applyToTask = useCallback(
    (taskId: string, pitch: string, availability: string) => {
      const currentStudent = students[0];
      setApplications((current) => {
        if (current.some((application) => application.taskId === taskId && application.studentId === currentStudent.id)) {
          setNotice("You have already applied to this task.");
          return current;
        }
        return [
          {
            id: makeId("application"),
            taskId,
            studentId: currentStudent.id,
            pitch,
            availability,
            status: "pending",
            appliedAt: "Just now",
          },
          ...current,
        ];
      });
      setTasks((current) => current.map((task) => (task.id === taskId && task.status === "open" ? { ...task, status: "reviewing" } : task)));
      const task = tasks.find((item) => item.id === taskId);
      addActivity(`${currentStudent.name} applied to ${task?.title ?? "a task"}`, "Student dashboard · Just now", "blue");
      setNotice("Application sent. The business and admin can now review it.");
    },
    [addActivity, tasks],
  );

  const assignTask = useCallback(
    (taskId: string, studentId: string) => {
      const student = students.find((item) => item.id === studentId);
      const task = tasks.find((item) => item.id === taskId);
      setTasks((current) =>
        current.map((item) =>
          item.id === taskId ? { ...item, assignedStudentId: studentId, status: "assigned", progress: Math.max(item.progress, 20) } : item,
        ),
      );
      setApplications((current) =>
        current.map((application) =>
          application.taskId === taskId
            ? { ...application, status: application.studentId === studentId ? "accepted" : "declined" }
            : application,
        ),
      );
      addActivity(`${student?.name ?? "Student"} assigned to ${task?.title ?? "task"}`, "Admin assignment · Just now", "green");
      setNotice("Student assigned and the delivery tracker is ready.");
    },
    [addActivity, tasks],
  );

  const advanceTask = useCallback(
    (taskId: string) => {
      const task = tasks.find((item) => item.id === taskId);
      if (!task) return;
      const status = nextStatus(task.status);
      const progressByStatus: Record<TaskStatus, number> = {
        open: 10,
        reviewing: 25,
        assigned: 35,
        in_progress: 65,
        review: 90,
        completed: 100,
      };
      setTasks((current) =>
        current.map((item) => (item.id === taskId ? { ...item, status, progress: progressByStatus[status] } : item)),
      );
      addActivity(`${task.title} moved to ${status.replaceAll("_", " ")}`, "Delivery update · Just now", "orange");
      setNotice(status === "completed" ? "Task marked complete. Mock payment status is now ‘ready’." : "Task status updated.");
    },
    [addActivity, tasks],
  );

  const resetWorkspace = useCallback(() => {
    localStorage.removeItem(storageKey);
    setTasks(initialTasks);
    setApplications(initialApplications);
    setActivity(initialActivity);
    setNotice("Demo workspace reset to its original state.");
  }, []);

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      tasks,
      applications,
      students,
      activity,
      backend,
      notice,
      createTask,
      applyToTask,
      assignTask,
      advanceTask,
      resetWorkspace,
      dismissNotice: () => setNotice(null),
    }),
    [tasks, applications, activity, backend, notice, createTask, applyToTask, assignTask, advanceTask, resetWorkspace],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return context;
}
