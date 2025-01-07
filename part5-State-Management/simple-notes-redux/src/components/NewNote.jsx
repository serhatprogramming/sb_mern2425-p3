import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";

const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    dispatch(createNote(event.target.note.value));
    event.target.note.value = "";
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add new note</button>
    </form>
  );
};

export default NewNote;
