import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "theme-ui";
import "./style/fonts.css";
import theme from "./style/theme";
import { StoreProvider } from "easy-peasy";
import store from "./state/store";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
