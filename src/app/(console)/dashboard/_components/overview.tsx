import type { SharedProps } from "@/app/(console)/dashboard/_components/tabs";
import type { FC } from "react";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";

import {
	CalendarIcon,
	FileTextIcon,
	GlobeIcon,
	InputIcon,
	BellIcon,
} from "@radix-ui/react-icons";

const features = [
	{
		Icon: FileTextIcon,
		name: "Save your files",
		description: "We automatically save your files as you type.",
		href: "/",
		cta: "Learn more",
		className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
	},
	{
		Icon: InputIcon,
		name: "Full text search",
		description: "Search through all your files in one place.",
		href: "/",
		cta: "Learn more",
		className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
	},
	{
		Icon: GlobeIcon,
		name: "Multilingual",
		description: "Supports 100+ languages and counting.",
		href: "/",
		cta: "Learn more",
		className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
	},
	{
		Icon: CalendarIcon,
		name: "Calendar",
		description: "Use the calendar to filter your files by date.",
		href: "/",
		cta: "Learn more",
		className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
	},
	{
		Icon: BellIcon,
		name: "Notifications",
		description:
			"Get notified when someone shares a file or mentions you in a comment.",
		href: "/",
		cta: "Learn more",
		className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
	},
];

export const Overview: FC<SharedProps> = () => {
	return (
		<BentoGrid className="lg:grid-rows-3">
			{features.map((feature) => (
				<BentoCard key={feature.name} {...feature} />
			))}
		</BentoGrid>
	);
};
