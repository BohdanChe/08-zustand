

"use client";

import css from "./NoteForm.module.css";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib /store/noteStore";


type Props = {
  formAction: (formData: FormData) => void;
};

export default function NoteForm({ formAction }: Props) {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setDraft({
      [name]: value,
    });
  };

  const handleCancel = () => {
    router.back(); // ❗ draft НЕ очищаємо
  };

  

  return (
    <form action={(formData) => {
    clearDraft();       // ✅ очищається
    formAction(formData); // → redirect
  }}
  className={css.form}
>
      
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
        >
          {["Todo", "Work", "Personal", "Meeting", "Shopping"].map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
