import type { SharedProps } from "@/app/(console)/dashboard/_components/tabs";
import type { Doc } from "convex/_generated/dataModel";

import { NoContent } from "@/app/(console)/dashboard/_components/no-content";

const textHeading = "You haven't created any notes yet.";
const textBody = "Start creating your first note.";
const actionLabel = "Create note"

type NotesProps = SharedProps & { notes: Doc<"notes">[] };

export const Notes = ({ notes }: NotesProps) => {
	const handleCreate = () => {
		console.log("handleCreate");
	};

	return (
		<div className="bg-slate-100 dark:bg-zinc-950 rounded-md min-h-[calc(100vh_-_theme(spacing.64))] p-4 flex justify-center">
			{notes.length > 0 ? (
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
