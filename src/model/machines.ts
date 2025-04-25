import {
  type ElevenLabTTSStateEvents,
  type DashboardStateEvents,
  type NoteStateContextType,
  type NoteStateEventsType,
  type ElevenLabsTTSstate,
  type DashboardState,
  type AppStateEvents,
  type AppState,
  type Note,
  ElevenLabsTTSStateActions,
  DashboardStateActions,
  NoteStateActions,
  AppStateActions,
} from "@/model/types";

import { createAudioStreamFromText, getVoices } from "@/utils/elevenlabs";
import { APPSTATE, DASHBOARDSTATE, NOTESTATE } from "@/model/constant";
import { setup, assign, fromPromise } from "xstate";

export const NotesStateMachine = setup({
  types: {
    context: {} as NoteStateContextType,
    events: {} as NoteStateEventsType,
  },
  actors: {
    fetchNotes: fromPromise(() => Promise.resolve(new Map())),
  },
}).createMachine({
  initial: "idle",
  context: NOTESTATE,
  states: {
    idle: {
      on: {
        [NoteStateActions.FETCH_NOTES]: { target: "loading" },
      },
    },
    loading: {
      invoke: {
        id: "fetchNotes",
        src: "fetchNotes",
        onDone: {
          target: "success",
          actions: assign({ notes: ({ event }) => event.output }),
        },
        onError: { target: "failure" },
      },
    },
    success: {
      entry: assign({ error: () => null, loading: () => false }),
    },
    failure: {
      entry: assign({ error: () => "Error occurred.", loading: () => false }),
      on: { [NoteStateActions.RETRY_FETCH]: { target: "loading" } },
      exit: assign({ error: () => null }),
    },
  },
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
          context.notes.set(event.payload._id, event.payload),
      }),
    },
    [NoteStateActions.SET_ACTIVE_NOTE_ID]: {
      actions: assign({ activeNoteId: ({ event }) => event.payload }),
    },
    [NoteStateActions.UPDATE_NOTE]: {
      actions: assign({
        notes: ({ context, event }) => {
          const note = context.notes.has(event.payload._id)
            ? (context.notes.get(event.payload._id) as Note)
            : null;
          if (!note) return context.notes;
          return context.notes.set(note._id, event.payload);
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
    [NoteStateActions.SET_LOADING]: {
      actions: assign({ loading: ({ event }) => event.payload }),
    },
    [NoteStateActions.SET_ERROR]: {
      actions: assign({ error: ({ event }) => event.payload }),
    },
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
    [AppStateActions.SET_ERROR]: {
      actions: assign({ error: ({ event }) => event.payload }),
    },
    [AppStateActions.SET_THEME]: {
      actions: assign({ theme: ({ event }) => event.payload }),
    },
    [AppStateActions.SET_LOADING]: {
      actions: assign({ loading: ({ event }) => event.payload }),
    },
    [AppStateActions.SET_LANGUAGE]: {
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
    [DashboardStateActions.SET_ERROR]: {
      actions: assign({ error: ({ event }) => event.payload }),
    },
    [DashboardStateActions.SET_LOADING]: {
      actions: assign({ loading: ({ event }) => event.payload }),
    },
    [DashboardStateActions.SET_DATE_RANGE]: {
      actions: assign({ dateRange: ({ event }) => event.payload }),
    },
    [DashboardStateActions.SET_ACTIVE_TAB]: {
      actions: assign({ activeTab: ({ event }) => event.payload }),
    },
  },
});

export const ElevenLabsTTSMachine = setup({
  types: {
    context: {} as ElevenLabsTTSstate,
    events: {} as ElevenLabTTSStateEvents,
  },
  actors: {
    fetchVoices: fromPromise(getVoices),
    submitAudio: fromPromise(
      ({ input }: { input: { text: string; voice: string } }) =>
        createAudioStreamFromText(input.text, input.voice)
    ),
  },
}).createMachine({
  id: "elevenlabs-tts",
  initial: "idle",
  context: {
    error: null,
    audio: null,
    status: "",
    voices: [],
    voice: "",
    text: "",
  },
  states: {
    idle: {
      on: {
        [ElevenLabsTTSStateActions.SUBMIT_AUDIO]: {
          target: "loading",
          actions: assign({ status: () => "Analysing Text" }),
          guard: ({ context, event }) => {
            const { text, voice } = event.payload;
            const { voices } = context;

            return (
              text.length > 0 &&
              voices.find((item) => item.voice_id === voice) !== undefined
            );
          },
        },
        [ElevenLabsTTSStateActions.SET_VOICES]: {
          actions: assign({ voices: ({ event }) => event.payload }),
        },
      },
    },
    loading: {
      invoke: {
        id: "submitAudio",
        src: "submitAudio",
        input: ({ event }) => {
          const { payload } = event as {
            payload: { text: string; voice: string };
          };
          return { text: payload.text, voice: payload.voice };
        },
        onDone: {
          target: "success",
          actions: assign({
            audio: ({ event }) => event.output,
            status: "Success",
          }),
        },
        onError: {
          target: "failure",
          actions: assign({
            error: "Failed to create audio stream",
            status: "Error",
          }),
        },
      },
    },
    success: {},
    failure: {
      on: {
        [ElevenLabsTTSStateActions.RETRY_FETCH]: { target: "loading" },
      },
    },
  },
});
