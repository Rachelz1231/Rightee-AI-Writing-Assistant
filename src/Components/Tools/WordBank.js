import React, { useState } from "react";
import { Grid, Button, Paper, Typography, Card, Box } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { updateResponseFromOpenAI } from "../GPTRequest";
import ToneModifier from "./Tools/ToneModifier";
const Toolbox = ({
  tools,
  indexes,
  setIndexes,
  wordBankSwitch,
  switchIndex,
  setSwitchIndex,
}) => {
  const [word, setWord] = useState("");
  const [GPTtext, setGPTText] = useState("");
  const handleClick = (index) => {
    setIndexes((prevIndexes) =>
      prevIndexes.map((currentIndex, i) =>
        i === index
          ? (currentIndex + 1) % tools[index].options.length
          : currentIndex
      )
    );
  };
  function augmentPromptAndSend() {
    if (word === "") {
      return;
    }
    const prompt = [
      {
        role: "user",
        content:
          "Only output the " +
          wordBankSwitch[switchIndex] +
          "s of the following phrase in english: " +
          word +
          ". Give multiple options, a single word and phrases if possible.",
      },
    ];
    sendMessage(prompt);
  }
  async function sendMessage(prompt) {
    setGPTText(await updateResponseFromOpenAI(prompt));
  }
  return (
    <Paper
      sx={{
        p: 1,
        height: "15rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid container spacing={2} sx={{ p: 1, flexGrow: 1, height: "100%" }}>
        <Grid item  sx={{ height: "100%" }}>
          <ToneModifier
            tools={tools}
            indexes={indexes}
            setIndexes={setIndexes}
          />
        </Grid>
        <Grid
          item
          // xs={4}
          sx={{ overflow: "hidden"}}
        >
          <Card
            sx={{
              p: 1,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              backgroundColor: (theme) => theme.palette.primary.dark,
            }}
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  justifyContent: "center",
                  color: (theme) => theme.palette.primary.dark,
                }}
                onClick={() => setSwitchIndex(switchIndex === 0 ? 1 : 0)}
              >
                {wordBankSwitch[switchIndex]}
              </Button>
              <InputBase
                sx={{ p: 1, flex: 1, direction: "row" }}
                placeholder="Search word"
                inputProps={{ "aria-label": "search word" }}
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={() => augmentPromptAndSend()}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
            <Typography
              sx={{
                m: 2,
                color: "white",
                height: "7rem",
                overflow: "scroll",
                justifyContent: "center",
              }}
            >
              {GPTtext}
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default Toolbox;
