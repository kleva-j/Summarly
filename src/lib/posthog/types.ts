import type { EVENTS } from ".";

export type PHEventType = (typeof EVENTS)[keyof typeof EVENTS];
