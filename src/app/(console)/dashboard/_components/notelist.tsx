import type { Note, NoteId } from "@/model/types";

import { NoteTimeline } from "@/app/(console)/dashboard/_components/note-timeline";
import { NoteDetails } from "@/app/(console)/dashboard/_components/note-details";
import { NoteItem } from "@/app/(console)/dashboard/_components/noteitem";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo } from "react";
import { useQueryState } from "nuqs";
import { cn } from "@/lib/utils";

type NoteListProps = { notes: Note[] };

const noteOptions = { defaultValue: "" };

export const NoteList = ({ notes = [] }: NoteListProps) => {
	const [selectedId, setNoteId] = useQueryState("noteId", noteOptions);

	const handleNoteClick = useCallback(
		(noteId: NoteId) => setNoteId(noteId),
		[setNoteId],
	);

	const selectedNote = useMemo(
		() => notes.find((note) => note._id === selectedId),
		[notes, selectedId],
	);

	return (
		<div className="flex gap-2">
			<motion.section
				className={cn(
					"flex flex-col gap-2 w-full max-w-md py-4",
					notes.length === 0 && "hidden",
				)}
			>
				<AnimatePresence mode="popLayout">
					{notes.map((note) => (
						<NoteItem
							selected={note._id === selectedId}
							onClick={handleNoteClick}
							key={note._id}
							{...note}
						/>
					))}
				</AnimatePresence>
			</motion.section>
			<div className="flex flex-1 px-4 gap-4 rounded background-slate-300/30">
				<NoteDetails selectedNote={selectedNote} />
				<NoteTimeline selectedNote={selectedNote} />
			</div>
		</div>
	);
};

/**
 * Here are short content pieces for each of the topics:

*1. "Spark of Genius: Igniting New Ideas and Perspectives"*

"Sometimes, all it takes is a single spark to ignite a fire of creativity and innovation. Today, take a moment to step back from your routine and ask yourself: what sparks your passion and creativity? What new ideas and perspectives can you bring to the table? Let's ignite our spark of genius and see where it takes us!"

*2. "Mindful Musings: Reflections and Insights for Personal Growth"*

"Mindfulness is the practice of being present in the moment, without judgment. Today, take a few minutes to reflect on your thoughts, feelings, and actions. What can you learn from your experiences? What insights can you gain from your mistakes? Let's cultivate mindfulness and use it as a tool for personal growth and self-awareness."

*3. "Fuel for the Mind: Inspiration and Motivation for Success"*

"Success is not just about achieving our goals, but also about the journey we take to get there. Today, let's focus on fueling our minds with inspiration and motivation. What drives you to succeed? What motivates you to keep pushing forward, even when the going gets tough? Let's tap into our inner strength and use it to propel us towards our dreams."

*4. "The Idea Incubator: Nurturing Creativity and Innovation"*

"Ideas are the seeds of innovation and creativity. Today, let's create a space for our ideas to incubate and grow. What problems do you want to solve? What opportunities do you want to seize? Let's nurture our creativity and bring our ideas to life."

*5. "Reflections and Revelations: Exploring New Thoughts and Experiences"*

"Life is a journey of discovery and growth. Today, take a moment to reflect on your experiences and the lessons you've learned. What new thoughts and insights have you gained? What revelations have you had about yourself and the world around you? Let's explore our thoughts and experiences, and see where they take us."

*6. "The Cerebral Sandbox: Exploring New Ideas and Possibilities"*

"The cerebral sandbox is a space where creativity and imagination know no bounds. Today, let's play in the sandbox and explore new ideas and possibilities. What if we could solve world hunger? What if we could create a sustainable future? Let's dream big and see where our imagination takes us."

*7. "The Mindful Maverick: Challenging Assumptions and Embracing Change"*

"The mindful maverick is someone who challenges assumptions and embraces change. Today, let's be mindful of our thoughts and actions, and challenge ourselves to think differently. What assumptions can we challenge? What changes can we make to improve our lives and the world around us? Let's be bold and take the road less traveled."

*8. "The Inspiration Station: Fueling Creativity and Productivity"*

"The inspiration station is a place where creativity and productivity come together. Today, let's fuel our minds with inspiration and motivation. What inspires you? What motivates you to create and produce? Let's tap into our inner source of inspiration and let our creativity flow."

*9. "The Thought Laboratory: Experimenting with New Ideas and Perspectives"*

"The thought laboratory is a space where we can experiment with new ideas and perspectives. Today, let's conduct an experiment in creativity and innovation. What new ideas can we explore? What perspectives can we challenge? Let's think outside the box and see where our imagination takes us."

*10. "The Personal Growth Journal: Reflecting, Learning, and Evolving"*

"The personal growth journal is a tool for reflection, learning, and evolution. Today, take a moment to reflect on your journey so far. What have you learned? What challenges have you overcome? Let's use our experiences as a catalyst for growth and evolution, and see where our journey takes us next."
 */
