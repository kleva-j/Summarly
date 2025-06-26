import type { Icon } from "@tabler/icons-react";
import type { SVGProps, FC } from "react";

import {
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarGroup,
  SidebarMenu,
} from "@/components/ui/sidebar";

import Link from "next/link";

export interface NavPlaygroundProps {
  items: {
    title: string;
    url: string;
    icon?: Icon | FC<SVGProps<SVGSVGElement>>;
  }[];
}

export function NavPlayground({ items }: NavPlaygroundProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>AI Playground</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
