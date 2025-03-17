import "./App.css";
import { Provider } from "react-redux";
import { WordGrid } from "./components/WordGrid";
import { setupStore } from "./store/store";
import { LetterTracker } from "./components/LetterTracker";

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <h1>Wordle</h1>
      <WordGrid />
      <LetterTracker />
    </Provider>
  );
}

export default App;
