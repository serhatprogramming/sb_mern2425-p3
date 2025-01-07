import { createStore } from "redux";

const App = () => {
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
    console.log("Store after action applied: ", store.getState());
  });
  console.log("Store State: ", store.getState());
  store.dispatch({ type: "INCREMENT" });
  store.dispatch({ type: "INCREMENT" });
  store.dispatch({ type: "INCREMENT" });
  store.dispatch({ type: "INCREMENT" });
  console.log("Store State: ", store.getState());
  store.dispatch({ type: "DECREMENT" });
  store.dispatch({ type: "DECREMENT" });
  console.log("Store State: ", store.getState());
  store.dispatch({ type: "ZERO" });
  console.log("State, after dispatching ZERO action: ", store.getState());

  return (
    <div>
      <p>Hello Redux.</p>
    </div>
  );
};

export default App;
