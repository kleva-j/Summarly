"use client";

import type { PropsWithChildren } from "react";

import { DashboardStateMachine } from "@/model/machines";
import { createActorContext } from "@xstate/react";

export const DashboardStateContext = createActorContext(DashboardStateMachine);

export const DashboardContextProvider = ({ children }: PropsWithChildren) => {
	return (
		<DashboardStateContext.Provider>{children}</DashboardStateContext.Provider>
	);
};
