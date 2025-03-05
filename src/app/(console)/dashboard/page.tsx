import type { Preloaded } from "convex/react";

import { Header, Content } from "@/app/(console)/dashboard/_components";
import { getAuthToken, getUserId } from "@/lib/auth";
import { captureEvent } from "@/lib/posthog/utils";
import { preloadQuery } from "convex/nextjs";
import { EVENTS } from "@/lib/posthog";

import { api } from "@/convex/_generated/api";

export default async function DashboardPage() {
	const userId = await getUserId();

	let preloadedNotes: Preloaded<typeof api.notes.getAllByUser> = [];
	let preloadedRecordings: Preloaded<typeof api.recording.getRecordings> = [];
	let preloadedNotifications: Preloaded<typeof api.notification.getLatest> = [];

	try {
		const config = { token: await getAuthToken() };
		preloadedNotes = await preloadQuery(api.notes.getAllByUser, {}, config);
		preloadedRecordings = await preloadQuery(api.recording.getRecordings, {}, config);
		preloadedNotifications = await preloadQuery(api.notification.getLatest, {}, config);
	} catch (e) {
		console.error(e);
	}

	captureEvent(userId ?? "")(EVENTS.PAGE_VIEW);

	return (
		<div className="flex flex-col">
			<main className="flex min-h-[calc(100vh-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/50 p-4 md:gap-8 md:p-10">
				<div className="flex-1 space-y-4 md:px-8">
					<Header />

					<Content
						preloadedNotes={preloadedNotes}
						preloadedRecordings={preloadedRecordings}
						preloadedNotifications={preloadedNotifications}
					/>
				</div>
			</main>
		</div>
	);
}
