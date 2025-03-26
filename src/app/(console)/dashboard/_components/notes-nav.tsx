import type { PropsWithChildren } from "react";
import type { Note } from "@/model/types";

import { TimeLineComponent } from "@/dashboard/_components/note-timeline";
import { MobileTimeline } from "@/dashboard/_components/mobile-timeline";

import { useIsMobile } from "@/hooks/use-mobile";
import { Label } from "@/components/ui/label";
import { useId } from "react";

type NotesNavProps = PropsWithChildren & { noteId?: Note["_id"] };

export function NotesNav(props: NotesNavProps) {
	const { children, noteId } = props;

	const isMobile = useIsMobile();
	const id = useId();

	return (
		<nav className="flex gap-2 justify-between">
			<div className="*:not-first:mt-2 w-fit flex gap-2 items-center">
				<Label htmlFor={id}>Status</Label>
				{children}
			</div>

			{isMobile && noteId && (
				<MobileTimeline>
					<TimeLineComponent noteId={noteId} />
				</MobileTimeline>
			)}
		</nav>
	);
}
