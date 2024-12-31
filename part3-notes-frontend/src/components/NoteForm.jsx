import { useState } from "react";

const NoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState("");

  const createNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };
    addNote(noteObject);
    setNewNote("");
  };

  return (
    <div>
      <form onSubmit={createNote}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
