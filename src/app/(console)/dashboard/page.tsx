import { Header, Content } from "@/dashboard/_components";
import { getAuthToken, getUserId } from "@/lib/auth";
import { captureEvent } from "@/lib/posthog/utils";
import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { EVENTS } from "@/lib/posthog";

type AuthConfig = { token: string | undefined;};

export default async function DashboardPage() {
	const userId = await getUserId();
	const config: AuthConfig = { token: undefined };

	try {
		config.token = await getAuthToken();
	} catch (e) {
		console.error(e);
	}

	const preloadedRecordings = await preloadQuery(api.recording.getRecordings, {}, config);
	const preloadedNotifications = await preloadQuery(api.notification.getLatest, {}, config);

	captureEvent(userId ?? "")(EVENTS.PAGE_VIEW);

	return (
		<div className="flex flex-col">
			<main className="flex min-h-[calc(100vh-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/50 p-4 md:gap-8 md:p-10">
				<div className="flex-1 space-y-4 md:px-8">
					<Header />

					<Content
						preloadedRecordings={preloadedRecordings}
						preloadedNotifications={preloadedNotifications}
					/>
				</div>
			</main>
		</div>
	);
}
