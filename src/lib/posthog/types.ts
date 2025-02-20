import type { EVENTS, FEATURE_FLAGS } from ".";

export type PHEventType = (typeof EVENTS)[keyof typeof EVENTS];

export type PHFeatureFlagType =
  (typeof FEATURE_FLAGS)[keyof typeof FEATURE_FLAGS];

export type PHFlagsType = { [key: string]: string | boolean };
