import type { ActivityItem, Application, Student, Task } from "@/lib/types";

export const students: Student[] = [
  {
    id: "student-ananya",
    name: "Ananya Rao",
    initials: "AR",
    course: "B.E. Computer Science",
    year: "3rd year",
    rating: 4.9,
    completedTasks: 8,
    skills: ["React", "Figma", "SEO", "Canva"],
    availability: "8 hrs / week",
    location: "Tambaram",
  },
  {
    id: "student-kavin",
    name: "Kavin M",
    initials: "KM",
    course: "B.Tech Information Technology",
    year: "Final year",
    rating: 4.8,
    completedTasks: 11,
    skills: ["Next.js", "Supabase", "Analytics", "Excel"],
    availability: "12 hrs / week",
    location: "Porur",
  },
  {
    id: "student-fathima",
    name: "Fathima Noor",
    initials: "FN",
    course: "B.Sc. Visual Communication",
    year: "2nd year",
    rating: 4.7,
    completedTasks: 6,
    skills: ["Branding", "Social media", "Video", "Canva"],
    availability: "10 hrs / week",
    location: "Pallavaram",
  },
  {
    id: "student-vikram",
    name: "Vikram Selvan",
    initials: "VS",
    course: "BCA",
    year: "3rd year",
    rating: 4.6,
    completedTasks: 5,
    skills: ["WordPress", "Google Business", "SEO", "Copywriting"],
    availability: "6 hrs / week",
    location: "Chromepet",
  },
];

export const initialTasks: Task[] = [
  {
    id: "task-menu",
    title: "Create a QR menu for our café",
    businessName: "Mylai Filter House",
    category: "Web & no-code",
    description:
      "Turn our printed two-page menu into a mobile-friendly QR menu that is easy for our team to update.",
    scopeSummary:
      "Build a fast, mobile-first digital menu with clear categories, prices and a printable QR code.",
    deliverables: [
      "Responsive one-page menu",
      "Editable menu content",
      "Print-ready QR code",
    ],
    acceptanceCriteria: [
      "Loads on a normal 4G connection in under 3 seconds",
      "All 28 menu items and prices match the approved sheet",
      "QR code scans from an A5 tabletop card",
    ],
    skills: ["Next.js", "Canva", "Mobile UI"],
    budget: 3500,
    duration: "4–6 days",
    estimatedHours: 8,
    status: "open",
    postedAt: "Today",
    location: "Mylapore",
    progress: 12,
    source: "demo",
  },
  {
    id: "task-seo",
    title: "Fix our Google Business profile",
    businessName: "Vetri Home Services",
    category: "Local marketing",
    description:
      "Improve our local search profile, add missing service details and create a simple review link for customers.",
    scopeSummary:
      "Audit and refresh the business profile, organize service information and prepare a lightweight review-request kit.",
    deliverables: [
      "Profile audit checklist",
      "Updated services and description",
      "Customer review link card",
    ],
    acceptanceCriteria: [
      "Profile completeness reaches 100%",
      "All six services include accurate descriptions",
      "Review link works on Android and iPhone",
    ],
    skills: ["Google Business", "SEO", "Copywriting"],
    budget: 2500,
    duration: "3–4 days",
    estimatedHours: 5,
    status: "reviewing",
    postedAt: "Yesterday",
    location: "Porur",
    progress: 30,
    source: "demo",
  },
  {
    id: "task-inventory",
    title: "Set up a simple stock tracker",
    businessName: "Sundari Textiles",
    category: "Data & automation",
    description:
      "We need a simple spreadsheet to track fabric stock, low-stock items and weekly purchases without expensive software.",
    scopeSummary:
      "Create a protected Google Sheets inventory tracker with low-stock signals and a one-page usage guide.",
    deliverables: [
      "Inventory workbook",
      "Low-stock dashboard",
      "15-minute staff handover",
    ],
    acceptanceCriteria: [
      "Tracker supports at least 300 products",
      "Low-stock items are highlighted automatically",
      "Owner can add a new product without help",
    ],
    skills: ["Excel", "Google Sheets", "Analytics"],
    budget: 4500,
    duration: "1 week",
    estimatedHours: 10,
    status: "assigned",
    postedAt: "3 days ago",
    location: "T. Nagar",
    assignedStudentId: "student-kavin",
    progress: 45,
    source: "demo",
  },
  {
    id: "task-social",
    title: "Design a 10-post social media starter kit",
    businessName: "Nila Organics",
    category: "Design & content",
    description:
      "Create reusable launch posts for our handmade soap range using our current logo, product photos and brand colours.",
    scopeSummary:
      "Design a cohesive starter pack of reusable social posts with captions and an editable template system.",
    deliverables: [
      "10 feed creatives",
      "10 short captions",
      "Editable Canva templates",
    ],
    acceptanceCriteria: [
      "Designs follow the supplied brand palette",
      "Every template is editable in the free Canva plan",
      "Captions include a clear call to action",
    ],
    skills: ["Canva", "Branding", "Social media"],
    budget: 5000,
    duration: "7–9 days",
    estimatedHours: 12,
    status: "in_progress",
    postedAt: "5 days ago",
    location: "Pallavaram",
    assignedStudentId: "student-fathima",
    progress: 68,
    source: "demo",
  },
];

export const initialApplications: Application[] = [
  {
    id: "app-menu-ananya",
    taskId: "task-menu",
    studentId: "student-ananya",
    pitch:
      "I have built two mobile menus and can also prepare the print-ready tabletop card.",
    availability: "Can start tomorrow",
    status: "pending",
    appliedAt: "42 min ago",
  },
  {
    id: "app-menu-kavin",
    taskId: "task-menu",
    studentId: "student-kavin",
    pitch:
      "I can deliver this in Next.js with a simple content file your staff can edit.",
    availability: "Can start this evening",
    status: "shortlisted",
    appliedAt: "1 hr ago",
  },
  {
    id: "app-seo-vikram",
    taskId: "task-seo",
    studentId: "student-vikram",
    pitch:
      "Local SEO is my focus. I will include a before-and-after checklist and review link card.",
    availability: "6 hours this week",
    status: "shortlisted",
    appliedAt: "Yesterday",
  },
  {
    id: "app-seo-ananya",
    taskId: "task-seo",
    studentId: "student-ananya",
    pitch:
      "I can clean the profile and design the review request card as one small package.",
    availability: "Can start in 2 days",
    status: "pending",
    appliedAt: "Yesterday",
  },
  {
    id: "app-stock-kavin",
    taskId: "task-inventory",
    studentId: "student-kavin",
    pitch:
      "I have built stock dashboards in Sheets and can train the store team in Tamil or English.",
    availability: "In progress",
    status: "accepted",
    appliedAt: "3 days ago",
  },
];

export const initialActivity: ActivityItem[] = [
  {
    id: "activity-1",
    message: "Kavin was assigned to Sundari Textiles",
    detail: "Stock tracker · 18 minutes ago",
    tone: "green",
    createdAt: "18 min",
  },
  {
    id: "activity-2",
    message: "New application from Ananya",
    detail: "QR menu · 42 minutes ago",
    tone: "blue",
    createdAt: "42 min",
  },
  {
    id: "activity-3",
    message: "Nila Organics moved to in progress",
    detail: "Social starter kit · Yesterday",
    tone: "orange",
    createdAt: "1 day",
  },
];

export const categoryOptions = [
  "Web & no-code",
  "Local marketing",
  "Data & automation",
  "Design & content",
  "Tech support",
];
