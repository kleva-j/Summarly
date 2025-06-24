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
  icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
  disabled?: boolean;
}[];

export type ColorThemeOption = {
  value: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>> | LucideIcon;
};

export type Language = { label: string; value: string; icon?: LucideIcon };

export type StatsDataPoint = { name: string; total: number };

export type RecentSaleType = {
  name: string;
  email: string;
  amount: string;
  src: string;
  alt: string;
  fallback: string;
};

export type PathGroup = {
  [key: string]: { label: string; hasChildRoute: boolean; path: string };
};
