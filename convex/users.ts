import type { QueryCtx } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";

import { internalMutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { Users } from "./schema";

const USER_UPDATE_FIELDS = {
  name: v.string(),
  tokenIdentifier: v.string(),
};

const USER_INSERT_FIELDS = {
  ...USER_UPDATE_FIELDS,
  email: v.string(),
  isVerified: v.boolean(),
  image: v.optional(v.string()),
};

// USER MUTATIONS
export const createUser = internalMutation({
  args: USER_INSERT_FIELDS,
  handler: async (ctx, { tokenIdentifier, ...rest }) => {
    const existingUser = await checkExistingUser(ctx, tokenIdentifier);

    if (existingUser) throw new ConvexError("User already exists");

    const { _id: planId } = (await ctx.db
      .query("subscription_plans")
      .withIndex("by_name", (q) => q.eq("name", "free"))
      .unique()) as Doc<"subscription_plans">;

    const data = { tokenIdentifier, ...rest, planId };

    return ctx.db.insert("users", data);
  },
});

export const updateUser = internalMutation({
  args: USER_UPDATE_FIELDS,
  handler: async (ctx, { tokenIdentifier, name }) => {
    const existingUser = await checkExistingUser(ctx, tokenIdentifier);

    if (!existingUser) throw new ConvexError("User not found");

    return ctx.db.patch(existingUser._id, { name });
  },
});

export const deleteUser = internalMutation({
  args: { id: Users.withoutSystemFields.tokenIdentifier },
  handler: async (ctx, { id }) => {
    const existingUser = await checkExistingUser(ctx, id);
    if (!existingUser) throw new ConvexError("User not found");
    return ctx.db.delete(existingUser._id);
  },
});

async function checkExistingUser(
  ctx: QueryCtx,
  tokenIdentifier: string
): Promise<Doc<"users"> | null> {
  return await ctx.db
    .query("users")
    .withIndex("by_token", (q) => q.eq("tokenIdentifier", tokenIdentifier))
    .unique();
}
