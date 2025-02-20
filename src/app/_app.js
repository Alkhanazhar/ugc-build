
import "../styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { store } from "../redux/store";
import { Provider } from "react-redux";

const theme = createTheme({
  typography: {
    fontFamily: "'To Japan', 'Skrapbook', 'Arial', sans-serif",
  },
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
