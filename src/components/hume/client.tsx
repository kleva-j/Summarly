"use client";

import type { PropsWithChildren } from "react";

import { VoiceProvider } from "@humeai/voice-react";

type HumeClientProps = PropsWithChildren<{ accessToken: string }>;

export function HumeClient({ accessToken, children }: HumeClientProps) {
	return (
		<VoiceProvider auth={{ type: "accessToken", value: accessToken }}>
			{children}
		</VoiceProvider>
	);
}
