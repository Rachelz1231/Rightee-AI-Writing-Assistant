import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Grid,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
// Components
import { updateResponseFromOpenAI } from "../GPTRequest";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Text from "./Text";

const Textbox = ({ tools, indexes }) => {
  const [text, setText] = useState("");
  const [backgroundText, setBackgroundText] = useState("");
  const [existActive, setExistActive] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [outputText, setOutputText] = useState([]);

  function augmentPromptAndSend() {
    setOutputText([]);
    setExistActive(false);
    setWaitingForResponse(true);
    let content = "";
    if (backgroundText !== "") {
      content = "1. The following text are for: " + backgroundText + ".\n2. ";
    }
    content =
      content + tools.map((tool, i) => tool.prompts[indexes[i]]).join("");
    console.log(content);
    const textPrompt = [
      {
        role: "user",
        content:
          content +
          "Divide each sentense by ` %^& `. Keep the paragraph structures. Return the following text with grammar fixed given the instruction. \n" +
          text,
      },
    ];
    sendMessage(content, textPrompt);
  }
  async function sendMessage(content, textPrompt) {
    const GPTResponse = await updateResponseFromOpenAI(textPrompt);
    const suggestionPrompt = [
      {
        role: "user",
        content:
          content +
          "In the following text, each sentence is divided by ` %^& `. Starting from the first sentense (index 0), for any sentenses that have very weird phrasing, rephrase those sentense, explain and return in the format of: intIndex %^& explanation %^& rephrased sentence (newline). Otherwise, return nothing." +
          GPTResponse +
          `"`,
      },
    ];
    // define suggestions
    const suggestions = await updateResponseFromOpenAI(suggestionPrompt);
    const suggestionsLst = [];
    if (suggestions !== "None") {
      for (const paragraph of suggestions.split("\n")) {
        let suggestionLst = [];
        const suggestion = paragraph.split("%^&").map((str) => str.trim());
        if (suggestion[2] != null) {
          suggestionLst.push(Number(suggestion[0]));
          suggestionLst.push({
            explanation: suggestion[1],
            rephrased: suggestion[2],
          });
          suggestionsLst.push(suggestionLst);
        }
      }
    }
    console.log(suggestionsLst);
    // define response
    let indS = 0;
    const responseLst = [];
    let count = 0;
    for (const paragraph of GPTResponse.split("\n\n")) {
      const paragraphLst = [];
      console.log(paragraph);
      for (const line of paragraph.split("%^&").map((str) => str.trim())) {
        // has suggestion for current line
        let lineInfo = { content: line };
        // Check if suggestion exists at the current index
        if (
          suggestionsLst.length !== 0 &&
          indS < suggestionsLst.length &&
          count === suggestionsLst[indS][0]
        ) {
          console.log("Adding suggestion:", suggestionsLst[indS]);

          // Check if suggestionsLst[indS][1] is a valid object before spreading
          if (
            suggestionsLst[indS][1] &&
            typeof suggestionsLst[indS][1] === "object"
          ) {
            lineInfo = { ...lineInfo, ...suggestionsLst[indS][1] };
            indS += 1;
          } else {
            console.warn(`Invalid suggestion object at index ${indS}`);
          }
        }
        count += 1;
        paragraphLst.push(lineInfo);
      }
      responseLst.push(paragraphLst);
    }
    console.log(responseLst);
    setOutputText(responseLst);
    setWaitingForResponse(false);
  }
  return (
    <Box sx={{ p: 3, justifyContent: "center" }}>
      <Grid
        container
        spacing={1}
        sx={{ width: "100%", flexGrow: 1, alignItems: "center" }}
        columns={{ xs: 13, sm: 9, md: 13 }}
      >
        <Grid item xs={6} sm={4} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="button" sx={{ fontStyle: "bold" }}>
                Background Knowledge For Your Text
              </Typography>

              <Card>
                <TextField
                  fullWidth
                  variant="outlined"
                  rows={5}
                  multiline
                  sx={{ backgroundColor: "white" }}
                  value={backgroundText}
                  onChange={(e) => setBackgroundText(e.target.value)}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="button">Enter Your Text Here</Typography>
              <Card>
                <TextField
                  fullWidth
                  variant="outlined"
                  rows={20}
                  multiline
                  sx={{ backgroundColor: "white" }}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} sm={1} md={1}>
          <Button
            disabled={text === ""}
            variant="contained"
            sx={{ justifyContent: "center" }}
            onClick={augmentPromptAndSend}
          >
            <ArrowForwardIosIcon />
          </Button>
        </Grid>
        <Grid item xs={6} sm={4} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Paper
                variant="outlined"
                sx={{
                  p: 1,
                  height: "35rem",
                  overflowY: "auto",
                  textAlign: "left",
                }}
              >
                <Box sx={{ mx: 2 }}>
                  {outputText.map((paragraph, paragraphIndex) => (
                    <Box key={`${paragraphIndex}+`}>
                      {paragraph.map((lineLst, index) => (
                        <Text
                          key={`${paragraphIndex}-${index}`}
                          line={lineLst}
                          index={lineLst[0]}
                          existActive={existActive}
                          setExistActive={setExistActive}
                        ></Text>
                      ))}
                    </Box>
                  ))}
                  {waitingForResponse && <CircularProgress />}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Textbox;
