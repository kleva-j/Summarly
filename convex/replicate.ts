("use node");

import { internalAction } from "./_generated/server";

import { v } from "convex/values";

import Replicate from "replicate";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

const model_identifier =
  "openai/whisper:8099696689d249cf8b122d833c36ac3f75505c666a395ca40ef26f68e7d3d16e"; // latest

interface whisperOutput {
  detected_language: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  segments: any;
  transcription: string;
  translation: string | null;
}

export const whisper = internalAction({
  args: { fileUrl: v.string() },
  handler: async (_, args) => {
    const replicateOutput = (await replicate.run(model_identifier, {
      input: {
        audio: args.fileUrl,
        model: "large-v3",
        translate: false,
        temperature: 0,
        transcription: "plain text",
        suppress_tokens: "-1",
        logprob_threshold: -1,
        no_speech_threshold: 0.6,
        condition_on_previous_text: true,
        compression_ratio_threshold: 2.4,
        temperature_increment_on_fallback: 0.2,
      },
    })) as whisperOutput;

    const transcript = replicateOutput.transcription || "error";

    return transcript;
  },
});
