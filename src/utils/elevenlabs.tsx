"use server";

import type { Voice } from "elevenlabs/api";

import { ElevenLabsClient } from "elevenlabs";
import { env } from "env.mjs";

const client = new ElevenLabsClient({ apiKey: env.ELEVENLABS_API_KEY });

export async function getVoices() {
  const response = await client.voices.getAll();
  return response.voices;
}

export async function getVoiceById(id: string) {
  return await client.voices.get(id);
}

export async function createAudioStreamFromText(
  text: string,
  voice: Voice["voice_id"]
): Promise<Buffer> {
  try {
    const audioStream = await client.textToSpeech.convertAsStream(voice, {
      text,
      model_id: "eleven_multilingual_v2",
      output_format: "mp3_44100_128",
      // Optional voice settings that allow you to customize the output
      voice_settings: {
        stability: 0,
        similarity_boost: 1.0,
        use_speaker_boost: true,
        speed: 1.0,
      },
    });
    const chunks: Buffer[] = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }
    const content = Buffer.concat(chunks);
    return content;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
