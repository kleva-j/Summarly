import { ConvexError, v } from "convex/values";

import { mutateWithUser, queryWithUser } from "./utils";
import { internal } from "./_generated/api";

// Generate an upload url in storage
export const generateUploadUrl = mutateWithUser(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// Analyse a recording from a file in strorage
export const analyseRecording = mutateWithUser({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId: audioFileId }) => {
    const { tokenIdentifier: userId } = ctx.identity;

    const fileUrl = (await ctx.storage.getUrl(audioFileId)) as string;

    if (!fileUrl) throw new ConvexError("File not found");

    const payload = { userId, audioFileId, audioFileUrl: fileUrl };
    await ctx.runMutation(internal.notes.generateNote, payload);

    await ctx.scheduler.runAfter(0, internal.replicate.whisper, { fileUrl });
  },
});

// Get all recordings for a user
export const getRecordings = queryWithUser({
  handler: async ({ db, identity }) => {
    const { tokenIdentifier: userId } = identity;

    const notes = await db
      .query("notes")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    const recordings = [];

    for (const note of notes) {
      if (note.audioFileId && note.audioFileUrl) {
        recordings.push({ id: note.audioFileId, url: note.audioFileUrl });
      }
    }

    return recordings;
  },
});

export const deleteRecording = mutateWithUser({
  args: { storageId: v.id("_storage"), noteId: v.id("notes") },
  handler: async (ctx, { storageId, noteId }) => {
    const { tokenIdentifier: userId } = ctx.identity;

    const associatedNote = await ctx.db.get(noteId);

    if (!associatedNote) throw new ConvexError("Note not found");

    if (associatedNote.audioFileId !== storageId) {
      throw new ConvexError("Audio file not associated to note");
    }

    if (associatedNote.userId !== userId) {
      throw new ConvexError("Action not allowed");
    }

    await ctx.db.delete(associatedNote._id);
  },
});
