"use client";

import posthog from "posthog-js";

import { type PropsWithChildren, useEffect } from "react";

import { PostHogProvider as PHProvider } from "posthog-js/react";
import { env } from "env.mjs";

export function PostHogProvider({ children }: PropsWithChildren) {
	useEffect(() => {
		posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
			api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
			capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      capture_pageleave: true, // Enable pageleave capture
		});
	}, []);

	return <PHProvider client={posthog}>{children}</PHProvider>;
}
