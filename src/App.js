import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes, //replaces "Switch" used till v5
  Route,
  Navigate,
} from "react-router-dom";
import Playground from "./Components/Playground";
import { Box, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ProtectedRoute = ({ children }) => {
  if (!sessionStorage.getItem("name")) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#92817a",
        light: "#d6ccc2",
        dark: "#5e503f",
      },
      secondary: {
        main: "#f5ebe0",
        light: "#e3d5ca",
        dark: "#d5bdaf",
      },
      text: {
        primary: "#000000",
      },
      background: {
        light: "#edede9",
      }
    },
    typography: {
      fontFamily: "Montserrat",
      body1: {
        fontSize: "14px",
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            fontSize: "13px",
          },
        },
      },
    },
  });
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={defaultTheme}>
        <Box className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Playground />} />
            </Routes>
          </Router>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
