import type { Doc, Id } from "./_generated/dataModel";

import { internalMutation } from "./_generated/server";
import { Plan } from "./utils";

type Plans = Omit<Doc<"subscription_plans">, "_id" | "_creationTime">;
type Features = Omit<Doc<"features">, "_id" | "_creationTime">;

// Free Features
const freeFeatures: Features[] = [
  {
    name: "Transcript",
    description: "Generate a transcript of your meeting.",
    creditCost: 5,
    category: "",
    isActive: true,
  },
  {
    name: "Action Items",
    description: "Generate action items from your meeting.",
    creditCost: 5,
    category: "",
    isActive: true,
  },
  {
    name: "Summary",
    description: "Generate a summary of your meeting.",
    creditCost: 1,
    category: "",
    isActive: true,
  },
];

// Basic Features
const basicFeatures: Features[] = [];

// Pro Features
const proFeatures: Features[] = [];

const plans: Plans[] = [
  {
    name: Plan.Free,
    description: "Free plan with limited features.",
    price: 0,
    initialCredits: 100,
    monthlyCredits: 100,
    accessFeatures: [],
  },
  {
    name: Plan.Basic,
    description: "Basic plan with more features.",
    price: 10,
    initialCredits: 100,
    monthlyCredits: 100,
    accessFeatures: [],
  },
  {
    name: Plan.Pro,
    description: "Pro plan with all features.",
    price: 20,
    initialCredits: 100,
    monthlyCredits: 100,
    accessFeatures: [],
  },
];

export const seedInitialData = internalMutation({
  async handler(ctx) {
    const seededFreeFeatures: Id<"features">[] = [];
    const seededBasicFeatures: Id<"features">[] = [];
    const seededProFeatures: Id<"features">[] = [];

    for (const feature of freeFeatures) {
      const featureId = await ctx.db.insert("features", feature);
      seededFreeFeatures.push(featureId);
    }

    if (basicFeatures.length > 0) {
      for (const feature of basicFeatures) {
        const featureId = await ctx.db.insert("features", feature);
        seededBasicFeatures.push(featureId);
      }
    }

    if (proFeatures.length > 0) {
      for (const feature of proFeatures) {
        const featureId = await ctx.db.insert("features", feature);
        seededProFeatures.push(featureId);
      }
    }

    for (const plan of plans) {
      await ctx.db.insert("subscription_plans", {
        ...plan,
        accessFeatures:
          plan.name === Plan.Free
            ? seededFreeFeatures
            : plan.name === Plan.Basic
            ? seededBasicFeatures
            : plan.name === Plan.Pro
            ? seededProFeatures
            : [],
      });
    }
  },
});
