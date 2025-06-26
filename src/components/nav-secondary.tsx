import type { ComponentPropsWithoutRef, FC, SVGProps } from "react";
import type { Icon } from "@tabler/icons-react";

import { usePathname } from "next/navigation";

import {
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarMenu,
} from "@/components/ui/sidebar";

export interface NavSecondaryProps
  extends ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: {
    title: string;
    url: string;
    icon?: Icon | FC<SVGProps<SVGSVGElement>>;
  }[];
}

export function NavSecondary({ items, ...props }: NavSecondaryProps) {
  const pathname = usePathname();
  const basePath = pathname.split("/").filter(Boolean)[0].toLowerCase();

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = basePath === item.title.toLowerCase();
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <a href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
