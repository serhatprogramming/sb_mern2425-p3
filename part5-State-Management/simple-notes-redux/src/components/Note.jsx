/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
const Note = ({ note }) => {
  const dispatch = useDispatch();
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
    <li>
      {note.content}
      <span
        style={clickableItemStyle}
        onClick={() => changeImportance(note.id)}
      >
        ({note.important ? "important" : "not important"})
      </span>
    </li>
  );
};

export default Note;
