import type { PHEventType, PHFlagsType } from "@/lib/posthog/types";

import { PostHogNodeClient } from "@/lib/posthog/node-client";

/**
 * Capture a PostHog event for a given user ID.
 *
 * @param {string} userId The ID of the user to associate the event with.
 * @param {keyof typeof EVENTS} event The type of event to capture.
 * @returns {void}
 */
export const captureEvent =
  (userId: string) =>
  <K extends PHEventType>(event: K): void => {
    const posthog = PostHogNodeClient();
    posthog.capture({ distinctId: userId, event });
  };

/**
 * Retrieve all feature flags for a given user ID.
 *
 * @param {string} userId - The ID of the user to retrieve feature flags for.
 * @returns {Promise<PHFlagsType>} A promise that resolves to an object
 * containing the feature flags and their states.
 */
export async function getFeatureFlags(userId: string): Promise<PHFlagsType> {
  const posthog = PostHogNodeClient();
  const flags = await posthog.getAllFlags(userId);
  return flags;
}
