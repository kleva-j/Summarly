"use client";

import type { PropsWithChildren } from "react";

import { createActorContext } from "@xstate/react";
import { AppStateMachine } from "@/model/machines";

export const AppStateContext = createActorContext(AppStateMachine);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <AppStateContext.Provider>
      {children}
    </AppStateContext.Provider>
  );
};
