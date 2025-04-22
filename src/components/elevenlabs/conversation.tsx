"use client";

import { useConversation } from "@11labs/react";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { env } from "env.mjs";

const agentId = env.NEXT_PUBLIC_DEFAULT_ELEVENLABS_AGENT_ID;

export function Conversation() {
  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message) => console.log("Message:", message),
    onError: (error) => console.error("Error:", error),
  });

  const startConversation = useCallback(async () => {
    try {
      if (!agentId) throw new Error("Agent ID not found");
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation with your agent
      await conversation.startSession({ agentId });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const StatusClass = {
    "bg-emerald-500": conversation.status === "connected",
    "bg-sky-600": conversation.status === "connecting",
    "bg-gray-300": conversation.status === "disconnected",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <Button
          onClick={startConversation}
          disabled={conversation.status === "connected"}
          className="bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Start Conversation
        </Button>
        <Button
          onClick={stopConversation}
          disabled={conversation.status !== "connected"}
          className="bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          Stop Conversation
        </Button>
      </div>

      <div className="mb-4 flex flex-col items-center">
        <div className="flex gap-1 items-center">
          <span className="relative flex size-2">
            <span
              className={cn(
                "absolute inline-flex h-full w-full rounded-full opacity-75",
                {"animate-ping": conversation.status === "connecting", ...StatusClass}
              )}
            />
            <span
              className={cn("relative inline-flex size-2 rounded-full", StatusClass)}
            />
          </span>
          <p className="text-sm">Status: {conversation.status}</p>
        </div>
        {conversation.status === "connected" && (
          <p className="text-sm">
            Agent is {conversation.isSpeaking ? "speaking" : "listening"}
          </p>
        )}
      </div>
    </div>
  );
}
