import type {
  NoteListGroup,
  FilterOption,
  NoteStatus,
  NoteId,
} from "@/model/types";

import { filterLists, filterNotes, FilterOptions } from "@/model/constant";
import { NoteDetails } from "@/notes/_components/note-details";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { NoContent } from "@/_components/no-content";
import { useCallback, useId, useMemo } from "react";
import { NoteItem } from "@/_components/noteitem";
import { NoteList } from "@/_components/notelist";
import { groupNotesById } from "@/lib/constants";

import {
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
  Select,
} from "@/components/ui/select";

type NotesProps = { notes: NoteListGroup };

export const Notes = ({ notes }: NotesProps) => {
  const { ids, groups } = notes;

  const [filter, setFilter] = useQueryState(
    "filter",
    parseAsStringEnum<FilterOption>(Object.values(FilterOptions)).withDefault(
      FilterOptions.ALL
    )
  );

  const [selectedId, setNoteId] = useQueryState("noteId");

  const handleFilterChange = useCallback(
    (filter: NoteStatus) => setFilter(filter),
    [setFilter]
  );

  const handleNoteClick = useCallback(
    (noteId: NoteId) => setNoteId(noteId),
    [setNoteId]
  );

  const removeSelectedNote = useCallback(() => setNoteId(null), [setNoteId]);

  const filteredNotes = useMemo(
    () =>
      groupNotesById(Array.from(groups.values()).filter(filterNotes(filter))),
    [filter, groups]
  );

  const handleDelete = useCallback(() => {
    console.log("handleDelete");
  }, []);

  const id = useId();

  const selectedNote = useMemo(
    () => groups.get((selectedId ?? "") as NoteId),
    [selectedId, groups]
  );

  return (
    <div className="bg-slate-100 dark:bg-zinc-950 rounded-md min-h-[calc(100vh_-_theme(spacing.64))] p-4 flex justify-center">
      <div className="flex flex-col gap-3 w-full">
        {ids.length > 0 ? (
          <>
            <nav className="flex gap-2 justify-between">
              <Select defaultValue={filter} onValueChange={handleFilterChange}>
                <SelectTrigger
                  id={id}
                  className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 focus:ring-1 focus:ring-offset-1 w-fit"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0">
                  {filterLists.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      <span className="flex items-center gap-2">
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 8 8"
                          aria-hidden="true"
                          fill="currentColor"
                          className={item.className}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="4" cy="4" r="4" />
                        </svg>
                        <span className="truncate">{item.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </nav>
            <NoteList
              items={Array.from(filteredNotes.groups.values())}
              renderItems={(note) => (
                <NoteItem
                  selected={note._id === selectedId}
                  onClick={handleNoteClick}
                  handleDelete={handleDelete}
                  key={note._id}
                  {...note}
                />
              )}
            />
            <NoteDetails
              isOpen={!!selectedId}
              close={removeSelectedNote}
              selectedNote={selectedNote}
            />
          </>
        ) : (
          <NoContent
            data={{
              textHeading: "You haven't created any notes yet.",
              textBody: "Start creating your first note.",
            }}
          />
        )}
      </div>
    </div>
  );
};
