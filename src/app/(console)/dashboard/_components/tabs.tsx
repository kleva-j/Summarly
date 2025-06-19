"use client";

import type { PropsWithChildren, ReactElement, ReactNode } from "react";

import { type DashboardTabs, DashboardStateActions } from "@/model/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardStateContext } from "@/components/providers/dashboard";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import { selectActiveTab } from "@/components/selectors/dashboard";
import { Badge } from "@/components/ui/badge";
import { Children, useMemo } from "react";

const { SET_ACTIVE_TAB } = DashboardStateActions;

export type SharedProps = {
	title: string;
	count?: number;
	icon: ReactElement;
};

type TabChild = ReactElement<SharedProps & { children: ReactNode }>;

export function TabularLayout({ children }: PropsWithChildren) {
	const activeTab = DashboardStateContext.useSelector(selectActiveTab);

	const actorRef = DashboardStateContext.useActorRef();

	const handleTabChange = (value: DashboardTabs | string) => {
		actorRef.send({ type: SET_ACTIVE_TAB, payload: value as DashboardTabs });
	};

	const TabContents = useMemo(
		() =>
			Children.map(children, (item) => {
				const { props } = item as TabChild;

				return (
					<TabsContent key={props.title} value={props.title}>
						{item}
					</TabsContent>
				);
			}),
		[children],
	);

	const TabPanels = useMemo(
		() =>
			Children.map(children, (item) => {
				const { props } = item as TabChild;

				return (
					<TabsTrigger value={props.title} className="group capitalize">
						{props.icon}
						{props.title}
						{props?.count && props.count > 0 ? (
							<Badge variant="secondary" className="ml-1.5 min-w-5 px-1">
								{props.count}
							</Badge>
						) : null}
					</TabsTrigger>
				);
			}),
		[children],
	);

	return (
		<Tabs
			onValueChange={handleTabChange}
			defaultValue={activeTab}
			value={activeTab}
		>
			<ScrollArea>
				<TabsList className="mb-3">{TabPanels}</TabsList>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
			{TabContents}
		</Tabs>
	);
}
