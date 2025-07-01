import type { Result, Note, NoteId } from "@/model/types";
import type { FunctionReturnType } from "convex/server";
import type { Preloaded } from "convex/react";

import { fetchQuery, fetchMutation, preloadQuery } from "convex/nextjs";
import { BaseDataAccess } from "@/data-access/base";
import { api } from "@/convex/_generated/api";

export class NotesDataAccess extends BaseDataAccess {
  async deleteNote(userId: string, noteId: NoteId): Promise<Result<void>> {
    return this.validateAndExecute(userId, ["delete_note"], async () => {
      await fetchMutation(api.notes.remove, { id: noteId }, this.authConfig);
      return undefined;
    });
  }

  async getNote(userId: string, noteId: NoteId): Promise<Result<Note>> {
    return this.validateAndExecute(userId, ["read_notes"], async () => {
      const note = await fetchQuery(
        api.notes.getOneByUser,
        { noteId },
        this.authConfig
      );
      return note;
    });
  }

  async preloadNotes(
    userId: string
  ): Promise<Result<Preloaded<typeof api.notes.getAllByUser>>> {
    return this.validateAndExecute(userId, ["read_notes"], async () => {
      const notes = await preloadQuery(
        api.notes.getAllByUser,
        {},
        this.authConfig
      );
      return notes;
    });
  }

  async preloadPaginatedNotes(
    userId: string,
    pagination?: { initialNumItems?: number; cursor?: string }
  ): Promise<Result<Preloaded<typeof api.notes.getPaginatedNotesByUser>>> {
    return this.validateAndExecute(userId, ["read_notes"], async () => {
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

  async getAllNotes(
    userId: string
  ): Promise<Result<FunctionReturnType<typeof api.notes.getAllByUser>>> {
    return this.validateAndExecute(userId, ["read_notes"], async () => {
      const notes = await fetchQuery(
        api.notes.getAllByUser,
        {},
        this.authConfig
      );
      return notes;
    });
  }

  async getPaginatedNotes(
    userId: string,
    pagination?: { initialNumItems?: number; cursor?: string }
  ): Promise<
    Result<FunctionReturnType<typeof api.notes.getPaginatedNotesByUser>>
  > {
    return this.validateAndExecute(userId, ["read_notes"], async () => {
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
