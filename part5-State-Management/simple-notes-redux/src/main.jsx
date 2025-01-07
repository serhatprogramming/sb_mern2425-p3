import { createRoot } from "react-dom/client";
import { createStore } from "redux";

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE": {
      return state.concat(action.payload);
    }
    case "TOGGLE_IMPORTANCE": {
      return state.map((note) =>
        note.id === action.payload.id
          ? { ...note, important: !note.important }
          : note
      );
    }
    default: {
      return state;
    }
  }
};

const store = createStore(noteReducer);

const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    payload: {
      content: content,
      important: false,
      id: generateId(),
    },
  };
};

const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    payload: { id },
  };
};

store.dispatch(createNote("the app stats is in redux store"));
store.dispatch(createNote("state changes are made with actions"));

store.dispatch(toggleImportanceOf(store.getState()[0].id));

const App = () => {
  const addNote = (event) => {
    event.preventDefault();
    console.log(event.target.note.value);
    store.dispatch(createNote(event.target.note.value));
    event.target.note.value = "";
  };

  const changeImportance = (id) => {
    store.dispatch(toggleImportanceOf(id));
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
        {store.getState().map((note) => (
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

const root = createRoot(document.getElementById("root"));
const renderApp = () => {
  root.render(<App />);
};
renderApp();
store.subscribe(() => {
  renderApp();
});
