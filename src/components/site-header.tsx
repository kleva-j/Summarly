"use client";

import { ThemeSelector } from "@/components/theme/theme-selector";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { pathGroup } from "@/lib/constants";
import { Fragment } from "react";

import {
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  Breadcrumb,
} from "@/components/ui/breadcrumb";

const allowedPaths = Object.values(pathGroup).map((item) => item.path);

export function SiteHeader() {
  const pathname = usePathname();

  const segmentedPaths = pathname.split("/").filter(Boolean);
  const showBreadcrumb = allowedPaths.includes(segmentedPaths[0]);
  const finalPath = segmentedPaths.pop();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {showBreadcrumb && (
          <Breadcrumb>
            <BreadcrumbList>
              {segmentedPaths.map((item) => (
                <Fragment key={item}>
                  <BreadcrumbItem className="hidden md:block capitalize">
                    <BreadcrumbLink href="#">
                      {pathGroup[item].label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </Fragment>
              ))}

              <BreadcrumbItem key={finalPath} className="capitalize">
                <BreadcrumbPage>{finalPath}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}
