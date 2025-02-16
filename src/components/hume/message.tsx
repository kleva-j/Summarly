"use client";

import { useVoice } from "@humeai/voice-react";

export function Messages() {
	const { messages } = useVoice();

	return (
		<div>
			{messages.map((msg) => {
				if (msg.type === "user_message" || msg.type === "assistant_message") {
					return (
						<div key={msg.type + msg.message.role}>
							<div>{msg.message.role}</div>
							<div>{msg.message.content}</div>
						</div>
					);
				}

				return null;
			})}
		</div>
	);
}
