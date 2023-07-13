import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/routes/index.routes";
import "./index.css";
import { ACCESS_TOKEN, BASE_URI } from "./utils/constants";
import theme from "./utils/theme";

const client = new ApolloClient({
  uri: BASE_URI,
  cache: new InMemoryCache(),
  headers: {
    Authorization: ACCESS_TOKEN,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
