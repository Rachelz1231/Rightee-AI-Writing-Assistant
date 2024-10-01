import React, { useState } from "react";
import { Grid, Button, Paper, Typography, Card, Box } from "@mui/material";
const ToneModifier = ({ tools, indexes, setIndexes }) => {
  const [word, setWord] = useState("");
  const handleClick = (index) => {
    setIndexes((prevIndexes) =>
      prevIndexes.map((currentIndex, i) =>
        i === index
          ? (currentIndex + 1) % tools[index].options.length
          : currentIndex
      )
    );
  };
  return (
    <Card
      sx={{
        p: 1,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        backgroundColor: (theme) => theme.palette.secondary.light,
      }}
    >
      <Typography variant="button">Modify the tone</Typography>
      <Grid container spacing={2} sx={{ p: 1, flexGrow: 1, height: "100%" }}>
        {tools.map((tool, i) => (
          <Grid item xs="auto" key={i}>
            <Button
              variant="contained"
              sx={{
                justifyContent: "center",
              }}
              onClick={() => handleClick(i)}
            >
              {tool.options[indexes[i]]}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};
export default ToneModifier;
