export const EVENTS = {
  PAGE_VIEW: "page_view",
  PAGE_LEAVE: "page_leave",
  USER_SIGN_UP: "user_sign_up",
  USER_SIGN_IN: "user_sign_in",
  USER_SIGN_OUT: "user_sign_out",
} as const;

export const FEATURE_FLAGS = {
  NOTES_ENABLED: "notes_enabled",
  NOTE_TEMPLATES_ENABLED: "note_templates_enabled",
  RECORDINGS_ENABLED: "recordings_enabled",
  ANALYTICS_ENABLED: "analytics_enabled",
  USER_ONBOARDING_ENABLED: "user_onboarding_enabled",
} as const;
