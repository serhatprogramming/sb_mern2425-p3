import { toggleImportanceOf } from "./reducers/noteReducer";
import { useSelector, useDispatch } from "react-redux";
import NewNote from "./components/NewNote";

const App = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state);

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
      <NewNote />
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
