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

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "the app stats is in redux store",
    important: true,
    id: 1,
  },
});
store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "state changes are made with actions",
    important: false,
    id: 2,
  },
});

store.dispatch({
  type: "TOGGLE_IMPORTANCE",
  payload: { id: 1 },
});

const App = () => {
  const addNote = (event) => {
    event.preventDefault();
    console.log(event.target.note.value);
    store.dispatch({
      type: "NEW_NOTE",
      payload: {
        content: event.target.note.value,
        important: false,
        id: generateId(),
      },
    });
    event.target.note.value = "";
  };

  const changeImportance = (id) => {
    store.dispatch({
      type: "TOGGLE_IMPORTANCE",
      payload: { id },
    });
    console.log("Changing importance of the note");
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
