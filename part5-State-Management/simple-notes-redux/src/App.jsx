import { createNote, toggleImportanceOf } from "./reducers/noteReducer";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state);
  const addNote = (event) => {
    event.preventDefault();
    console.log(event.target.note.value);
    dispatch(createNote(event.target.note.value));
    event.target.note.value = "";
  };

  const changeImportance = (id) => {
    dispatch(toggleImportanceOf(id));
    console.log("Changing importance of the note with id: ", id);
  };

  const clickableItemStyle = {
    cursor: "pointer",
    textDecoration: "underline",
    color: "blue",
    fontWeight: "bold",
  };

  return (
    <div>
      <h2>Simple Notes App with Redux</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add new note</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content}
            <span
              style={clickableItemStyle}
              onClick={() => changeImportance(note.id)}
            >
              ({note.important ? "important" : "not important"})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;
