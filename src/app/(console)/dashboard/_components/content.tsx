"use client";

import type { api } from "convex/_generated/api";

import { type Preloaded, usePreloadedQuery } from "convex/react";

import { BellIcon, BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react";
import { groupNotesById, groupRecordingById } from "@/lib/constants";
import { TabularLayout } from "@/dashboard/_components/tabs";
import { useMemo } from "react";

const Notifications = dynamic(async () => (await import("./notification")).Notifications, { ssr: false });
const RecordingsTab = dynamic(async () => (await import("./recording")).RecordingTab, { ssr: false });
const Overview = dynamic(async () => (await import("./overview")).Overview, { ssr: false });
const Notes = dynamic(async () => (await import("./notes")).Notes, { ssr: false });

import dynamic from "next/dynamic";

interface TabularLayoutProps {
	preloadedNotes: Preloaded<typeof api.notes.getNotesByUser>;
	preloadedRecordings: Preloaded<typeof api.recording.getRecordings>;
	preloadedNotifications: Preloaded<typeof api.notification.getLatest>;
}

export const Content = (props: TabularLayoutProps) => {
	const { preloadedNotes, preloadedRecordings, preloadedNotifications } = props;

	const notes = usePreloadedQuery(preloadedNotes);
	const recordings = usePreloadedQuery(preloadedRecordings);
	const notifications = usePreloadedQuery(preloadedNotifications);

	const formattedNotes = useMemo(() => groupNotesById(notes), [notes]);
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
			<Notes
				count={notes.length}
				notes={formattedNotes}
				title="notes"
				icon={
					<BoxIcon
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
