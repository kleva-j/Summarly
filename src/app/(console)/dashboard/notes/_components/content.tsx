"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { groupNotesById } from "@/lib/constants";
import { api } from "@/convex/_generated/api";
import { useMemo } from "react";

import dynamic from "next/dynamic";

const Notes = dynamic(
  async () => (await import("../../_components/notes")).Notes,
  { ssr: false }
);

interface NoteContentProps {
  preloadedNotes: Preloaded<typeof api.notes.getNotesByUser>;
}

export function NoteContent({ preloadedNotes }: NoteContentProps) {
  const notes = usePreloadedQuery(preloadedNotes);

  const formattedNotes = useMemo(() => groupNotesById(notes), [notes]);

  return <Notes notes={formattedNotes} />;
}
