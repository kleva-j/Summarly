import type { LucideIcon } from "lucide-react";

export type LinkType = {
  title: string;
  href: string;
  label: string;
};

export type NavLinkType = Omit<LinkType, "href"> & {
  icon?: LucideIcon;
  description: string;
};

export type UseCase = NavLinkType;
export type Product = NavLinkType;

export type NavTitleType = "product" | "use case";
export type NavItemType = LinkType & { children?: (Product | UseCase)[] };
export type NavItemMapType = Record<NavTitleType, (Product | UseCase)[]>;

export type SidebarNavDataType = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
  disabled?: boolean;
}[];
