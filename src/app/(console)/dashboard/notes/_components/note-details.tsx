import type { Note } from "@/model/types";

import { sampleNoteTimeline } from "@/lib/constants";
import { Button } from "@/components/ui/button";

import {
  TableOfContents,
  GitPullRequest,
  ReceiptText,
  ScanText,
  Headset,
} from "lucide-react";

import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion";

import {
  SheetDescription,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetClose,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";

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

import MediaThemeTailwindAudio from "player.style/tailwind-audio/react";

interface Props {
  isOpen: boolean;
  selectedNote: Note | undefined;
  close: (isOpen: boolean) => void;
}

export function NoteDetails({ isOpen, selectedNote, close }: Props) {
  const { title, summary, transcription, audioFileUrl } = selectedNote || {};

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>{title || "Lorem ipsum dolor sit amet"}</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you are done.
          </SheetDescription>
        </SheetHeader>

        <Accordion
          className="w-full -space-y-px"
          defaultValue="summary"
          type="single"
          collapsible
        >
          <AccordionItem
            value="summary"
            className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
          >
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">
              <span className="flex items-center gap-3">
                <ScanText
                  size={16}
                  className="shrink-0 opacity-60"
                  aria-hidden="true"
                />
                <span>Summary</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground ps-7 pb-2">
              {summary || "No Summary generated"}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="transcription"
            className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
          >
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">
              <span className="flex items-center gap-3">
                <ReceiptText
                  size={16}
                  className="shrink-0 opacity-60"
                  aria-hidden="true"
                />
                <span>Transcription</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground ps-7 pb-2">
              {transcription || "No Transcription generated"}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="audioFileUrl"
            className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
          >
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">
              <span className="flex items-center gap-3">
                <Headset
                  size={16}
                  className="shrink-0 opacity-60"
                  aria-hidden="true"
                />
                <span>AudioFile Recording</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground ps-7 pb-2">
              {audioFileUrl ? (
                <MediaThemeTailwindAudio style={{ width: "100%" }}>
                  <audio
                    slot="media"
                    src={audioFileUrl}
                    playsInline
                    crossOrigin="anonymous"
                  />
                </MediaThemeTailwindAudio>
              ) : (
                "No AudioFile Recording"
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="timeline"
            className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
          >
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">
              <span className="flex items-center gap-3">
                <GitPullRequest
                  size={16}
                  className="shrink-0 opacity-60"
                  aria-hidden="true"
                />
                <span>Note Timeline</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground ps-7 pb-2">
              <Timeline defaultValue={3}>
                {sampleNoteTimeline.map((item) => (
                  <TimelineItem key={item.id} step={item.id}>
                    <TimelineHeader>
                      <TimelineSeparator />
                      <TimelineTitle className="-mt-0.5">
                        {item.title}
                      </TimelineTitle>
                      <TimelineIndicator />
                    </TimelineHeader>
                    <TimelineContent>
                      {item.description}
                      <TimelineDate className="mt-2 mb-0">
                        {item.date}
                      </TimelineDate>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="actionItems"
            className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
          >
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">
              <span className="flex items-center gap-3">
                <TableOfContents
                  size={16}
                  className="shrink-0 opacity-60"
                  aria-hidden="true"
                />
                <span>Action Items</span>
              </span>
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
                  : Write down a positive affirmation and put it somewhere
                  you&apos;ll see it every day.
                </li>
                <li>
                  <span className="font-medium">Take a 10-minute break*</span>:
                  Take a 10-minute break each day to stretch, move your body,
                  and refresh your mind.
                </li>
                <li>
                  <span className="font-medium">Celebrate your wins*</span>:
                  Take time each day to reflect on your accomplishments and
                  celebrate your wins.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
