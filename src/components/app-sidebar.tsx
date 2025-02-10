import { GalleryVerticalEnd, PanelLeftClose } from "lucide-react";
import { NavUser } from "@/components/nav-user";
import { NavMain } from "@/components/nav-main";
import { siteConfig } from "@/lib/config";

import {
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
	SidebarContent,
	SidebarHeader,
	SidebarFooter,
	SidebarRail,
	SidebarMenu,
	Sidebar,
} from "@/components/ui/sidebar";

import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="#">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<GalleryVerticalEnd className="size-4" />
								</div>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-semibold">{siteConfig.name}</span>
									<span className="">v{siteConfig.version}</span>
								</div>
								<SidebarTrigger className="ml-auto">
									<PanelLeftClose />
								</SidebarTrigger>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain />
			</SidebarContent>
			<SidebarFooter>
				<div className="p-1">
					<NavUser />
				</div>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
