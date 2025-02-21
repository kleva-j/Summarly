import type { DashboardTabs } from "@/model/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PanelsTopLeftIcon, HouseIcon, BellIcon, BoxIcon } from "lucide-react";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

import dynamic from "next/dynamic";

const Notifications = dynamic(async () => (await import("./notification")).Notifications, { ssr: false });
const Recordings = dynamic(async () => (await import("./recording")).Recording, { ssr: false });
const Overview = dynamic(async () => (await import("./overview")).Overview, { ssr: false });
const Notes = dynamic(async () => (await import("./notes")).Notes, { ssr: false });

interface TabularLayoutProps {
	activeTab: DashboardTabs;
	handleTabChange: (value: DashboardTabs | string) => void;
}

export function TabularLayout(props: TabularLayoutProps) {
	const { activeTab, handleTabChange } = props;

	return (
		<Tabs
			onValueChange={handleTabChange}
			defaultValue={activeTab}
			value={activeTab}
		>
			<ScrollArea>
				<TabsList className="mb-3">
					<TabsTrigger value="overview">
						<HouseIcon
							className="-ms-0.5 me-1.5 opacity-60"
							size={16}
							aria-hidden="true"
						/>
						Overview
					</TabsTrigger>
					<TabsTrigger value="recordings" className="group">
						<PanelsTopLeftIcon
							className="-ms-0.5 me-1.5 opacity-60"
							size={16}
							aria-hidden="true"
						/>
						Recordings
						<Badge variant="secondary" className="ml-1.5 min-w-5 px-1">
							3
						</Badge>
					</TabsTrigger>
					<TabsTrigger value="notes" className="group">
						<BoxIcon
							className="-ms-0.5 me-1.5 opacity-60"
							size={16}
							aria-hidden="true"
						/>
						Notes
						<Badge className="ms-1.5 transition-opacity group-data-[state=inactive]:opacity-50">
							New
						</Badge>
					</TabsTrigger>
					<TabsTrigger value="notifications" className="group">
						<BellIcon
							className="-ms-0.5 me-1.5 opacity-60"
							size={16}
							aria-hidden="true"
						/>
						Notifications
						<Badge variant="secondary" className="ml-1.5 min-w-5 px-1">
							3
						</Badge>
					</TabsTrigger>
				</TabsList>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
			<TabsContent value="overview">
				<Overview />
			</TabsContent>
			<TabsContent value="recordings">
				<Recordings />
			</TabsContent>
			<TabsContent value="notes">
				<Notes />
			</TabsContent>
			<TabsContent value="notifications">
				<Notifications />
			</TabsContent>
		</Tabs>
	);
}
