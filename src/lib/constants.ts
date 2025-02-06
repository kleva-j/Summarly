import type {
  NavItemMapType,
  NavItemType,
  Product,
  UseCase,
} from "@/lib/types";

import { MessageCircle, BookOpenText, GitMerge, Mic } from "lucide-react";

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
