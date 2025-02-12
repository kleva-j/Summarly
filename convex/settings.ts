import { internalMutation } from "./_generated/server";

import schema from "./schema";

// SETTINGS MUTATIONS
const SettingsFields = schema.tables.settings.validator.fields;

export const createOrUpdate = internalMutation({
  args: SettingsFields,
  handler: async (ctx, { userId, ...rest }) => {
    const existingSettings = await ctx.db
      .query("settings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    if (!existingSettings)
      return ctx.db.insert("settings", { userId, ...rest });
    return ctx.db.patch(existingSettings._id, { ...rest });
  },
});

export const remove = internalMutation({
  args: { userId: SettingsFields.userId },
  handler: async (ctx, { userId }) => {
    const existingSettings = await ctx.db
      .query("settings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    if (!existingSettings) throw new Error("Settings not found");
    return ctx.db.delete(existingSettings._id);
  },
});
