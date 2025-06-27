import { internalQuery } from "./_generated/server";
import { SubscriptionPlans } from "./schema";

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
