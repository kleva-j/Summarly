import { PostHog } from "posthog-node";
import { env } from "env.mjs";

const host = env.NEXT_PUBLIC_POSTHOG_HOST;
const key = env.NEXT_PUBLIC_POSTHOG_KEY;

export function PostHogNodeClient() {
  return new PostHog(key, { host });
}
