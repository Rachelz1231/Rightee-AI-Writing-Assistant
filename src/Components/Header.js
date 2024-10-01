import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React from "react";
import "../App.css";

const Header = React.forwardRef((props, ref) => {
  let navigate = useNavigate();
  return (
    <AppBar
      component="header"
      position="static"
      elevation={0}
      ref={ref}
      sx={{ 
        backgroundColor: (theme) => `${theme.palette.primary.main}`,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Link href="/" color="inherit" underline="none">
        <Typography
          variant="h4"
          color="white"
          noWrap
          fontFamily="Montserrat"
          sx={{ px: 2, textAlign: "left" }}
        >
          Rightee
        </Typography>
      </Link>
    </AppBar>
  );
});

export default Header;
