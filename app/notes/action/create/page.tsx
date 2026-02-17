// app/notes/action/create/page.tsx
import type { Metadata } from "next";
import css from "./CreateNote.module.css";
import { redirect } from "next/navigation";
import { addNote } from "@/lib /api";
import NoteForm from "@/components /NoteForm/NoteForm";
import  { NewNote ,NOTE_TAGS,type NoteTag } from "@/types /note";


export const metadata: Metadata = {
  title: "Create note | NoteHub",
  description: "Create a new note in NoteHub.",
  openGraph: {
    title: "Create note | NoteHub",
    description: "Create a new note in NoteHub.",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create note | NoteHub",
      },
    ],
  },
};




// Серверна функція для обробки форми
export async function createNoteAction(formData: FormData) {

    "use server";
    

  const title = formData.get("title")?.toString() || "";
  const content = formData.get("content")?.toString() || "";
  const tagValue = formData.get("tag")?.toString();

  if (!title) {
    throw new Error("Title is required");
  }

  if (!tagValue || !NOTE_TAGS.includes(tagValue as NoteTag)) {
    throw new Error("Invalid tag");
  }

  if (NOTE_TAGS.includes(tagValue as NoteTag)) {
    const tag: NoteTag = tagValue as NoteTag;
  


    const newNote: NewNote = {
      title,
      content,
      tag,
    };
  

    await addNote(newNote);
  }
    

  redirect("/notes/filter/all");
}

  export default function CreateNotePage() {
    return (
      <main className={css.main}>
        <div className={css.container}>
          <h1 className={css.title}>Create note</h1>
          <NoteForm formAction={createNoteAction} />
        </div>
      </main>
    );
  }
