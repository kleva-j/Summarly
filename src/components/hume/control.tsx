"use client";

import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { Button } from "@/components/ui/button";

export function Controls() {
	const { connect, disconnect, readyState } = useVoice();

	const startSession = async () => {
		try {
			await connect();
		} catch (error) {
			console.error(error);
		}
	};

	if (readyState === VoiceReadyState.OPEN) {
		return <Button onClick={() => disconnect()}>End Session</Button>;
	}

	return <Button className="w-min" onClick={startSession}>Start Session</Button>;
}
