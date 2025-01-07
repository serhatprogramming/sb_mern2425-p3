import { createRoot } from "react-dom/client";
import { createStore } from "redux";
// import App from "./App.jsx";
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      console.log("INCREMENT action being processed...");
      return state + 1;
    case "DECREMENT":
      console.log("DECREMENT action being processed...");
      return state - 1;
    case "ZERO":
      console.log("RESET(ZERO) action being processed...");
      return 0;

    default:
      return state;
  }
};

const store = createStore(counterReducer);
store.subscribe(() => {
  console.log("Store state after the dispatch: ", store.getState());
  renderApp();
});

const App = () => {
  // console.log("Store State: ", store.getState());
  // store.dispatch({ type: "INCREMENT" });
  // store.dispatch({ type: "INCREMENT" });
  // store.dispatch({ type: "INCREMENT" });
  // store.dispatch({ type: "INCREMENT" });
  // console.log("Store State: ", store.getState());
  // store.dispatch({ type: "DECREMENT" });
  // store.dispatch({ type: "DECREMENT" });
  // console.log("Store State: ", store.getState());
  // store.dispatch({ type: "ZERO" });
  // console.log("State, after dispatching ZERO action: ", store.getState());

  return (
    <div>
      <h2>Hello Redux.</h2>
      <p>Counter: {store.getState()} </p>
      <button onClick={() => store.dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => store.dispatch({ type: "ZERO" })}>Reset</button>
      <button onClick={() => store.dispatch({ type: "INCREMENT" })}>+</button>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
const renderApp = () => {
  root.render(<App />);
};
renderApp();

// createRoot(document.getElementById("root")).render(<App />);
