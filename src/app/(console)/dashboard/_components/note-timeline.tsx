import type { Note } from "@/model/types";

import {
	TimelineSeparator,
	TimelineIndicator,
	TimelineContent,
	TimelineHeader,
	TimelineTitle,
	TimelineItem,
	TimelineDate,
	Timeline,
} from "@/components/ui/timeline";

import { Text } from "@/components/ui/typography";
import { motion } from "framer-motion";

const items = [
	{
		id: 1,
		date: "15 minutes ago",
		title: "Pull Request Submitted",
		description:
			"Submitted PR #342 with new feature implementation. Waiting for code review from team leads.",
	},
	{
		id: 2,
		date: "10 minutes ago",
		title: "CI Pipeline Started",
		description:
			"Automated tests and build process initiated. Running unit tests and code quality checks.",
	},
	{
		id: 3,
		date: "5 minutes ago",
		title: "Code Review Feedback",
		description:
			"Received comments on PR. Minor adjustments needed in error handling and documentation.",
	},
	{
		id: 4,
		title: "Changes Pushed",
		description:
			"Implemented requested changes and pushed updates to feature branch. Awaiting final approval.",
	},
];

type NoteTimelineProps = {
	selectedNote: Note | undefined;
};

export function NoteTimeline({ selectedNote }: NoteTimelineProps) {
	if (!selectedNote) return null;

	return (
		<motion.div
			className="flex flex-col gap-2 py-4 max-w-sm"
			exit={{ opacity: 0, x: 30 }}
			animate={{ opacity: 1, x: 0 }}
			initial={{ opacity: 0, x: -30 }}
			transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
		>
			<Text as="h3" className="text-xs mb-2 font-medium text-muted-foreground">
				Activity
			</Text>
			<Timeline defaultValue={3}>
				{items.map((item) => (
					<TimelineItem key={item.id} step={item.id}>
						<TimelineHeader>
							<TimelineSeparator />
							<TimelineTitle className="-mt-0.5">{item.title}</TimelineTitle>
							<TimelineIndicator />
						</TimelineHeader>
						<TimelineContent>
							{item.description}
							<TimelineDate className="mt-2 mb-0">{item.date}</TimelineDate>
						</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		</motion.div>
	);
}
