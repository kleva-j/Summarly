import type { AuthConfig } from "@/model/types";
import type { Result } from "@/model/types";

import { checkDataAccess, checkUserPermissions } from "@/data-access/auth";
import { PermissionError } from "@/lib/error";
import { Err } from "@/model/types";

export abstract class BaseDataAccess {
  protected authConfig!: AuthConfig;

  constructor() {
    this.initializeAuth().then((config) => {
      this.authConfig = config;
    });
  }

  protected async initializeAuth(): Promise<AuthConfig> {
    try {
      const config = await checkDataAccess();
      return config;
    } catch (error) {
      if (error instanceof PermissionError) throw error;
      throw new Error("Failed to initialize authentication");
    }
  }

  protected async validateAction(
    userId: string,
    requiredPermissions: string[]
  ): Promise<boolean> {
    try {
      const hasPermission = await checkUserPermissions(
        userId,
        requiredPermissions
      );
      return hasPermission;
    } catch (error) {
      if (error instanceof PermissionError) throw error;
      throw new Error("Failed to validate action permissions");
    }
  }

  protected async validateAndExecute<T>(
    userId: string,
    requiredPermissions: string[],
    action: () => Promise<T>
  ): Promise<Result<T>> {
    try {
      const hasPermission = await this.validateAction(
        userId,
        requiredPermissions
      );
      if (!hasPermission) {
        throw new PermissionError("Insufficient permissions for this action");
      }

      const result = await action();
      return {
        ok: true,
        ...(typeof result === "undefined" ? {} : { value: result }),
      } as Result<T>;
    } catch (error) {
      if (error instanceof PermissionError) return Err(error.message);
      throw error;
    }
  }
}
