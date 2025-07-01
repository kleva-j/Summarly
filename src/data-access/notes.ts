import type { Result, Note, NoteId } from "@/model/types";
import type { FunctionReturnType } from "convex/server";
import type { Preloaded } from "convex/react";

import { fetchQuery, fetchMutation, preloadQuery } from "convex/nextjs";
import { BaseDataAccess } from "@/data-access/base";
import { api } from "@/convex/_generated/api";

export class NotesDataAccess extends BaseDataAccess {
  async deleteNote(noteId: NoteId): Promise<Result<void>> {
    return this.validateAndExecute(async () => {
      await fetchMutation(api.notes.remove, { id: noteId }, this.authConfig);
      return undefined;
    });
  }

  async getNote(noteId: NoteId): Promise<Result<Note>> {
    return this.validateAndExecute(async () => {
      const note = await fetchQuery(
        api.notes.getOneByUser,
        { noteId },
        this.authConfig
      );
      return note;
    });
  }

  async preloadNotes(): Promise<
    Result<Preloaded<typeof api.notes.getAllByUser>>
  > {
    return this.validateAndExecute(async () => {
      const notes = await preloadQuery(
        api.notes.getAllByUser,
        {},
        this.authConfig
      );
      return notes;
    });
  }

  async preloadPaginatedNotes(pagination?: {
    initialNumItems?: number;
    cursor?: string;
  }): Promise<Result<Preloaded<typeof api.notes.getPaginatedNotesByUser>>> {
    return this.validateAndExecute(async () => {
      const result = await preloadQuery(
        api.notes.getPaginatedNotesByUser,
        {
          paginationOpts: {
            numItems: pagination?.initialNumItems ?? 5,
            cursor: pagination?.cursor ?? null,
          },
        },
        this.authConfig
      );
      return result;
    });
  }

  async getAllNotes(): Promise<
    Result<FunctionReturnType<typeof api.notes.getAllByUser>>
  > {
    return this.validateAndExecute(async () => {
      const notes = await fetchQuery(
        api.notes.getAllByUser,
        {},
        this.authConfig
      );
      return notes;
    });
  }

  async getPaginatedNotes(pagination?: {
    initialNumItems?: number;
    cursor?: string;
  }): Promise<
    Result<FunctionReturnType<typeof api.notes.getPaginatedNotesByUser>>
  > {
    return this.validateAndExecute(async () => {
      const result = await fetchQuery(
        api.notes.getPaginatedNotesByUser,
        {
          paginationOpts: {
            numItems: pagination?.initialNumItems ?? 5,
            cursor: pagination?.cursor ?? null,
          },
        },
        this.authConfig
      );
      return result;
    });
  }
}
