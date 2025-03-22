import {
  type AppStateVersion,
  type DashboardState,
  type NoteVersion,
  type NoteState,
  type AppState,
  type Note,
  DashboardTabs,
  Themes,
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
