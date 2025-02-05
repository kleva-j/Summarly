import type { NavItem, Product, UseCase } from "@/lib/types";

import { MessageCircle, BookOpenText, GitMerge, Mic } from "lucide-react";

export const NAV_ITEMS: NavItem[] = [
	{ title: "Product", href: "/products" },
	{ title: "Use Case", href: "/use-cases" },
	{ title: "About", href: "/about" },
];

export const products: Product[] = [
	{
		title: "Features",
		description:
			"Discover features that can help you to get more out of meetings.",
	},
	{
		title: "Conversation Intelligence",
		description:
			"Gain valuable meetings insight and understanding into your conversations.",
	},
	{
		title: "Chrome Extension",
		description:
			"Capture & transcribe meetings and videos using Summarly Chrome extension.",
	},
	{
		title: "Android & iOS Apps",
		description:
			"Capture & transcribe meetings and videos using Summarly apps.",
	},
];

export const useCases: UseCase[] = [
	{
		title: "Engineering",
		icon: GitMerge,
		description: "Automate meeting notes, documentation and follow-up actions.",
	},
	{
		title: "Consulting",
		icon: MessageCircle,
		description:
			"Easily draft reports and automatically documenting decisions and commitments.",
	},
	{
		title: "Education",
		icon: BookOpenText,
		description:
			"Easily draft reports and automatically documenting decisions and commitments.",
	},
	{
		title: "Media and Podcasting",
		icon: Mic,
		description:
			"Easily draft reports and automatically documenting decisions and commitments.",
	},
];
