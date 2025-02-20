import { auth } from "@clerk/nextjs/server";

export async function getAuthToken() {
  return (await (await auth()).getToken({ template: "convex" })) ?? undefined;
}

export async function getUserId() {
  return (await auth()).userId ?? undefined;
}
