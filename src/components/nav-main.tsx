"use client";

import { SIDEBAR_NAV_DATA } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

import {
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarGroup,
	SidebarMenu,
} from "@/components/ui/sidebar";

export function NavMain() {
	return (
		<SidebarGroup>
			<SidebarMenu>
				{SIDEBAR_NAV_DATA.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton
							isActive={item.isActive}
							disabled={item.disabled}
							asChild
						>
							<a href={item.url} className="">
								<item.icon />
								<span>{item.title}</span>
								{item.disabled && (
									<Badge className="ml-auto bg-slate-600/10 dark:bg-slate-600/20 hover:bg-slate-600/10 text-slate-500 text-[9px] shadow-none rounded-full px-1.5 font-light">
										<div className="h-1 w-1 rounded-full bg-slate-500 mr-1" />
										Coming soon
									</Badge>
								)}
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
