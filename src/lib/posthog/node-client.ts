import { PostHog } from "posthog-node";
import { env } from "env.mjs";

const host = env.NEXT_PUBLIC_POSTHOG_HOST;
const key = env.NEXT_PUBLIC_POSTHOG_KEY;

export function PostHogNodeClient() {
  /**
   * flushAt - sets how many capture calls we should flush the queue (in one batch).
   * flushInterval - sets how many milliseconds we should wait before flushing the queue.
   * Setting them to the lowest number ensures events are sent immediately and not batched.
   * We also need to call await posthog.shutdown() once done.
   */
  return new PostHog(key, { host, flushAt: 1, flushInterval: 0 });
}
