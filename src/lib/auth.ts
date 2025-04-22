import { auth } from "@clerk/nextjs/server";

export async function getAuthToken() {
  return (await (await auth()).getToken({ template: "convex" })) ?? undefined;
}

export async function getUserId() {
  return (await auth()).userId ?? undefined;
}

export async function validateUserAndToken() {
  const { getToken, userId } = await auth();

  if (!userId) return { errors: { title: "User not authenticated" } };

  const token = await getToken({ template: "convex" });

  if (!token) return { errors: { title: "Token not available" } };

  return { userId, token };
}
