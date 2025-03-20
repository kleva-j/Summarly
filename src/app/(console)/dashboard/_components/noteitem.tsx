import type { Note, NoteId } from "@/model/types";

import { Text } from "@/components/ui/typography";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type NoteItemProps = Note & {
	selected: boolean;
	onClick: (noteId: NoteId) => void;
};

export const NoteItem = (props: NoteItemProps) => {
	const { _id, title, onClick, selected } = props;

	return (
		<motion.div
			layout
			exit={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			initial={{ opacity: 0, x: -50 }}
			transition={{ duration: 0.6, type: "spring" }}
			className={cn(
				"relative flex flex-col py-2 px-4 gap-2 group rounded-md border bg-card text-card-foreground shadow-sm cursor-pointer",
				selected && "border-blue-800/50",
			)}
		>
			<Text as="h4" className={cn("text-sm font-normal line-clamp-2", selected && "text-blue-700")}>
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<span className="absolute inset-0" onClick={() => onClick(_id)} />
				{title}
			</Text>
		</motion.div>
	);
};
