import type { PropsWithChildren } from "react";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppContextProvider } from "@/components/providers/app";
import { getHumeAccessToken } from "@/lib/getHumeAccessToken";
import { Header } from "@/app/(console)/dashboard/_header";
import { AppSidebar } from "@/components/app-sidebar";
import { HumeClient } from "@/components/hume/client";
import { ERRORS } from "@/lib/error";

const { Hume_AI_Error } = ERRORS;

export default async function DashboardLayout({ children }: PropsWithChildren) {
	const accessToken = await getHumeAccessToken();

	if (!accessToken) console.error(Hume_AI_Error.ACCESS_TOKEN);

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
				<HumeClient accessToken={accessToken ?? ""}>
					<AppContextProvider>{children}</AppContextProvider>
				</HumeClient>
			</SidebarInset>
		</SidebarProvider>
	);
}
