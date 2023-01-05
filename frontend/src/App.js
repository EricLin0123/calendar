import "./App.css";
import View from "./containers/View";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./containers/Theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <View />
      </ThemeProvider>
    </div>
  );
}

export default App;
