import type { LucideIcon } from "lucide-react";

export type UseCase = {
  title: string;
  icon: LucideIcon;
  description: string;
};

export type Product = Omit<UseCase, "icon">;

export type NavItem = {
  title: string;
  href: string;
};
