import { Provider } from "react-redux";
import { Routes, store } from "../config";

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
