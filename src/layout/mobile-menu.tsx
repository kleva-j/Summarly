import type { NavTitleType } from "@/lib/types";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_ITEMS_MAP } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { Logo } from "@/components/logo";
import { Menu } from "lucide-react";

import Link from "next/link";

export const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Logo />
        <div className="mt-12 text-base space-y-4">
          {siteConfig.navItems.map(({ title, href, children, label }) => children ? (
            <div key={title}>
              <div className="font-bold">{label}</div>
              <ul className="mt-2 space-y-3 ml-1 pl-4 border-l">
                {NAV_ITEMS_MAP[title as NavTitleType].map((item) => (
                  <li key={item.title}>
                    <Link
                      href={`${href}/${item.title}`}
                      className="flex items-center gap-2"
                    >
                      {item.icon && (
                        <item.icon className="h-5 w-5 mr-2 text-muted-foreground" />
                      )}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Link
              key={title}
              href={`${href}/${title}`}
              className="flex items-center gap-2 font-bold"
            >
              {label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
