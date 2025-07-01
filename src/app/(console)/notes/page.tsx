import { NoteContent } from "@/notes/_components/content";
import { NotesDataAccess } from "@/data-access/notes";
import { getUserId } from "@/lib/auth";
import { toast } from "sonner";

export default async function NotesPage() {
  const userId = (await getUserId()) ?? "";

  const NoteAccess = new NotesDataAccess();

  const preloadedNotes = await NoteAccess.preloadNotes(userId);

  const { ok } = preloadedNotes;

  if (!ok) {
    console.error("Failed to preload notes", preloadedNotes.error);
    toast.error("Failed to preload notes");
    return;
  }

  return <NoteContent preloadedNotes={preloadedNotes.value} />;
}
