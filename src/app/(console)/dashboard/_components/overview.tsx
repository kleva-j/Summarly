import type { SharedProps } from "@/app/(console)/dashboard/_components/tabs";
import type { FC } from "react";

import {
	CardDescription,
	CardContent,
	CardHeader,
	CardTitle,
	Card,
} from "@/components/ui/card";

import { UsageOverview } from "./usage-chart";
import { RecentSales } from "./recent-sales";

export const Overview: FC<SharedProps> = () => {
	return (
		<div className="flex flex-col gap-4">
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<div className="flex gap-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Recordings</CardTitle>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="h-4 w-4 text-muted-foreground"
							>
								<title>Recordings</title>
								<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
							</svg>
						</CardHeader>
						<CardContent className="flex flex-col justify-between gap-3">
							<div className="text-2xl font-bold">234</div>
							<p className="text-xs text-muted-foreground">
								+20.1% from last month
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Notes</CardTitle>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="h-4 w-4 text-muted-foreground"
							>
								<title>Notes</title>
								<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
							</svg>
						</CardHeader>
						<CardContent className="flex flex-col justify-between gap-3">
							<div className="text-2xl font-bold">334</div>
							<p className="text-xs text-muted-foreground">
								+20.1% from last month
							</p>
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Generated Action-Items
						</CardTitle>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							className="h-4 w-4 text-muted-foreground"
						>
							<title>Subscriptions</title>
							<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
							<circle cx="9" cy="7" r="4" />
							<path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
						</svg>
					</CardHeader>
					<CardContent className="flex flex-col justify-between gap-3">
						<div className="text-2xl font-bold">+2350</div>
						<p className="text-xs text-muted-foreground">
							+180.1% from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Generated Transcriptions
						</CardTitle>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							className="h-4 w-4 text-muted-foreground"
						>
							<title>Sales</title>
							<rect width="20" height="14" x="2" y="5" rx="2" />
							<path d="M2 10h20" />
						</svg>
					</CardHeader>
					<CardContent className="flex flex-col justify-between gap-3">
						<div className="text-2xl font-bold">+12,234</div>
						<p className="text-xs text-muted-foreground">
							+19% from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Generated Summaries
						</CardTitle>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							className="h-4 w-4 text-muted-foreground"
						>
							<title>Active Now</title>
							<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
						</svg>
					</CardHeader>
					<CardContent className="flex flex-col justify-between gap-3">
						<div className="text-2xl font-bold">+573</div>
						<p className="text-xs text-muted-foreground">
							+201 since last hour
						</p>
					</CardContent>
				</Card>
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
