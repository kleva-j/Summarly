import type { Icon } from "@tabler/icons-react";
import type { SVGProps, FC } from "react";

import { usePathname } from "next/navigation";

import {
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarGroup,
  SidebarMenu,
} from "@/components/ui/sidebar";

import Link from "next/link";

export interface NavMainProps {
  items: {
    title: string;
    url: string;
    icon?: Icon | FC<SVGProps<SVGSVGElement>>;
  }[];
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();
  const basePath = pathname.split("/").filter(Boolean)[0].toLowerCase();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = basePath === item.title.toLowerCase();
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  asChild
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
