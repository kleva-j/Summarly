"use node";

import { internalAction } from "./_generated/server";

import { clerkClient } from "@clerk/nextjs/server";
import { v } from "convex/values";

export const updateMetadata = internalAction({
  args: {
    id: v.string(),
    metadata: v.object({ planId: v.id("subscription_plans") }),
  },
  handler: async (_ctx, { id, metadata: privateMetadata }) => {
    try {
      (await clerkClient()).users.updateUserMetadata(id, { privateMetadata });
    } catch (error) {
      console.error("Failed to update user metadata:", error);
    }
  },
});
