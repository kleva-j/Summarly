import type {
  DashboardStateEvents,
  NoteStateContextType,
  NoteStateEventsType,
  DashboardState,
  AppStateEvents,
  AppState,
  Note,
} from "@/model/types";

import { APPSTATE, DASHBOARDSTATE, NOTESTATE } from "@/model/constant";
import { setup, assign } from "xstate";

export const NotesStateMachine = setup({
  types: {
    context: {} as NoteStateContextType,
    events: {} as NoteStateEventsType,
  },
}).createMachine({
  context: NOTESTATE,
  on: {
    SELECT_NOTE: {
      actions: assign({
        selectedNote: ({ context, event }) =>
          context.notes.has(event.payload)
            ? (context.notes.get(event.payload) as Note)
            : null,
      }),
    },
    CREATE_NOTE: {
      actions: assign({
        notes: ({ context, event }) =>
          context.notes.set(event.payload.id, event.payload),
      }),
    },
    SET_ACTIVE_NOTE_ID: {
      actions: assign({ activeNoteId: ({ event }) => event.payload }),
    },
    UPDATE_NOTE: {
      actions: assign({
        notes: ({ context, event }) => {
          const note = context.notes.has(event.payload.id)
            ? (context.notes.get(event.payload.id) as Note)
            : null;
          if (!note) return context.notes;
          return context.notes.set(note.id, event.payload);
        },
      }),
    },
    DELETE_NOTE: {
      actions: assign({
        notes: ({ context, event }) => {
          context.notes.delete(event.payload);
          return context.notes;
        },
      }),
    },
    SET_LOADING: { actions: assign({ loading: ({ event }) => event.payload }) },
    SET_ERROR: { actions: assign({ error: ({ event }) => event.payload }) },
  },
});

export const AppStateMachine = setup({
  types: {
    context: {} as AppState,
    events: {} as AppStateEvents,
  },
}).createMachine({
  context: APPSTATE,
  on: {
    SET_ERROR: { actions: assign({ error: ({ event }) => event.payload }) },
    SET_THEME: { actions: assign({ theme: ({ event }) => event.payload }) },
    SET_LOADING: { actions: assign({ loading: ({ event }) => event.payload }) },
    SET_LANGUAGE: {
      actions: assign({ language: ({ event }) => event.payload }),
    },
  },
});

export const DashboardStateMachine = setup({
  types: {
    context: {} as DashboardState,
    events: {} as DashboardStateEvents,
  },
}).createMachine({
  context: DASHBOARDSTATE,
  on: {
    SET_ERROR: { actions: assign({ error: ({ event }) => event.payload }) },
    SET_LOADING: { actions: assign({ loading: ({ event }) => event.payload }) },
    SET_DATE_RANGE: { actions: assign({ dateRange: ({ event }) => event.payload }) },
    SET_ACTIVE_TAB: { actions: assign({ activeTab: ({ event }) => event.payload }) },
  },
});
