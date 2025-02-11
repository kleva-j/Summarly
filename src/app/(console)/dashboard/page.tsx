import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/app/(console)/dashboard/_header";
import { AppSidebar } from "@/components/app-sidebar";

export default function Page() {
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
				<div className="flex flex-1 flex-col gap-4 p-4">
					<div className="grid auto-rows-min gap-4 md:grid-cols-3">
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
					</div>
					<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
