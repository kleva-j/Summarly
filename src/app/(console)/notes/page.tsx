import { NoteContent } from "@/notes/_components/content";
import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { getAuthToken } from "@/lib/auth";

type AuthConfig = { token: string | undefined };

export default async function NotesPage() {
  const config: AuthConfig = { token: undefined };

  try {
    config.token = await getAuthToken();
  } catch (e) {
    console.error(e);
  }

  const preloadedNotes = await preloadQuery(api.notes.getAllByUser, {}, config);

  return <NoteContent preloadedNotes={preloadedNotes} />;
}
