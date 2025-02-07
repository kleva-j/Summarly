import { Table } from "convex-helpers/server";
import { defineSchema } from "convex/server";
import { v } from "convex/values";

export const Users = Table("users", {
  name: v.string(),
  email: v.string(),
  isVerified: v.boolean(),
  tokenIdentifier: v.string(),
});

export const Sessions = Table("sessions", {
  userId: v.string(),
  status: v.union(
    v.literal("active"),
    v.literal("ended"),
    v.literal("removed"),
    v.literal("revoked")
  ),
  clientId: v.string(),
  sessionId: v.string(),
  expireAt: v.number(),
  lastActiveAt: v.number(),
});

export const notes = Table("notes", {
  title: v.optional(v.string()),
  userId: v.string(),
  audioFileId: v.string(),
  audioFileUrl: v.string(),
  transcription: v.optional(v.string()),
  summary: v.optional(v.string()),
  embedding: v.optional(v.array(v.float64())),
  generatingTranscript: v.boolean(),
  generatingTitle: v.boolean(),
  generatingActionItems: v.boolean(),
});

export const actionItems = Table("actionItems", {
  noteId: v.id("notes"),
  userId: v.string(),
  task: v.string(),
});

export default defineSchema({
  users: Users.table.index("by_token", ["tokenIdentifier"]),
  sessions: Sessions.table
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_sess_id", ["sessionId"]),
  notes: notes.table
    .index("by_title", ["title"])
    .index("by_user", ["userId"]),
  actionItems: actionItems.table
    .index("by_user", ["userId"])
    .index("by_note", ["noteId"]),
});
