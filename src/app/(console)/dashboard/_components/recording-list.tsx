import type { PropsWithChildren, ReactNode } from "react";
import type { Recording } from "@/model/types";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RecordingListProps<T> extends PropsWithChildren {
	items: T[];
	renderItems: (item: T) => ReactNode;
}

export const RecordingList = <T extends Recording>(
	props: RecordingListProps<T>,
) => {
	const { items = [], renderItems } = props;

	return (
		<motion.section
			className={cn(
				"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-2 w-full h-min",
				items.length === 0 && "hidden",
			)}
		>
			<AnimatePresence mode="popLayout">
				{items.map(renderItems)}
			</AnimatePresence>
		</motion.section>
	);
};
