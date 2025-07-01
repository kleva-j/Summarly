import type { Doc } from "./_generated/dataModel";

import { internalQuery, query } from "./_generated/server";
import { SubscriptionPlans } from "./schema";
import { ConvexError } from "convex/values";
import { queryWithUser } from "./utils";

export const getSubscriptionPlans = internalQuery({
  args: {
    name: SubscriptionPlans.withoutSystemFields.name,
  },
  handler: async (ctx, { name }) => {
    return ctx.db
      .query("subscription_plans")
      .withIndex("by_name", (q) => q.eq("name", name))
      .unique();
  },
});

export const getAllSubscriptionPlans = query({
  handler: async (ctx) => {
    return ctx.db.query("subscription_plans").collect();
  },
});

export const getFeaturesByPlanId = query({
  args: {
    planId: SubscriptionPlans.withSystemFields._id,
  },
  handler: async (ctx, { planId }) => {
    const plan = await ctx.db.get(planId);

    if (!plan) throw new ConvexError("Plan not found");

    const features = (await Promise.all(
      plan.accessFeatures.map(async (featureId) => await ctx.db.get(featureId))
    )) as Doc<"features">[];

    return features;
  },
});

export const getAllFeatures = query({
  handler: async (ctx) => {
    return ctx.db.query("features").collect();
  },
});

export const getFeaturesByUserId = queryWithUser({
  handler: async ({ db, identity }) => {
    const { tokenIdentifier: userId } = identity;

    const user = await db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .unique();

    if (!user) throw new ConvexError("User not found");

    if (!user.planId) throw new ConvexError("User has no plan");

    const plan = await db.get(user.planId);

    if (!plan) throw new ConvexError("Plan not found");

    const features = (await Promise.all(
      plan.accessFeatures.map(async (featureId) => await db.get(featureId))
    )) as Doc<"features">[];

    return features;
  },
});

export const getUserCredits = queryWithUser({
  handler: async ({ db, identity }) => {
    const { tokenIdentifier: userId } = identity;

    const user = await db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .unique();

    if (!user) throw new ConvexError("User not found");
    if (!user.planId) throw new ConvexError("User has no plan");

    const credits = await db
      .query("credits")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("status"), "active"))
      .collect();

    if (!credits) throw new ConvexError("Credits not found");

    const totalCredits = credits.reduce(
      (acc, credit) => acc + credit.amount,
      0
    );

    const plan = await db.get(user.planId);

    if (!plan) throw new ConvexError("Plan not found");

    return {
      userId: user._id,
      totalCredits,
      availableCredits: totalCredits,
      subscriptionStatus: plan.name,
      planId: user.planId,
    };
  },
});
