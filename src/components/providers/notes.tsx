"use client";

import type { PropsWithChildren } from "react";

import { NotesStateMachine } from "@/model/machines";
import { createActorContext } from "@xstate/react";

export const NoteStateContext = createActorContext(NotesStateMachine);

export const NotesContextProvider = ({ children }: PropsWithChildren) => {
	return <NoteStateContext.Provider>{children}</NoteStateContext.Provider>;
};
