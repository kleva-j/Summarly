import { NoteContent } from "@/notes/_components/content";
import { NotesDataAccess } from "@/data-access/notes";
import { toast } from "sonner";

export default async function NotesPage() {
  const noteAccess = new NotesDataAccess();

  const notes = await noteAccess.getAllNotes();

  const { ok } = notes;

  if (!ok) {
    console.error("Failed to preload notes", notes.error);
    toast.error("Failed to preload notes");
    return;
  }

  return <NoteContent notes={notes.value} />;
}
