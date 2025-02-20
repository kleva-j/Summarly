import type { PHEventType } from "@/lib/posthog/types";

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
