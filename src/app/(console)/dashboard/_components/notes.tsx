import type { SharedProps } from "@/app/(console)/dashboard/_components/tabs";
import type { Note, NoteStatus } from "@/model/types";

import { NoContent } from "@/app/(console)/dashboard/_components/no-content";
import { NoteList } from "@/app/(console)/dashboard/_components/notelist";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCallback, useId, useMemo } from "react";
import { FilterOptions } from "@/model/constant";
import { Label } from "@/components/ui/label";
import { useQueryState } from "nuqs";

type NotesProps = SharedProps & { notes: Note[] };

const filterOptions = { defaultValue: FilterOptions.ALL };

const lists = [
	{ value: FilterOptions.ALL, label: "All" },
	{ value: FilterOptions.DRAFT, label: "Draft" },
	{ value: FilterOptions.ARCHIVED, label: "Archived" },
];

const filterNotes = (status: NoteStatus) =>
	({
		all: (note: Note) => !!note,
		draft: (note: Note) => note.status === FilterOptions.DRAFT,
		archived: (note: Note) => note.status === FilterOptions.ARCHIVED,
	})[status];

const textHeading = "You haven't created any notes yet.";
const textBody = "Start creating your first note.";
const actionLabel = "Create note";

// Notes Component
export const Notes = ({ notes }: NotesProps) => {
	const handleCreate = () => {
		console.log("handleCreate");
	};

	if (notes.length === 0) {
		return (
			<div className="bg-slate-100 dark:bg-zinc-950 rounded-md min-h-[calc(100vh_-_theme(spacing.64))] p-4 flex justify-center">
				<div className="flex flex-col gap-3 w-full">
					<NoContent
						data={{ textHeading, textBody, actionLabel }}
						handleCreate={handleCreate}
					/>
				</div>
			</div>
		);
	}

	const [filter, setFilter] = useQueryState("filter", filterOptions);

	const handleFilterChange = useCallback(
		(filter: NoteStatus) => setFilter(filter),
		[setFilter],
	);

	const filteredNotes = useMemo(
		() => notes.filter(filterNotes(filter as NoteStatus)),
		[filter, notes],
	);

	const id = useId();

	return (
		<div className="bg-slate-100 dark:bg-zinc-950 rounded-md min-h-[calc(100vh_-_theme(spacing.64))] p-4 flex justify-center">
			<div className="flex flex-col gap-3 w-full">
				<fieldset className="flex gap-2 h-fit items-center">
					<span className="text-foreground text-sm leading-none font-medium flex">
						Filter
					</span>
					<RadioGroup
						onValueChange={handleFilterChange}
						className="flex flex-wrap gap-2"
						value={filter}
					>
						{lists.map((item) => (
							<div
								key={`${id}-${item.value}`}
								className="relative flex flex-col items-start gap-2 p-1"
							>
								<div className="flex items-center gap-2">
									<RadioGroupItem
										className="after:absolute after:inset-0 items-center justify-center size-3.5"
										id={`${id}-${item.value}`}
										value={item.value}
									/>
									<Label htmlFor={`${id}-${item.value}`}>{item.label}</Label>
								</div>
							</div>
						))}
					</RadioGroup>
				</fieldset>
				<NoteList notes={filteredNotes} />
			</div>
		</div>
	);
};
