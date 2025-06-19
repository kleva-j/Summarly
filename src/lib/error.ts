import { type Result, Err } from "@/model/types";

export const ERRORS = {
  Hume_AI_Error: {
    ACCESS_TOKEN: "Failed to get access token",
    FAILED_AUTHENTICATION: "Failed to authenticate",
  },
} as const;

export function handleError(error: unknown, context: string): Result<never> {
  const errorMessage = error instanceof Error ? error.message : String(error);
  return Err(`Failed to ${context}: ${errorMessage}`);
}
