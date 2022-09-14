import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import TwitterPage from "./pages/TwitterPage";
import DaoPage from "./pages/DaoPage";
import LandingPage from "./pages/LandingPage";

const theme = createTheme({
  // The theme.
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/dao/:name" element={<DaoPage />} />
            <Route path="/twitter/:list_id" element={<TwitterPage />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
