import { AppProvider } from "./context/AppContextProvider";
import AppNavivation from "./routes/AppNavivation";

function App() {
  return (
    <AppProvider>
      <AppNavivation />
    </AppProvider>
  );
}

export default App;
