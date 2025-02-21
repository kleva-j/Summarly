import { Component } from "@/app/(console)/dashboard/_components";
import { captureEvent } from "@/lib/posthog/utils";
import { getUserId } from "@/lib/auth";
import { EVENTS } from "@/lib/posthog";

export default async function Page() {
	const distinctId = (await getUserId()) ?? "";

	captureEvent(distinctId)(EVENTS.PAGE_VIEW);

	return (
		<div className="flex flex-col">
			<main className="flex min-h-[calc(100vh-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/50 p-4 md:gap-8 md:p-10">
				<Component />
			</main>
		</div>
	);
}
