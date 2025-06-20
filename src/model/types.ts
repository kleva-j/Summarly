import type { Doc } from "@/convex/_generated/dataModel";
import type { FunctionReturnType } from "convex/server";
import type { FilterOptions } from "@/model/constant";
import type { api } from "@/convex/_generated/api";
import type { DateRange } from "react-day-picker";
import type { Voice } from "elevenlabs/api";

export type NoteVersion = "v1" | "v2";
export type AppStateVersion = "v1" | "v2";

export type NoteStatus = "draft" | "archived" | "published";
export type NoteFilterList = "all" | NoteStatus;

export type DashboardTabs =
  | "overview"
  | "recordings"
  | "notes"
  | "notifications";

export type Note = Doc<"notes">;

export type NoteDetail = Note & {
  status: NoteStatus;
  version: NoteVersion;
};

export type NoteId = Note["_id"];

export type NoteGroup = Map<NoteId, Note>;

export type NoteState = {
  loading: boolean;
  notes: NoteGroup;
  error: string | null;
  selectedNote: Note | null;
  activeNoteId: string | null;
};

export interface NoteListGroup {
  groups: NoteGroup;
  ids: NoteId[];
}

export type AppState = {
  loading: boolean;
  error: string | null;
  theme: "light" | "dark";
  language: { value: string; label: string };
};

export const Themes = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type DashboardState = {
  loading: boolean;
  error: string | null;
  activeTab: DashboardTabs;
  dateRange: DateRange | undefined;
};

export type NoteStateContextType = NoteState & {};

export enum NoteStateActions {
  CREATE_NOTE = "CREATE_NOTE",
  UPDATE_NOTE = "UPDATE_NOTE",
  DELETE_NOTE = "DELETE_NOTE",
  SELECT_NOTE = "SELECT_NOTE",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_ACTIVE_NOTE_ID = "SET_ACTIVE_NOTE_ID",
  FETCH_NOTES = "FETCH_NOTES",
  RETRY_FETCH = "RETRY_FETCH",
}

export type NoteStateEventsType =
  | { type: NoteStateActions.CREATE_NOTE; payload: Note }
  | { type: NoteStateActions.UPDATE_NOTE; payload: Note }
  | { type: NoteStateActions.DELETE_NOTE; payload: NoteId }
  | { type: NoteStateActions.SELECT_NOTE; payload: NoteId }
  | { type: NoteStateActions.SET_LOADING; payload: boolean }
  | { type: NoteStateActions.SET_ERROR; payload: string | null }
  | { type: NoteStateActions.SET_ACTIVE_NOTE_ID; payload: string | null }
  | { type: NoteStateActions.FETCH_NOTES; payload: Note[] }
  | { type: NoteStateActions.RETRY_FETCH };

export type NoteStateActionType = keyof typeof NoteStateActions;

export enum AppStateActions {
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_THEME = "SET_THEME",
  SET_LANGUAGE = "SET_LANGUAGE",
}

export type AppStateActionType = keyof typeof AppStateActions;

export type AppStateEvents =
  | { type: AppStateActions.SET_LOADING; payload: boolean }
  | { type: AppStateActions.SET_ERROR; payload: string | null }
  | { type: AppStateActions.SET_THEME; payload: "light" | "dark" }
  | {
      type: AppStateActions.SET_LANGUAGE;
      payload: { value: string; label: string };
    };

export enum DashboardStateActions {
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_DATE_RANGE = "SET_DATE_RANGE",
  SET_ACTIVE_TAB = "SET_ACTIVE_TAB",
}

export const DashboardTabs = {
  OVERVIEW: "overview",
  RECORDINGS: "recordings",
  NOTES: "notes",
  NOTIFICATIONS: "notifications",
} as const;

export type DashboardStateEvents =
  | { type: DashboardStateActions.SET_LOADING; payload: boolean }
  | { type: DashboardStateActions.SET_ERROR; payload: string | null }
  | { type: DashboardStateActions.SET_ACTIVE_TAB; payload: DashboardTabs }
  | {
      type: DashboardStateActions.SET_DATE_RANGE;
      payload: DateRange | undefined;
    };

export type FilterOption = (typeof FilterOptions)[keyof typeof FilterOptions];

export type Recordings = FunctionReturnType<typeof api.recording.getRecordings>;

export type Recording = Recordings[number];

export type RecordingId = Recording["id"];

export interface RecordingListGroup {
  groups: Map<RecordingId, Recording>;
  ids: RecordingId[];
}

export type NoteTimelineType = {
  id: number;
  date: string;
  title: string;
  description: string;
};

export type ElevenLabsTTSstate = {
  error: string | null;
  voices: Voice[];
  status: string;
  audio: Buffer<ArrayBufferLike> | null;
};

export enum ElevenLabsTTSStateActions {
  SUBMIT_AUDIO = "SUBMIT_AUDIO",
  CHANGE_VOICE = "CHANGE_VOICE",
  RETRY_FETCH = "RETRY_FETCH",
  SET_VOICES = "SET_VOICES",
  SET_ERROR = "SET_ERROR",
  EDIT_TEXT = "EDIT_TEXT",
}

export type ElevenLabTTSStateEvents =
  | { type: ElevenLabsTTSStateActions.SET_ERROR; payload: string | null }
  | { type: ElevenLabsTTSStateActions.CHANGE_VOICE; payload: string }
  | { type: ElevenLabsTTSStateActions.SET_VOICES; payload: Voice[] }
  | { type: ElevenLabsTTSStateActions.EDIT_TEXT; payload: string }
  | { type: ElevenLabsTTSStateActions.RETRY_FETCH }
  | {
      type: ElevenLabsTTSStateActions.SUBMIT_AUDIO;
      payload: { text: string; voice: string };
    };

// Rust-style types - improves error handling best-practices
export type Ok<T> = T extends void ? { ok: true } : { ok: true; value: T };

export type Err<E> = { ok: false; error: E };

export type Result<T, E = string> = Ok<T> | Err<E>;

export const Ok = <T>(value?: T extends void ? undefined : T): Ok<T> => {
  return (
    typeof value === "undefined" ? { ok: true } : { ok: true, value }
  ) as Ok<T>;
};

export const Err = <E>(error: E): Err<E> => ({ ok: false, error });
