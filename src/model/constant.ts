import {
  type AppStateVersion,
  type NoteFilterList,
  type DashboardState,
  type FilterOption,
  type NoteVersion,
  type NoteState,
  type AppState,
  type NoteId,
  type Note,
  DashboardTabs,
  Themes,
} from "@/model/types";

import { Languages } from "@/lib/constants";

export const NOTE_VERSION: NoteVersion = "v1";
export const APP_STATE_VERSION: AppStateVersion = "v1";

export const NOTESTATE: NoteState = {
  loading: false,
  notes: new Map<NoteId, Note>(),
  error: null,
  selectedNote: null,
  activeNoteId: null,
};

export const APPSTATE: AppState = {
  loading: false,
  error: null,
  theme: Themes.LIGHT,
  language: Languages[0],
};

export const DASHBOARDSTATE: DashboardState = {
  loading: false,
  error: null,
  activeTab: DashboardTabs.OVERVIEW,
  dateRange: { from: new Date(), to: new Date() },
};

export const FilterOptions = {
  ALL: "all",
  DRAFT: "draft",
  ARCHIVED: "archived",
  PUBLISHED: "published",
} as const;

export const filterNotes = (status: NoteFilterList) =>
  ({
    all: (note: Note) => !!note,
    draft: (note: Note) => note.status === FilterOptions.DRAFT,
    archived: (note: Note) => note.status === FilterOptions.ARCHIVED,
    published: (note: Note) => note.status === FilterOptions.PUBLISHED,
  }[status]);

export const filterLists: { value: FilterOption; label: string; className: string }[] = [
  { value: FilterOptions.ALL, label: "All", className: "text-blue-500" },
  { value: FilterOptions.PUBLISHED, label: "Published", className: "text-emerald-600" },
  { value: FilterOptions.DRAFT, label: "Draft", className: "text-amber-500" },
  { value: FilterOptions.ARCHIVED, label: "Archived", className: "text-gray-500" },
];
