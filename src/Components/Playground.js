import React, { useState, useRef } from "react";
import { Box, CssBaseline, Card } from "@mui/material";
// Components
import Header from "./Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./Footer";
import Toolbox from "./Toolbox";
import Textbox from "./Textbox";
import { tools, wordBankSwitch } from "./prompts";

// The main page for story survey
const Playground = () => {
  const [indexes, setIndexes] = useState(tools.map(() => 0));
  const [switchIndex, setSwitchIndex] = useState(0);
  const titleRef = useRef(null);
  return (
    <>
      <Header ref={titleRef}></Header>
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            p: 1,
            flexGrow: 1,
            backgroundColor: (theme) => theme.palette.background.light,
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 64px)", // Adjust this to account for the header/footer height
          }}
        >
          <Box sx={{flexGrow: 1, overflowY: "auto", overflowX: "hidden" }}>
            <Toolbox
              tools={tools}
              indexes={indexes}
              setIndexes={setIndexes}
              wordBankSwitch={wordBankSwitch}
              switchIndex={switchIndex}
              setSwitchIndex={setSwitchIndex}
            ></Toolbox>
            <Textbox tools={tools} indexes={indexes}></Textbox>
            <Footer/>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Playground;
