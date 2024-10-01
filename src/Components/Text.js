import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.primary.light,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.light,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));
// Components
const Text = ({ line, index, existActive, setExistActive }) => {
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleTextClick = () => {
    if (!existActive && line.explanation != null) {
      setIsActive(!isActive); // Toggle the active state on click
      setExistActive(!existActive);
      setOpen(!open);
    } else if (existActive && isActive) {
      // current component is active
      setIsActive(!isActive); // Toggle the active state on click
      setExistActive(!existActive);
      setOpen(!open);
    }
  };
  function generateSuggestion() {
    if (!line.explanation) {
      return "";
    }
    return (
      <Box
        sx={{
          p: "2px",
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        <Typography variant="body2">
          <b>Explanation: </b>
          {line.explanation}
        </Typography>
        <Typography variant="body2">
          <b>Suggestion: </b>
          {line.rephrased}
        </Typography>
      </Box>
    );
  }
  return (
    <LightTooltip title={generateSuggestion()} open={open} arrow>
      <Typography
        sx={{
          display: "inline",
          py: "1px",
          px: "3px",
          backgroundColor: isActive ? "primary.main" : "none",
          color: isActive ? "#fff" : "#000",
          // textAlign: "center",
          borderRadius: "4px",
          textDecoration: line.explanation != null ? "underline" : "none",
          cursor:
            (existActive && isActive) ||
            (!existActive && line.explanation != null)
              ? "pointer"
              : "default",
          transition: "transform 0.2s, background-color 0.2s ease",
          "&:hover": {
            backgroundColor:
              !existActive && line.explanation != null
                ? "secondary.main"
                : "none", // Change color on hover
          },
          "&:active": {
            transform:
              (existActive && isActive) ||
              (!existActive && line.explanation != null)
                ? "scale(0.95)"
                : "none", // Scale down slightly on click
            backgroundColor:
              (existActive && isActive) ||
              (!existActive && line.explanation != null)
                ? "secondary.light"
                : "none",
            color:
              (existActive && isActive) ||
              (!existActive && line.explanation != null)
                ? "#fff"
                : "#000",
          },
          boxDecorationBreak: "clone",
        }}
        onClick={handleTextClick}
      >
        {line.content}
        {index}
      </Typography>
    </LightTooltip>
  );
};
export default Text;
