"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ElevenLabsTTSStateActions } from "@/model/types";
import { ElevenLabsSampleTTSText } from "@/lib/constants";
import { ElevenLabsTTSMachine } from "@/model/machines";
import { Textarea } from "@/components/ui/textarea";
import { Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { getVoices } from "@/utils/elevenlabs";
import { useMachine } from "@xstate/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import {
  LoaderCircleIcon,
  LoaderCircle,
  Download,
  Pause,
  Play,
} from "lucide-react";

import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  Select,
} from "@/components/ui/select";

import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";

const { SUBMIT_AUDIO, SET_VOICES } = ElevenLabsTTSStateActions;

export function TextToSpeech() {
  const id = useId();

  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const [voice, setVoice] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);

  const [{ context, value }, send] = useMachine(ElevenLabsTTSMachine);
  const { voices, audio: audioBuffer, status } = context;

  const audioElement = new Audio();

  useEffect(() => {
    if (value === "failure") {
      toast.error("Failed to generate audio");
    } else if (value === "success") {
      toast.success("Audio generated successfully");
    }
  }, [value]);

  useEffect(() => {
    if (audioBuffer) {
      const blob = new Blob([audioBuffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      audioElement.src = url;
    }

    audioElement.addEventListener("ended", () => {
      audioElement.src = "";
      setIsPlaying(false);
    });

    return () => {
      audioElement.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [audioBuffer, audioElement]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getVoices().then((voices) => {
      send({ type: SET_VOICES, payload: voices });
    });
  }, []);

  function toggle() {
    if (!audioElement.src) return;
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement.play();
      setIsPlaying(true);
    }
  }

  function downloadAudio() {
    if (!audioBuffer) return;
    const blob = new Blob([audioBuffer], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audio.mp3";
    a.click();
    URL.revokeObjectURL(url);
  }

  function submitAudio() {
    send({
      type: SUBMIT_AUDIO,
      payload: { text: textRef.current?.value ?? "", voice },
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Text className="text-xl font-semibold !mt-0">Text to Speech</Text>
      <div className="[--ring:var(--color-indigo-300)] *:not-first:mt-2 in-[.dark]:[--ring:var(--color-indigo-900)]">
        <Textarea
          placeholder="Enter text here to convert to speech"
          defaultValue={ElevenLabsSampleTTSText}
          className="text-muted-foreground"
          ref={textRef}
        />
      </div>

      <div className="flex gap-2 justify-between items-center mb-2">
        <div className="flex gap-4 items-center">
          {value === "loading" && (
            <LoaderCircle className="size-8 animate-spin" />
          )}
          {value === "success" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    onClick={toggle}
                    className={cn(
                      "size-8 rounded-full p-2 cursor-pointer",
                      isPlaying && "border border-blue-700/50"
                    )}
                  >
                    {isPlaying ? (
                      <Pause className="text-muted-foreground" />
                    ) : (
                      <Play className="text-muted-foreground" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isPlaying ? "Pause" : "Play"}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    onClick={downloadAudio}
                    className="size-8 rounded-full p-2 cursor-pointer"
                  >
                    <Download className="text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download Audio</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <small className="text-muted-foreground">{status}</small>
        </div>

        <div className="flex gap-2 ml-auto">
          <Select value={voice} onValueChange={setVoice}>
            <SelectTrigger id={id} className="w-max">
              <SelectValue placeholder="Select Voice" />
            </SelectTrigger>
            <SelectContent>
              {voices.map((voice) => (
                <SelectItem key={voice.name} value={voice.voice_id}>
                  {voice.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            disabled={
              !textRef.current?.value ||
              !textRef.current?.value?.length ||
              !voice ||
              !voices.length ||
              value === "loading" ||
              (!!status && status !== "idle")
            }
            onClick={submitAudio}
          >
            {value === "loading" && (
              <LoaderCircleIcon
                className="-ms-1 animate-spin"
                aria-hidden="true"
                size={16}
              />
            )}
            Convert to Speech
          </Button>
        </div>
      </div>
    </div>
  );
}
