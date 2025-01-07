import { createRoot } from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import noteReducer from "./reducers/noteReducer";

// store.dispatch(createNote("the app stats is in redux store"));
// store.dispatch(createNote("state changes are made with actions"));

// store.dispatch(toggleImportanceOf(store.getState()[0].id));

const store = createStore(noteReducer);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
