import type {
  AppStateVersion,
  NoteVersion,
  NoteState,
  AppState,
  Note,
} from "@/model/types";

import { Languages } from "@/lib/constants";

export const NOTE_VERSION: NoteVersion = "v1";
export const APP_STATE_VERSION: AppStateVersion = "v1";

export const NOTESTATE: NoteState = {
  loading: false,
  notes: new Map<string, Note>(),
  error: null,
  selectedNote: null,
  activeNoteId: null,
};

export const APPSTATE: AppState = {
  loading: false,
  error: null,
  theme: "light",
  language: Languages[0],
};
