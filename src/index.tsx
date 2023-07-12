import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import App from "./app/routes/index.routes";
import "./index.css";
import theme from "./utils/theme";


const client = new ApolloClient({
  uri: 'https://graph.dev.jit.care/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: "eyJraWQiOiIzZ1U3bzFFVkg2bTJKY3AxXC9TVWpMYTlIQUJFelluQUx6QXNPS0lLNDE4Zz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0YzliODNhNy1hZmEzLTQ3NTEtYjYzNi0yNjE3MWNhOGU5ZDEiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbl82OTI2MjdlZi1mZGE4LTQyMDMtYjEwOC1lOGU5ZjUyYWQ0MTAiLCJ0ZW5hbnRfNjkyNjI3ZWYtZmRhOC00MjAzLWIxMDgtZThlOWY1MmFkNDEwIiwidGVuYW50Xzk0MGU4ZWRmLWVkZDktNDAxZC1hMjFhLTEwZjg2NmZiZGIzZiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9VYXFsdUxPaHEiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIxcDNoNG1rc2ZhdWU0cThqbjQ3dWZlYm9yIiwib3JpZ2luX2p0aSI6IjIyNDZmOTNlLTNlOGEtNGZhYS1iNWZjLThkM2FkOWY2N2QwMSIsImV2ZW50X2lkIjoiMjMwZTdiYWUtODZlMS00NmM3LThkOGUtNDY3Y2FhNDY4MTc3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJwaG9uZSBncmF2aXR5XC9ncmFwaHFsIG9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTY4NzA4MDgzNSwiZXhwIjoxNjg5MjQ3ODc4LCJpYXQiOjE2ODkxNjE0NzgsImp0aSI6IjEyOGIwMmQ4LTJjNzQtNGFiNy1iNzg1LThkNDJhODZlMjViOCIsInVzZXJuYW1lIjoiY29kZXRlc3QtdXNlciJ9.fwcO_nmSlfpblhzuNKJWhK-StAH76lIW81iOsVnKFbHfzh97TqCmRJlMDer_yIDWezKagXF4bY1nnS8PIgmnLGuOgYqMHajodnUVGDr4BJ2WHzN9nMNNTWEyzRqzQMbz8kiAJE7elP2stlRX9Im15vHaKDoqlHyZMaaWPoq9EAo8OUbN7ZrKz5g48OPUWi_J5jr_jFVTsKjdiU4sqYN5kqrnNkwz7Vzdr4G-dpy9ZJl_U3v-7rFEpuSKP7sTyqM9iQJYhJkAD41oZb4J5GnEwOgVbjT_KG_7a09cvnIFSvB8tMd5Vo3fH6ynosyvqPwG2ZNtkaRmsG-LkKXMVO5Yww"

  }
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
