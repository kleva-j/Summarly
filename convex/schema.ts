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
  status: v.union(
    v.literal("draft"),
    v.literal("archived"),
    v.literal("published")
  ),
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

export const Notifs = Table("notifs", {
  userId: v.string(),
  title: v.string(),
  read: v.boolean(),
  type: v.union(
    v.literal("actionItems:started"),
    v.literal("transcript:started"),
    v.literal("actionItems:ended"),
    v.literal("transcript:ended")
  ),
  metadata: v.object({
    noteId: v.id("notes"),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
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
  notifs: Notifs.table
    .index("by_read", ["read"])
    .index("by_type", ["type"])
    .index("by_user", ["userId"])
    .index("by_node_id", ["metadata.noteId"]),
  settings: Settings.table.index("by_user", ["userId"]),
  users: Users.table.index("by_token", ["tokenIdentifier"]),
  notes: Notes.table.index("by_title", ["title"]).index("by_user", ["userId"]),
});
