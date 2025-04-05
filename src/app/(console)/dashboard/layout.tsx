import type { PropsWithChildren } from "react";

import { DashboardContextProvider } from "@/components/providers/dashboard";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { NotesContextProvider } from "@/components/providers/notes";
import { AppContextProvider } from "@/components/providers/app";
import { getHumeAccessToken } from "@/lib/getHumeAccessToken";
import { AppSidebar } from "@/components/app-sidebar";
import { HumeClient } from "@/components/hume/client";
import { Header } from "@/dashboard/_header";
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
					<AppContextProvider>
						<DashboardContextProvider>
							<NotesContextProvider>{children}</NotesContextProvider>
						</DashboardContextProvider>
					</AppContextProvider>
				</HumeClient>
			</SidebarInset>
		</SidebarProvider>
	);
}
