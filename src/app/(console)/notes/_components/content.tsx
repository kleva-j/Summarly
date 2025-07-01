"use client";

import type { FunctionReturnType } from "convex/server";
import type { api } from "@/convex/_generated/api";

import { groupNotesById } from "@/lib/constants";
import { useMemo } from "react";

import dynamic from "next/dynamic";

const Notes = dynamic(
  async () => (await import("../_components/notes")).Notes,
  { ssr: false }
);

interface NoteContentProps {
  notes: FunctionReturnType<typeof api.notes.getAllByUser>;
}

export function NoteContent({ notes }: NoteContentProps) {
  const formattedNotes = useMemo(() => groupNotesById(notes), [notes]);

  return <Notes notes={formattedNotes} />;
}
