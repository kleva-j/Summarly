import type { PropsWithChildren } from "react";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/app/(console)/dashboard/_header";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
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
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
