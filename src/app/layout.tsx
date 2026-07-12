import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "SkillBridge Local · Small tech tasks, real local impact",
    template: "%s · SkillBridge Local",
  },
  description: "Connect local businesses with students for clear, supported micro tech tasks.",
  keywords: ["student projects", "local business", "micro tasks", "Chennai", "skills marketplace"],
  openGraph: {
    title: "SkillBridge Local",
    description: "Small tech tasks. Real local impact.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
