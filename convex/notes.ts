import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";

import { sanitizeInput, queryWithUser, mutateWithUser } from "./utils";
import { internalQuery, internalMutation } from "./_generated/server";
import { Notes } from "./schema";

enum NoteStatusEnum {
  DRAFT = "draft",
  ARCHIVED = "archived",
  PUBLISHED = "published",
}

export const getOneByUser = queryWithUser({
  args: { noteId: Notes._id, includeSubTasks: v.optional(v.boolean()) },
  handler: async ({ db, identity }, { noteId }) => {
    const { tokenIdentifier: userId } = identity;

    const note = await db
      .query("notes")
      .filter((q) =>
        q.and(q.eq(q.field("_id"), noteId), q.eq(q.field("userId"), userId))
      )
      .unique();

    return note;
  },
});

export const getAllByUser = queryWithUser({
  args: {},
  handler: async ({ identity, db }) => {
    const { tokenIdentifier: userId } = identity;

    return db
      .query("notes")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .collect();
  },
});

export const getPaginatedNotesByUser = queryWithUser({
  args: { paginationOpts: paginationOptsValidator },
  handler: async ({ db, identity }, { paginationOpts }) => {
    const { tokenIdentifier: userId } = identity;

    const paginatedNotes = await db
      .query("notes")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .paginate(paginationOpts);

    return paginatedNotes;
  },
});

export const getOne = internalQuery({
  args: { id: Notes._id },
  handler: async ({ db }, { id }) => await db.get(id),
});

export const getAll = internalQuery({
  args: { paginationOpts: paginationOptsValidator },
  handler: async ({ db }, { paginationOpts }) =>
    await db.query("notes").order("desc").paginate(paginationOpts),
});

const templateNote = {
  title: "",
  generatingTranscript: true,
  generatingActionItems: true,
  audioFileId: "",
  audioFileUrl: "",
  generatingTitle: true,
  transcription: "",
  embedding: [],
  status: NoteStatusEnum.DRAFT,
};

export const generateNote = internalMutation({
  args: {
    userId: v.string(),
    audioFileId: v.string(),
    audioFileUrl: v.string(),
    title: v.optional(v.string()),
  },
  handler: async ({ db }, { userId, title, audioFileId, audioFileUrl }) => {
    const existingNote = await db
      .query("notes")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) =>
        q.or(
          q.eq(q.field("audioFileId"), audioFileId),
          q.eq(q.field("audioFileUrl"), audioFileUrl)
        )
      )
      .unique();

    if (existingNote) {
      throw new ConvexError(
        `Audio file with id ${audioFileId} already uploaded`
      );
    }

    const note = { userId, ...templateNote, title, audioFileId, audioFileUrl };

    return db.insert("notes", note);
  },
});

export const updateGeneratedNote = internalMutation({
  args: {
    id: Notes._id,
    userId: v.string(),
    data: v.object({
      title: v.optional(v.string()),
      transcription: v.string(),
      summary: v.string(),
      generatingActionItems: v.boolean(),
      generatingTranscript: v.boolean(),
      generatingTitle: v.boolean(),
      embedding: v.optional(v.array(v.float64())),
    }),
  },
  handler: async ({ db }, { id, userId, data }) => {
    const note = await db
      .query("notes")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("_id"), id))
      .unique();

    if (!note) throw new ConvexError("Note not found");

    const input = sanitizeInput(data, [
      "title",
      "transcription",
      "summary",
      "generatingActionItems",
      "generatingTranscript",
      "generatingTitle",
      "embedding",
    ]);

    return db.patch(note._id, input);
  },
});

export const remove = mutateWithUser({
  args: { id: Notes._id },
  handler: async ({ db, identity }, { id }) => {
    const userId = identity.tokenIdentifier;

    const note = await db
      .query("notes")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("_id"), id))
      .unique();

    if (!note) throw new Error("Note does not exist.");

    const actionItems = await db
      .query("actionItems")
      .withIndex("by_note", (q) => q.eq("noteId", note._id))
      .order("desc")
      .collect();

    if (actionItems.length > 0) {
      for (const item of actionItems) {
        await db.delete(item._id);
      }
    }

    return db.delete(note._id);
  },
});
