import type { DashboardState } from "@/model/types";

type DashboardStateSelector<T extends keyof DashboardState> = (state: {
	context: DashboardState;
}) => DashboardState[T];

export const selectDateRange: DashboardStateSelector<"dateRange"> = ({
	context,
}) => context.dateRange;
export const selectActiveTab: DashboardStateSelector<"activeTab"> = ({
	context,
}) => context.activeTab;

export const selectLoading: DashboardStateSelector<"loading"> = ({ context }) =>
	context.loading;

export const selectError: DashboardStateSelector<"error"> = ({ context }) =>
	context.error;
