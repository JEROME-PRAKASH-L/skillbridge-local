import type { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { WorkspaceProvider } from "@/components/workspace-provider";

export const metadata: Metadata = {
  title: "Demo workspace · SkillBridge Local",
  description: "Try the business, student and admin workflows in the SkillBridge Local MVP.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceProvider>
      <DashboardShell>{children}</DashboardShell>
    </WorkspaceProvider>
  );
}
