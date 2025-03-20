import type { Note } from "@/model/types";

import {
	AccordionTrigger,
	AccordionContent,
	AccordionItem,
	Accordion,
} from "@/components/ui/accordion";

type NoteDetailsProps = { selectedNote: Note | undefined };

export const NoteDetails = ({ selectedNote }: NoteDetailsProps) => {
	if (!selectedNote) return null;

	const { title, summary, transcription, audioFileUrl } = selectedNote;

	return (
		<div className="flex flex-col gap-2 flex-1 py-4">
			<Accordion
				className="w-full space-y-2"
				defaultValue="title"
				type="single"
				collapsible
			>
				<AccordionItem
					value="title"
					className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
				>
					<AccordionTrigger className="justify-start gap-3 py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0 [&>svg]:-order-1">
						Title
					</AccordionTrigger>
					<AccordionContent className="text-muted-foreground ps-7 pb-2">
						{title || "No Title generated"}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem
					value="summary"
					className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
				>
					<AccordionTrigger className="justify-start gap-3 py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0 [&>svg]:-order-1">
						Summary
					</AccordionTrigger>
					<AccordionContent className="text-muted-foreground ps-7 pb-2">
						{summary || "No Summary generated"}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem
					value="transcription"
					className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
				>
					<AccordionTrigger className="justify-start gap-3 py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0 [&>svg]:-order-1">
						Transcription
					</AccordionTrigger>
					<AccordionContent className="text-muted-foreground ps-7 pb-2">
						{transcription || "No Transcription generated"}
					</AccordionContent>
				</AccordionItem>

				<AccordionItem
					value="audioFileUrl"
					className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
				>
					<AccordionTrigger className="justify-start gap-3 py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0 [&>svg]:-order-1">
						AudioFile Recording
					</AccordionTrigger>
					<AccordionContent className="text-muted-foreground ps-7 pb-2">
						{audioFileUrl || "No AudioFile Recording"}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem
					value="actionItems"
					className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
				>
					<AccordionTrigger className="justify-start gap-3 py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0 [&>svg]:-order-1">
						Action Items
					</AccordionTrigger>
					<AccordionContent className="text-muted-foreground ps-7 pb-2">
						<ul className="flex flex-col gap-2 list-disc">
							<li>
								<span className="font-medium">Set a daily goal*</span>: Take 5
								minutes each morning to set a daily goal for yourself.
							</li>
							<li>
								<span className="font-medium">
									Create a positive affirmation*
								</span>
								: Write down a positive affirmation and put it somewhere you'll
								see it every day.
							</li>
							<li>
								<span className="font-medium">Take a 10-minute break*</span>:
								Take a 10-minute break each day to stretch, move your body, and
								refresh your mind.
							</li>
							<li>
								<span className="font-medium">Celebrate your wins*</span>: Take
								time each day to reflect on your accomplishments and celebrate
								your wins.
							</li>
						</ul>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};
