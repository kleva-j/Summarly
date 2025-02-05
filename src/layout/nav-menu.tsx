import type { NavigationMenuProps } from "@radix-ui/react-navigation-menu";

import { siteConfig } from "@/lib/config";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";

import Link from "next/link";

export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
      {siteConfig.navItems.map((item) => (
        <NavigationMenuItem key={item.href} className="text-sm">
          <NavigationMenuLink asChild>
            <Link href={item.href}>{item.title}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);
