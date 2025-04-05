import type { PropsWithChildren } from "react";
import type { Note } from "@/model/types";

import { TimeLineComponent } from "@/dashboard/_components/note-timeline";
import { MobileTimeline } from "@/dashboard/_components/mobile-timeline";
import { useIsMobile } from "@/hooks/use-mobile";

type NotesNavProps = PropsWithChildren & { noteId?: Note["_id"] };

export function NotesNav(props: NotesNavProps) {
	const { children, noteId } = props;

	const isMobile = useIsMobile();

	return (
		<nav className="flex gap-2 justify-between">
			{children}

			{isMobile && noteId && (
				<MobileTimeline>
					<TimeLineComponent noteId={noteId} />
				</MobileTimeline>
			)}
		</nav>
	);
}
