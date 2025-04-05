import type { SharedProps } from "@/dashboard/_components/tabs";
import type { FC } from "react";

import { stats, StatsCard } from "@/dashboard/_components/stats-card";
import { UsageOverview } from "@/dashboard/_components/usage-chart";
import { RecentSales } from "@/dashboard/_components/recent-sales";

import {
	CardDescription,
	CardContent,
	CardHeader,
	CardTitle,
	Card,
} from "@/components/ui/card";

export const Overview: FC<SharedProps> = () => {
	return (
		<div className="flex flex-col gap-4">
			<div className="grid grid-cols-2 min-[1200px]:grid-cols-4 border border-border rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
				{stats.map((stat) => (
					<StatsCard key={stat.title} {...stat} />
				))}
			</div>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
				<Card className="col-span-1 lg:col-span-4">
					<CardHeader>
						<CardTitle>Overview</CardTitle>
					</CardHeader>
					<CardContent className="pl-2">
						<UsageOverview />
					</CardContent>
				</Card>
				<Card className="col-span-1 lg:col-span-3">
					<CardHeader>
						<CardTitle>Recent Sales</CardTitle>
						<CardDescription>You made 265 sales this month.</CardDescription>
					</CardHeader>
					<CardContent>
						<RecentSales />
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
