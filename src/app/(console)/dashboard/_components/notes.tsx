import { NoContent } from "@/app/(console)/dashboard/_components/no-content";

const textHeading = "You haven't created any notes yet.";
const textBody = "Start creating your first note.";

export const Notes = () => {
	const handleCreate = () => {
		console.log("handleCreate");
	};

	return (
		<div className="bg-slate-100 dark:bg-zinc-950 rounded-md min-h-[calc(100vh_-_theme(spacing.64))] p-4 flex justify-center">
			<NoContent data={{ textHeading, textBody }} handleCreate={handleCreate} />
		</div>
	);
};
