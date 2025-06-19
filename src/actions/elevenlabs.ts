"use server";

import type { NoteId } from "@/model/types";

import { validateUserAndToken } from "@/lib/auth";
import { ElevenLabsClient } from "elevenlabs";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { env } from "env.mjs";

const client = new ElevenLabsClient({ apiKey: env.ELEVENLABS_API_KEY });

export type Errors = {
  title?: string;
  description?: string;
};

export type FormState = {
  errors?: Errors;
};

export async function createTranscript(formData: FormData) {
  await validateUserAndToken();

  const storageId = formData.get("storageId");

  if (!storageId) return { errors: { title: "Storage ID not provided" } };

  const audioFile = await fetch(storageId as string);

  const audioBlob = new Blob([await audioFile.arrayBuffer()], {
    type: "audio/mp3",
  });

  const transcription = await client.speechToText.convert({
    file: audioBlob,
    model_id: "scribe_v1", // Model to use, for now only "scribe_v1" is support.
    tag_audio_events: true, // Tag audio events like laughter, applause, etc.
    language_code: "eng", // Language of the audio file. If set to null, the model will detect the language automatically.
    diarize: true, // Whether to annotate who is speaking
  });

  return { transcription };
}

export async function saveTranscript(noteId: NoteId, transcription: string) {
  const data = { noteId, transcription };

  try {
    const config = await validateUserAndToken();

    await fetchMutation(api.notes.saveTranscription, data, config);
  } catch (e) {
    console.error(e);
    return { errors: { title: "Failed to save transcript" } };
  }
}
