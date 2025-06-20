import type { LucideIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Paintbrush, Settings } from "lucide-react";

import { Appearance } from "@/settings/[slug]/_appearance";
import { Advanced } from "@/settings/[slug]/_advanced";

import Link from "next/link";
interface NavItem {
  name: string;
  icon: LucideIcon;
  href: string;
  Component: React.ComponentType;
}

interface SettingsPageProps {
  params: Promise<{ slug: "appearance" | "advanced" }>;
}

const navItemData: NavItem[] = [
  {
    name: "appearance",
    icon: Paintbrush,
    href: "/settings/appearance",
    Component: Appearance,
  },
  {
    name: "advanced",
    icon: Settings,
    href: "/settings/advanced",
    Component: Advanced,
  },
];

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { slug } = await params;

  return (
    <Tabs defaultValue={slug} className="max-w-sm w-full">
      <TabsList className="w-max bg-background justify-center border-2 py-1 rounded-md">
        {navItemData.map((tab) => (
          <TabsTrigger
            key={tab.name}
            value={tab.name}
            className="rounded-sm bg-transparent h-full data-[state=active]:shadow-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 capitalize"
            asChild
          >
            <Link href={tab.href}>
              <tab.icon className="text-[13px]" />
              <span className="text-[13px]">{tab.name}</span>
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>

      {navItemData.map((tab) => (
        <TabsContent key={tab.name} value={tab.name} className="px-2">
          <tab.Component />
        </TabsContent>
      ))}
    </Tabs>
  );
}
