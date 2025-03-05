import {
  type DashboardStateEvents,
  type NoteStateContextType,
  type NoteStateEventsType,
  type DashboardState,
  type AppStateEvents,
  type AppState,
  type Note,
  DashboardStateActions,
  NoteStateActions,
  AppStateActions,
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
    [NoteStateActions.SELECT_NOTE]: {
      actions: assign({
        selectedNote: ({ context, event }) =>
          context.notes.has(event.payload)
            ? (context.notes.get(event.payload) as Note)
            : null,
      }),
    },
    [NoteStateActions.CREATE_NOTE]: {
      actions: assign({
        notes: ({ context, event }) =>
          context.notes.set(event.payload.id, event.payload),
      }),
    },
    [NoteStateActions.SET_ACTIVE_NOTE_ID]: {
      actions: assign({ activeNoteId: ({ event }) => event.payload }),
    },
    [NoteStateActions.UPDATE_NOTE]: {
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
    [NoteStateActions.DELETE_NOTE]: {
      actions: assign({
        notes: ({ context, event }) => {
          context.notes.delete(event.payload);
          return context.notes;
        },
      }),
    },
    [NoteStateActions.SET_LOADING]: { actions: assign({ loading: ({ event }) => event.payload }) },
    [NoteStateActions.SET_ERROR]: { actions: assign({ error: ({ event }) => event.payload }) },
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
    [AppStateActions.SET_ERROR]: { actions: assign({ error: ({ event }) => event.payload }) },
    [AppStateActions.SET_THEME]: { actions: assign({ theme: ({ event }) => event.payload }) },
    [AppStateActions.SET_LOADING]: { actions: assign({ loading: ({ event }) => event.payload }) },
    [AppStateActions.SET_LANGUAGE]: { actions: assign({ language: ({ event }) => event.payload }) },
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
    [DashboardStateActions.SET_ERROR]: { actions: assign({ error: ({ event }) => event.payload }) },
    [DashboardStateActions.SET_LOADING]: { actions: assign({ loading: ({ event }) => event.payload }) },
    [DashboardStateActions.SET_DATE_RANGE]: { actions: assign({ dateRange: ({ event }) => event.payload }) },
    [DashboardStateActions.SET_ACTIVE_TAB]: { actions: assign({ activeTab: ({ event }) => event.payload }) },
  },
});
