"use client";

import type { DateRange } from "react-day-picker";

import { DashboardStateContext } from "@/components/providers/dashboard";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { selectDateRange } from "@/components/selectors/dashboard";
import { DashboardStateActions } from "@/model/types";
import { Text } from "@/components/ui/typography";
import { useCallback } from "react";

const { SET_DATE_RANGE } = DashboardStateActions;

export const DashboardHeader = () => {
	const dateRange = DashboardStateContext.useSelector(selectDateRange);

	const actorRef = DashboardStateContext.useActorRef();

	const setDateRange = useCallback(
		(date: DateRange | undefined) => {
			actorRef.send({ type: SET_DATE_RANGE, payload: date });
		},
		[actorRef],
	);

	return (
		<div className="flex md:items-center justify-between flex-col md:flex-row gap-4">
			<Text as="h2" className="text-3xl font-bold tracking-tight">
				Dashboard
			</Text>
			<div className="flex items-start xs:items-center max-xs:space-y-4 xs:space-x-2 flex-col xs:flex-row">
				<DateRangePicker setDateRange={setDateRange} dateRange={dateRange} />
			</div>
		</div>
	);
};
