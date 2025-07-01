"use server";

import type { AuthConfig } from "@/model/types";

import { validateUserAndToken } from "@/lib/auth";
import { PermissionError } from "@/lib/error";
import { revalidatePath } from "next/cache";

export async function checkDataAccess(): Promise<AuthConfig> {
  const { errors, token } = await validateUserAndToken();

  if (errors) {
    revalidatePath("/login");
    throw new PermissionError(errors.title);
  }

  return { token };
}

export async function checkUserPermissions(
  userId: string,
  requiredPermissions: string[]
): Promise<boolean> {
  try {
    const { token } = await checkDataAccess();
    // TODO: Implement actual permission checking logic using Convex
    // This would typically involve checking user roles and permissions
    return true; // Placeholder until actual implementation
  } catch (error) {
    if (error instanceof PermissionError) {
      throw error;
    }
    throw new Error("Failed to check user permissions");
  }
}
