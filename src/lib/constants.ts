import { HumeLogo } from "@/components/logos/hume";

import type {
  RecordingListGroup,
  NoteTimelineType,
  NoteListGroup,
  Recordings,
  Note,
} from "@/model/types";

import type {
  ColorThemeOption,
  StatsDataPoint,
  RecentSaleType,
  NavItemMapType,
  NavItemType,
  PathGroup,
  Language,
  UseCase,
  Product,
} from "@/lib/types";

import {
  MessageCircle,
  BookOpenText,
  GitMerge,
  Pause,
  Moon,
  Mic,
  Sun,
} from "lucide-react";

import {
  IconFileDescription,
  IconListDetails,
  IconDashboard,
  IconSettings,
  IconFileAi,
  IconCamera,
} from "@tabler/icons-react";

export const products: Product[] = [
  {
    title: "features",
    label: "Features",
    description:
      "Discover features that can help you get more out of meetings.",
  },
  {
    title: "conversation intelligence",
    label: "Conversation Intelligence",
    description:
      "Gain valuable meetings insight and understanding into your conversations.",
  },
  {
    title: "chrome extension",
    label: "Chrome Extension",
    description:
      "Capture & transcribe meetings and videos using Summarly Chrome extension.",
  },
  {
    title: "android & ios apps",
    label: "Android & iOS Apps",
    description:
      "Capture & transcribe meetings and videos using Summarly apps.",
  },
];

export const useCases: UseCase[] = [
  {
    title: "engineering",
    label: "Engineering",
    icon: GitMerge,
    description: "Automate meeting notes, documentation and follow-up actions.",
  },
  {
    title: "consulting",
    label: "Consulting",
    icon: MessageCircle,
    description:
      "Easily draft reports and automatically documenting decisions and commitments.",
  },
  {
    title: "education",
    label: "Education",
    icon: BookOpenText,
    description:
      "Easily draft reports and automatically documenting decisions and commitments.",
  },
  {
    title: "media and podcasting",
    label: "Media and Podcasting",
    icon: Mic,
    description:
      "Easily draft reports and automatically documenting decisions and commitments.",
  },
];

export const NAV_ITEMS: NavItemType[] = [
  { title: "product", label: "Product", href: "/products", children: products },
  {
    title: "use case",
    label: "Use Case",
    href: "/use-cases",
    children: useCases,
  },
  { title: "about", label: "About", href: "/about" },
];

export const NAV_ITEMS_MAP: NavItemMapType = {
  "use case": useCases,
  product: products,
};

export const ColorThemesMap: Map<string, ColorThemeOption> = new Map([
  ["light", { value: "light", label: "Light", icon: Sun }],
  ["dark", { value: "dark", label: "Dark", icon: Moon }],
]);

export const ColorThemes: ColorThemeOption[] = Array.from(
  ColorThemesMap.values()
);

export const LanguagesMap: Map<string, Language> = new Map([
  ["en", { value: "en", label: "English (UK)" }],
  ["en-US", { value: "en-US", label: "English (US)" }],
]);

export const Languages: Language[] = Array.from(LanguagesMap.values());

export const MonthsShort: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const MonthsLong: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dataPoints: StatsDataPoint[] = Array.from({ length: 12 }).map(
  (_, index) => ({
    name: MonthsShort[index],
    total: Math.floor(Math.random() * 5000) + 1000,
  })
);

export const recentSales: RecentSaleType[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    src: "/avatars/01.png",
    alt: "Avatar",
    fallback: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    src: "/avatars/02.png",
    alt: "Avatar",
    fallback: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    src: "/avatars/03.png",
    alt: "Avatar",
    fallback: "IN",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    src: "/avatars/04.png",
    alt: "Avatar",
    fallback: "WK",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    src: "/avatars/05.png",
    alt: "Avatar",
    fallback: "SD",
  },
];

export const groupNotesById = (notes: Note[]) => {
  return notes.reduce<NoteListGroup>(
    (acc, note) => {
      acc.ids.push(note._id);
      acc.groups.set(note._id, note);
      return acc;
    },
    { groups: new Map(), ids: [] }
  );
};

export const groupRecordingById = (recordings: Recordings) => {
  return recordings.reduce<RecordingListGroup>(
    (acc, recording) => {
      acc.ids.push(recording.id);
      acc.groups.set(recording.id, recording);
      return acc;
    },
    { groups: new Map(), ids: [] }
  );
};

export const sampleNoteTimeline: NoteTimelineType[] = [
  {
    id: 1,
    date: "15 minutes ago",
    title: "Pull Request Submitted",
    description:
      "Submitted PR #342 with new feature implementation. Waiting for code review from team leads.",
  },
  {
    id: 2,
    date: "10 minutes ago",
    title: "CI Pipeline Started",
    description:
      "Automated tests and build process initiated. Running unit tests and code quality checks.",
  },
  {
    id: 3,
    date: "5 minutes ago",
    title: "Code Review Feedback",
    description:
      "Received comments on PR. Minor adjustments needed in error handling and documentation.",
  },
  {
    id: 4,
    date: "2 minutes ago",
    title: "Changes Pushed",
    description:
      "Implemented requested changes and pushed updates to feature branch. Awaiting final approval.",
  },
];

export const ElevenLabsSampleTTSText = `Once upon a time, in a small village, there lived a young boy named Max. Max had always dreamed of playing the guitar, but his family couldn't afford one.

One day, while exploring the village, Max stumbled upon a small, mysterious shop. The shop owner, an old man with a kind smile, noticed Max's fascination with a guitar on display.

The old man handed Max the guitar and said, "Play from the heart, and it will be yours." Max's fingers danced on the strings, and the most beautiful music filled the air.

The old man was so moved by Max's talent and passion that he gave him the guitar. Max's music brought joy to the entire village, and he became known as the village's young maestro.

Years later, Max returned to the shop to thank the old man, only to find that it had vanished. But in its place was a note that read: "The music was always yours, I just helped you find it." Max smiled, knowing that the old man's kindness had changed his life forever.`;

export const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
];

export const COOKIE_NAME = "active-theme";
export const DEFAULT_THEME = "default";

export const pathGroup: PathGroup = {
  dashboard: { label: "Dashboard", hasChildRoute: true, path: "dashboard" },
  notes: { label: "Notes", hasChildRoute: true, path: "notes" },
  hume: { label: "Hume AI", hasChildRoute: false, path: "hume" },
  elevenlabs: {
    label: "ElevenLabs AI",
    hasChildRoute: false,
    path: "elevenlabs",
  },
  settings: { label: "Settings", hasChildRoute: true, path: "settings" },
};

export const SIDEBAR_NAV_DATA = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    { title: "Notes", url: "/notes", icon: IconListDetails },
  ],
  navPlayground: [
    { title: "Playground", url: "/playground", icon: IconFileAi, name: "playground" },
    { title: "Hume AI", url: "/hume", icon: HumeLogo, name: "hume" },
    { title: "ElevenLabs AI", url: "/elevenlabs", icon: Pause, name: "elevenlabs" },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
  ],
  navSecondary: [{ title: "Settings", url: "/settings", icon: IconSettings }],
};
