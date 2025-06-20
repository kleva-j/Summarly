import type { PropsWithChildren } from "react";

import { type LucideIcon, Paintbrush, Settings } from "lucide-react";

import { Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";

import {
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarProvider,
  SidebarMenuItem,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  Sidebar,
} from "@/components/ui/sidebar";

import Link from "next/link";

interface NavItem {
  name: string;
  icon: LucideIcon;
  href: string;
}

const navItemData: NavItem[] = [
  { name: "Appearance", icon: Paintbrush, href: "/dashboard/settings/appearance" },
  { name: "Advanced", icon: Settings, href: "/dashboard/settings/advanced" },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center flex-1 p-4">
      <div className="w-full max-w-2xl">
        <Text variant="h3" as="h1" className="mb-6 mt-4">
          Update Settings
        </Text>
        <Card className="overflow-hidden w-full p-0 max-h-[30rem]">
          <SidebarProvider className="items-start">
            <Sidebar collapsible="none" className="hidden md:flex">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {navItemData.map((item) => (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton asChild>
                            <Link href={item.href} className="capitalize">
                              <item.icon />
                              <span>{item.name}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <main className="flex overflow-hidden py-4 flex-1">
              {children}
            </main>
          </SidebarProvider>
        </Card>
      </div>
    </div>
  );
}
