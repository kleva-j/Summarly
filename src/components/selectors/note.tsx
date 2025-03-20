import type { NoteState } from "@/model/types";

type NoteStateSelector<T extends keyof NoteState> = (state: {
	context: NoteState;
}) => NoteState[T];

export const selectNotes: NoteStateSelector<"notes"> = ({ context }) =>
	context.notes;

export const getSelectedNote: NoteStateSelector<"selectedNote"> = ({
	context,
}) => context.selectedNote;

export const selectLoading: NoteStateSelector<"loading"> = ({ context }) =>
	context.loading;

export const selectError: NoteStateSelector<"error"> = ({ context }) =>
	context.error;

export const getActiveNoteId: NoteStateSelector<"activeNoteId"> = ({
	context,
}) => context.activeNoteId;
