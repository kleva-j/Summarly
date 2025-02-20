import { rateLimitTables } from "convex-helpers/server/rateLimit";
import { Table } from "convex-helpers/server";
import { defineSchema } from "convex/server";
import { v } from "convex/values";

export const Users = Table("users", {
  name: v.string(),
  email: v.string(),
  isVerified: v.boolean(),
  tokenIdentifier: v.string(),
  image: v.optional(v.string()),
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
  expireAt: v.number(),
  sessionId: v.string(),
  lastActiveAt: v.number(),
});

export const Notes = Table("notes", {
  userId: v.string(),
  audioFileId: v.string(),
  audioFileUrl: v.string(),
  generatingTitle: v.boolean(),
  title: v.optional(v.string()),
  summary: v.optional(v.string()),
  generatingTranscript: v.boolean(),
  generatingActionItems: v.boolean(),
  transcription: v.optional(v.string()),
  embedding: v.optional(v.array(v.float64())),
});

export const ActionItems = Table("actionItems", {
  task: v.string(),
  userId: v.string(),
  noteId: v.id("notes"),
});

export const Settings = Table("settings", {
  userId: v.string(),
  theme: v.union(v.literal("light"), v.literal("dark")),
  language: v.object({ value: v.string(), label: v.string() }),
});

export default defineSchema({
  ...rateLimitTables,
  actionItems: ActionItems.table
    .index("by_user", ["userId"])
    .index("by_note", ["noteId"]),
  sessions: Sessions.table
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_sess_id", ["sessionId"]),
  settings: Settings.table.index("by_user", ["userId"]),
  users: Users.table.index("by_token", ["tokenIdentifier"]),
  notes: Notes.table.index("by_title", ["title"]).index("by_user", ["userId"]),
});
