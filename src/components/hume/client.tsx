"use client";

import type { ComponentRef } from "react";

import { StartCall } from "@/components/hume/start-call";
import { Messages } from "@/components/hume/message";
import { Controls } from "@/components/hume/control";
import { VoiceProvider } from "@humeai/voice-react";
import { useRef } from "react";

type HumeClientProps = { accessToken: string };

export function HumeClient({ accessToken }: HumeClientProps) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);

  return (
    <div className="relative grow flex flex-col mx-auto w-full overflow-hidden h-[0px]">
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        onMessage={() => {
          if (timeout.current) window.clearTimeout(timeout.current);

          timeout.current = window.setTimeout(() => {
            if (ref.current) {
              const scrollHeight = ref.current.scrollHeight;

              ref.current.scrollTo({ top: scrollHeight, behavior: "smooth" });
            }
          }, 200);
        }}
      >
        <Messages ref={ref} />
        <Controls />
        <StartCall />
      </VoiceProvider>
    </div>
  );
}
