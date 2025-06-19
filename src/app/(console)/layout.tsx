import type { PropsWithChildren } from "react";

import { DashboardContextProvider } from "@/components/providers/dashboard";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { NotesContextProvider } from "@/components/providers/notes";
import { AppContextProvider } from "@/components/providers/app";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

export default async function ConsoleLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <AppContextProvider>
          <DashboardContextProvider>
            <NotesContextProvider>
              <SiteHeader />
              {children}
            </NotesContextProvider>
          </DashboardContextProvider>
        </AppContextProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
