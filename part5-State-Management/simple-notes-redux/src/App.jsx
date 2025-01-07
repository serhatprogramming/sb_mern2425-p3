import NewNote from "./components/NewNote";
import Notes from "./components/Notes";

const App = () => {
  return (
    <div>
      <h2>Simple Notes App with Redux</h2>
      <NewNote />
      <Notes />
    </div>
  );
};
export default App;
