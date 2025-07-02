"use server";

import { validateUserAndToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

type AuthConfig = { token: string | undefined };

export async function checkDataAccess() {
  const { errors, token } = await validateUserAndToken();

  if (errors) {
    revalidatePath("/login");
    return { errors };
  }

  const config: AuthConfig = { token };

  return { config };
}
