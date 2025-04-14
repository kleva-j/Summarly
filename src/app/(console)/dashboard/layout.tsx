import type { PropsWithChildren } from "react";

import { DashboardContextProvider } from "@/components/providers/dashboard";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { NotesContextProvider } from "@/components/providers/notes";
import { AppContextProvider } from "@/components/providers/app";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/dashboard/_header";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar
        className="max-w-[16rem]"
        collapsible="offcanvas"
        variant="floating"
        side="left"
      />
      <SidebarInset>
        <Header />
        <AppContextProvider>
          <DashboardContextProvider>
            <NotesContextProvider>{children}</NotesContextProvider>
          </DashboardContextProvider>
        </AppContextProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
