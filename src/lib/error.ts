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

// PermissionError
export class PermissionError extends Error {
  /**
   * This error is thrown when the user doesn't have the permission to perform
   * the operation. This can happen when the user is not logged in, or when the
   * user is not authorized to perform the action.
   * @param message - The error message
   */
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, PermissionError.prototype);
  }
}
