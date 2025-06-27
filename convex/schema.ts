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
  planId: v.id("subscription_plans"),
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

export const TranscriptionSchema = v.union(
  v.string(),
  v.object({
    language_code: v.string(),
    language_probability: v.number(),
    text: v.string(),
    words: v.array(
      v.object({
        text: v.string(),
        type: v.string(),
        start: v.number(),
        end: v.number(),
        speaker_id: v.string(),
        characters: v.array(
          v.object({
            text: v.string(),
            start: v.number(),
            end: v.number(),
          })
        ),
      })
    ),
  })
);

export const Notes = Table("notes", {
  userId: v.string(),
  audioFileId: v.string(),
  audioFileUrl: v.string(),
  generatingTitle: v.boolean(),
  title: v.optional(v.string()),
  summary: v.optional(v.string()),
  generatingTranscript: v.boolean(),
  generatingActionItems: v.boolean(),
  transcription: v.optional(TranscriptionSchema),
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

export const Credits = Table("credits", {
  userId: v.string(),
  amount: v.number(),
  expiresAt: v.number(),
  status: v.union(v.literal("active"), v.literal("expired"), v.literal("used")),
  source: v.union(
    v.literal("subscription"),
    v.literal("purchase"),
    v.literal("free")
  ),
  metadata: v.optional(v.object({})),
});

export const UsageHistory = Table("usageHistory", {
  userId: v.string(),
  featureId: v.string(),
  creditsUsed: v.number(),
  timestamp: v.number(),
  metadata: v.optional(v.object({})),
});

export const Features = Table("features", {
  name: v.string(),
  description: v.string(),
  creditCost: v.number(),
  category: v.string(), // To be defined in the future
  isActive: v.boolean(),
  metadata: v.optional(v.object({})),
});

export const SubscriptionPlans = Table("subscription_plans", {
  name: v.union(v.literal("free"), v.literal("basic"), v.literal("pro")),
  description: v.string(),
  price: v.number(),
  initialCredits: v.number(),
  monthlyCredits: v.number(),
  accessFeatures: v.array(v.id("features")),
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
  users: Users.table
    .index("by_token", ["tokenIdentifier"])
    .index("by_plan", ["planId"]),
  notes: Notes.table
    .index("by_title", ["title"])
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),
  credits: Credits.table
    .index("by_user", ["userId"])
    .index("by_source", ["source"])
    .index("by_status", ["status"]),
  usageHistory: UsageHistory.table
    .index("by_user", ["userId"])
    .index("by_feature", ["featureId"]),
  features: Features.table
    .index("by_name", ["name"])
    .index("by_category", ["category"])
    .index("by_is_active", ["isActive"]),
  subscription_plans: SubscriptionPlans.table
    .index("by_name", ["name"])
    .index("by_price", ["price"]),
  settings: Settings.table.index("by_user", ["userId"]),
});
