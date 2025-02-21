"use client";

import type { DateRange } from "react-day-picker";

import { type DashboardTabs, DashboardStateActions } from "@/model/types";

import { TabularLayout } from "@/app/(console)/dashboard/_components/tabs";
import { DashboardStateContext } from "@/components/providers/dashboard";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Text } from "@/components/ui/typography";

import {
	selectActiveTab,
	selectDateRange,
} from "@/components/selectors/dashboard";

const { SET_DATE_RANGE, SET_ACTIVE_TAB } = DashboardStateActions;

export const Component = () => {
	const dateRange = DashboardStateContext.useSelector(selectDateRange);
	const activeTab = DashboardStateContext.useSelector(selectActiveTab);

	const actorRef = DashboardStateContext.useActorRef();

	const setDateRange = (date: DateRange | undefined) => {
		actorRef.send({ type: SET_DATE_RANGE, payload: date });
	};

	function handleTabChange(value: DashboardTabs | string): void {
		actorRef.send({ type: SET_ACTIVE_TAB, payload: value as DashboardTabs });
	}

	return (
		<div className="flex-1 space-y-4 md:px-8">
			<div className="flex md:items-center justify-between flex-col md:flex-row gap-4">
				<Text as="h2" className="text-3xl font-bold tracking-tight">
					Dashboard
				</Text>
				<div className="flex items-start xs:items-center max-xs:space-y-4 xs:space-x-2 flex-col xs:flex-row">
					<DateRangePicker setDateRange={setDateRange} dateRange={dateRange} />
				</div>
			</div>

			<TabularLayout activeTab={activeTab} handleTabChange={handleTabChange} />
		</div>
	);
};
