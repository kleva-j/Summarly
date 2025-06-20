import type { RecordingId, RecordingListGroup } from "@/model/types";
import type { SharedProps } from "@/dashboard/_components/tabs";

import { CreateRecording } from "@/dashboard/_components/create-recording";
import { RecordingList } from "@/dashboard/_components/recording-list";
import { RecordingItem } from "@/dashboard/_components/recording-item";
import { NoContent } from "@/dashboard/_components/no-content";
import { useQueryState, parseAsStringLiteral } from "nuqs";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useCallback } from "react";

type RecordingProps = SharedProps & { recordings: RecordingListGroup };

export const RecordingTab = ({ recordings }: RecordingProps) => {
  const { ids, groups } = recordings;

  const [selectedId, setRecordingId] = useQueryState(
    "audiofile",
    parseAsStringLiteral<RecordingId>(ids).withDefault(ids[0])
  );

  const handleClick = useCallback(
    (id: RecordingId) => setRecordingId(id),
    [setRecordingId]
  );

  return (
    <div className="bg-slate-100 dark:bg-zinc-950 rounded-md min-h-[calc(100vh_-_theme(spacing.64))] p-4 flex justify-center">
      {ids.length > 0 ? (
        <RecordingList
          items={Array.from(groups.values())}
          renderItems={(item) => (
            <RecordingItem
              selected={item.id === selectedId}
              onClick={handleClick}
              key={item.id}
              {...item}
            />
          )}
        />
      ) : (
        <NoContent
          data={{
            textHeading: "You haven't created any recordings yet.",
            textBody: "Start creating your first recording.",
            actionLabel: "Create recording",
          }}
        >
          <CreateRecording>
            <Button
              className="aspect-square max-sm:p-0 w-min rounded-lg cursor-pointer"
              variant="outline"
            >
              <PlusIcon
                className="opacity-60 sm:-ms-1"
                aria-hidden="true"
                size={16}
              />
              <span className="max-sm:sr-only">Create recording</span>
            </Button>
          </CreateRecording>
        </NoContent>
      )}
    </div>
  );
};
