"use client";

import type { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import type { NavTitleType } from '@/lib/types';
import type { LucideIcon } from "lucide-react";

import { NAV_ITEMS_MAP } from "@/lib/constants";
import { siteConfig } from "@/lib/config";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

import Link from "next/link";

import {
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenu,
} from "@/components/ui/navigation-menu";


export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-2 space-x-0 text-sm">
      {siteConfig.navItems.map(({ title, label, href, children }) => children ? (
        <NavigationMenuItem key={title} className="text-sm">
          <NavigationMenuTrigger className="text-[15px] font-normal">
            {label}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {NAV_ITEMS_MAP[title as NavTitleType].map((navItem) => (
                <ListItem
                  key={navItem.title}
                  title={navItem.label}
                  href={`${href}/${navItem.title}`}
                  // @ts-expect-error // Property 'icon' does not exist on type 'Product'.
                  icon={navItem?.icon}
                >
                  {navItem.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      ) : (
        <NavigationMenuItem key={title} className="text-sm px-4">
          <NavigationMenuLink asChild>
            <Link href={href}>{label}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

const ListItem = forwardRef<
  React.ComponentRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { icon?: LucideIcon }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          {props.icon && <props.icon className="mb-4 h-6 w-6" />}
          <div className="text-sm font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
