import type { Auth } from "convex/server";

import { ConvexError } from "convex/values";
import { pick, pickBy } from "lodash";

import {
  customMutation,
  customAction,
  customQuery,
  customCtx,
} from "convex-helpers/server/customFunctions";

import {
  type ActionCtx,
  type QueryCtx,
  mutation,
  action,
  query,
} from "@/_generated/server";

type CustomCtxType = ActionCtx | QueryCtx;

export type SessionStatus = "active" | "ended" | "removed" | "revoked";

export const getTokenId = (id: string) =>
  `${process.env.CLERK_ISSUER_URL}|${id}`;

export const getUserIdentity = async (ctx: CustomCtxType & { auth: Auth }) =>
  await ctx.auth.getUserIdentity();

export async function getAuthStatus(ctx: CustomCtxType) {
  const identity = await getUserIdentity(ctx);
  if (!identity) throw new ConvexError("Not Authenticated.");
  return { identity };
}

export const queryWithUser = customQuery(query, customCtx(getAuthStatus));
export const actionWithUser = customAction(action, customCtx(getAuthStatus));
export const mutateWithUser = customMutation(
  mutation,
  customCtx(getAuthStatus)
);

/**
 * Pick only the specified fields from the input object and remove any undefined values.
 * @param input The input object to pick from
 * @param fields The fields to pick
 * @returns The object with the specified fields and undefined values removed.
 */
export const sanitizeInput = <T extends Record<string, any>>(
  input: T,
  fields: Array<keyof T>
) => {
  const sanitizedInput = pick(input, fields);
  return pickBy(sanitizedInput, (value) => value !== undefined) as {
    [K in keyof T as T[K] extends undefined ? never : K]: T[K];
  };
};
