import { createStore } from "redux";

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE": {
      return state.concat(action.payload);
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
    id: 1,
  },
});

const App = () => {
  return (
    <div>
      <h2>Simple Notes App with Redux</h2>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id}>
            {note.content}{" "}
            <strong>({note.important ? "important" : "not important"})</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
