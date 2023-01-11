import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";

import "./App.css";
import { NotFound } from "./components/NotFound";
import { Index } from "./pages/Index";
import { StartPage } from "./pages/Start";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Index />} />
        <Route path="/start/:id" element={<StartPage />} />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
