import type { SharedProps } from "@/app/(console)/dashboard/_components/tabs";

import { NoContent } from "@/app/(console)/dashboard/_components/no-content";

type Recording = { id: string; url: string };

type RecordingProps = SharedProps & { recordings: Recording[] };

const textHeading = "You haven't created any Recording yet.";
const textBody = "Make a new recording.";
const actionLabel = "Add Recording";

export const Recording = ({ title, recordings }: RecordingProps) => {
	const handleCreate = () => {
		console.log("handleCreate");
	};
	return (
		<div className="bg-slate-100 dark:bg-zinc-950 rounded-md min-h-[calc(100vh_-_theme(spacing.64))] p-4 flex justify-center">
			{recordings.length > 0 ? (
				<div>Notes</div>
			) : (
				<NoContent
					data={{ textHeading, textBody, actionLabel }}
					handleCreate={handleCreate}
				/>
			)}
		</div>
	);
};
