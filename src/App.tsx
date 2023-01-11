import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

import "./App.css";
import { NotFound } from "./components/NotFound";
import { Home } from "./pages/Home";
import { StartPage } from "./pages/Start";
import { theme } from "./themes/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Router>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/start/:id" element={<StartPage />} />
          <Route element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
