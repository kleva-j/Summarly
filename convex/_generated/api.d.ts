/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as clerk from "../clerk.js";
import type * as http from "../http.js";
import type * as notes from "../notes.js";
import type * as notification from "../notification.js";
import type * as recording from "../recording.js";
import type * as replicate from "../replicate.js";
import type * as seed from "../seed.js";
import type * as sessions from "../sessions.js";
import type * as settings from "../settings.js";
import type * as subscription_plans from "../subscription_plans.js";
import type * as users from "../users.js";
import type * as utils from "../utils.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  clerk: typeof clerk;
  http: typeof http;
  notes: typeof notes;
  notification: typeof notification;
  recording: typeof recording;
  replicate: typeof replicate;
  seed: typeof seed;
  sessions: typeof sessions;
  settings: typeof settings;
  subscription_plans: typeof subscription_plans;
  users: typeof users;
  utils: typeof utils;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
