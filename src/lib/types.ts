import type { LucideIcon } from "lucide-react";

export type LinkType = {
	title: string;
	href: string;
	label: string;
};

export type UseCase = Omit<LinkType, "href"> & {
	icon: LucideIcon;
	description: string;
};

export type Product = Omit<UseCase, "icon">;

export type NavTitleType = "product" | "use case";
export type NavItemType = LinkType & { children?: (Product | UseCase)[] };
export type NavItemMapType = Record<NavTitleType, (Product | UseCase)[]>;
