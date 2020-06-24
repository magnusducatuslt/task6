import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@store";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

import "./index.css";
const state = window.__STATE__;
delete window.__STATE__;
const store = configureStore(state);
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
