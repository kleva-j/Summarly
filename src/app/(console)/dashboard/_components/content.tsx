"use client";

import type { api } from "convex/_generated/api";

import { type Preloaded, usePreloadedQuery } from "convex/react";

import { BellIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react";
import { TabularLayout } from "@/dashboard/_components/tabs";
import { groupRecordingById } from "@/lib/constants";
import { useMemo } from "react";

const Notifications = dynamic(async () => (await import("./notification")).Notifications, { ssr: false });
const RecordingsTab = dynamic(async () => (await import("./recording")).RecordingTab, { ssr: false });
const Overview = dynamic(async () => (await import("./overview")).Overview, { ssr: false });

import dynamic from "next/dynamic";

interface TabularLayoutProps {
	preloadedRecordings: Preloaded<typeof api.recording.getRecordings>;
	preloadedNotifications: Preloaded<typeof api.notification.getLatest>;
}

export const Content = (props: TabularLayoutProps) => {
	const { preloadedRecordings, preloadedNotifications } = props;

	const recordings = usePreloadedQuery(preloadedRecordings);
	const notifications = usePreloadedQuery(preloadedNotifications);

	const formattedRecordings = useMemo(() => groupRecordingById(recordings), [recordings]);

	return (
		<TabularLayout>
			<Overview
				title="overview"
				icon={
					<HouseIcon
						className="-ms-0.5 me-1.5 opacity-60"
						aria-hidden="true"
						size={16}
					/>
				}
			/>
			<RecordingsTab
				count={recordings.length}
				recordings={formattedRecordings}
				title="recordings"
				icon={
					<PanelsTopLeftIcon
						className="-ms-0.5 me-1.5 opacity-60"
						aria-hidden="true"
						size={16}
					/>
				}
			/>
			<Notifications
				notifications={notifications}
				count={notifications.length}
				title="notifications"
				icon={
					<BellIcon
						className="-ms-0.5 me-1.5 opacity-60"
						aria-hidden="true"
						size={16}
					/>
				}
			/>
		</TabularLayout>
	);
};
